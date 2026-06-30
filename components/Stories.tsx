"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { EVENTS_DATA } from "@/app/data/events";

interface StorySlide {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface ProgramStory {
  id: string;
  name: string;
  image: string;
  active: boolean;
  slides: StorySlide[];
}

const STORY_COPY: Record<string, string[]> = {
  "seoul-reboot": [
    "Закрытая beauty-поездка в Сеул для тех, кто выбирает точность, сервис и доступ к лучшим специалистам.",
    "Маршрут построен вокруг эстетической медицины, красоты, стиля и гастрономии.",
    "Каждая встреча и консультация подобраны так, чтобы поездка стала персональным опытом, а не готовым туром.",
    "Сеул открывается через клиники, дизайнеров, рестораны и адреса, куда не попадают случайно.",
  ],
  "paris-fashion-week": [
    "Неделя моды в Париже как приватный опыт, где показы, вечеринки и новые знакомства становятся частью маршрута.",
    "Париж раскрывается через места и события, которые обычно остаются за закрытыми дверями индустрии.",
    "В программе показы, afterparty и fashion networking в камерном формате.",
    "Каждый день продуман для красивого ритма, сильных впечатлений и стильного контента.",
    "Дополнительные сервисы помогают собрать образ и прожить Париж с нужной степенью внимания к деталям.",
    "Это поездка для тех, кто хочет чувствовать себя внутри модной сцены.",
    "Фокус на атмосфере, доступе и моментах, которые невозможно повторить самостоятельно.",
    "Paris Fashion Week становится личной историей, а не просто пунктом в календаре.",
  ],
  "renoir-traces": [
    "Мы приглашаем вас прожить пять дней в Париже так, как когда-то жил великий художник Пьер Огюст Ренуар.",
    "",
    "",
    "",
    "",
  ],
};

const STORY_TITLES: Record<string, Record<number, string>> = {
  "renoir-traces": {
    1: "Пленэр в одном из самых живописных парков Парижа."
  }
};

const getImageCopy = (event: (typeof EVENTS_DATA)[number], url: string, imageIndex: number) => {
  const overriddenTitle = STORY_TITLES[event.id]?.[imageIndex];

  const storyOnlyImg = event.storyOnlyImages?.find((img) => img.image === url);
  if (storyOnlyImg) {
    return {
      title: overriddenTitle ?? storyOnlyImg.title,
      description: STORY_COPY[event.id]?.[imageIndex] ?? event.shortDescription,
    };
  }

  const contentIndex = event.content.findIndex((block) => block.image === url);
  const previousBlocks = event.content.slice(0, contentIndex).reverse();
  const title = overriddenTitle ?? (imageIndex === 0 ? event.title : previousBlocks.find((block) => block.title)?.title || event.title);
  const description = STORY_COPY[event.id]?.[imageIndex] ?? event.shortDescription;

  return {
    title,
    description,
  };
};

const STORIES_DATA: ProgramStory[] = [
  ...EVENTS_DATA.map((event, eventIndex) => {
    const contentImages = event.content.flatMap((block) => (block.image && !block.excludeFromStory ? [block.image] : []));
    const storyOnlyImagesUrls = event.storyOnlyImages?.map((img) => img.image) || [];
    const images = [event.image, ...contentImages, ...storyOnlyImagesUrls];

    return {
      id: event.id,
      name: event.title,
      image: event.image,
      active: eventIndex === 0,
      slides: images.map((url, imageIndex) => {
        const copy = getImageCopy(event, url, imageIndex);

        return {
          id: `${event.id}_${imageIndex + 1}`,
          url,
          ...copy,
        };
      }),
    };
  }),
];

export default function Stories() {
  const [programs, setPrograms] = useState<ProgramStory[]>(STORIES_DATA);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Notification Bell States
  const [isBellOpen, setIsBellOpen] = useState(false);
  const bellWrapperRef = useRef<HTMLDivElement>(null);

  // Touch and Swipe Gesture States
  const [translateY, setTranslateY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isSwipingY = useRef(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const touchStartTime = useRef(0);
  const mouseStartTime = useRef(0);
  const translateYRef = useRef(0);

  const updateTranslateY = (val: number) => {
    translateYRef.current = val;
    setTranslateY(val);
  };

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  const currentStory = programs[activeStoryIndex];

  // Modal Controls
  const closeModal = useCallback(() => {
    setIsOpen(false);
    dialogRef.current?.close();
  }, []);

  const openModal = (storyIndex: number) => {
    setActiveStoryIndex(storyIndex);
    setActiveSlideIndex(0);
    setProgress(0);
    setIsPaused(false);
    updateTranslateY(0);
    setIsSwiping(false);
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setProgress(0);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  // Mount effect for Portal rendering
  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) setMounted(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // Scroll-lock & body class effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("stories-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("stories-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("stories-open");
    };
  }, [isOpen]);

  // Navigation Logic
  const handleNextSlide = useCallback(() => {
    setProgress(0);
    const story = programs[activeStoryIndex];
    if (activeSlideIndex < story.slides.length - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    } else {
      // Go to next story
      if (activeStoryIndex < programs.length - 1) {
        setActiveStoryIndex((prev) => prev + 1);
        setActiveSlideIndex(0);
      } else {
        // Close modal if it's the last slide of the last story
        closeModal();
      }
    }
  }, [activeStoryIndex, activeSlideIndex, programs, closeModal]);

  const handlePrevSlide = useCallback(() => {
    setProgress(0);
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    } else {
      // Go to previous story
      if (activeStoryIndex > 0) {
        const prevStoryIndex = activeStoryIndex - 1;
        const prevStory = programs[prevStoryIndex];
        setActiveStoryIndex(prevStoryIndex);
        setActiveSlideIndex(prevStory.slides.length - 1);
      } else {
        // Restart first slide of first story
        setProgress(0);
      }
    }
  }, [activeStoryIndex, activeSlideIndex, programs]);

  // Auto-advance Timer Effect
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const startTime = Date.now() - (progress / 100) * SLIDE_DURATION;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        handleNextSlide();
      }
    }, 16); // Smooth update around 60fps

    return () => clearInterval(interval);
  }, [isOpen, isPaused, activeStoryIndex, activeSlideIndex, progress, handleNextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowRight") {
        handleNextSlide();
      } else if (e.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNextSlide, handlePrevSlide]);

  // Click outside notification bell wrapper to close the popover
  useEffect(() => {
    if (!isBellOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (bellWrapperRef.current && !bellWrapperRef.current.contains(e.target as Node)) {
        setIsBellOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isBellOpen]);

  const handleProgramClick = (id: string) => {
    setPrograms((prev) =>
      prev.map((prog) => ({
        ...prog,
        active: prog.id === id,
      }))
    );

    const index = programs.findIndex((prog) => prog.id === id);
    if (index !== -1) {
      openModal(index);
    }
  };

  // Create refs to hold the latest touch handlers so that event listeners
  // bound with { passive: false } don't need to be recreated when dependencies change.
  const touchStartRef = useRef<((e: TouchEvent) => void) | null>(null);
  const touchMoveRef = useRef<((e: TouchEvent) => void) | null>(null);
  const touchEndRef = useRef<((e: TouchEvent) => void) | null>(null);

  // Keep the refs updated with the latest handler logic
  useEffect(() => {
    touchStartRef.current = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) {
        return;
      }

      // Prevent mouse simulation (ghost clicks)
      e.preventDefault();
      touchStartTime.current = Date.now();
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
      isSwipingY.current = false;
      isLongPress.current = false;

      pressTimer.current = setTimeout(() => {
        setIsPaused(true);
        isLongPress.current = true;
      }, 250); // 250ms hold
    };

    touchMoveRef.current = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = currentY - touchStartY.current;
      const diffX = currentX - touchStartX.current;

      // Detect downward vertical swipe
      if (!isSwipingY.current && Math.abs(diffY) > Math.abs(diffX) && diffY > 10) {
        isSwipingY.current = true;
        setIsSwiping(true);
        if (pressTimer.current) clearTimeout(pressTimer.current);
        setIsPaused(true);
      }

      if (isSwipingY.current && diffY > 0) {
        updateTranslateY(diffY);
      }
    };

    touchEndRef.current = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) {
        return;
      }

      e.preventDefault();
      if (pressTimer.current) clearTimeout(pressTimer.current);

      if (isSwipingY.current) {
        setIsSwiping(false);
        if (translateYRef.current > 120) {
          closeModal();
        } else {
          updateTranslateY(0);
          setIsPaused(false);
        }
      } else {
        setIsPaused(false);
        
        const touchDuration = Date.now() - touchStartTime.current;
        // Quick tap check: if touch was short enough, perform navigation
        if (touchDuration < 350) {
          const rect = cardRef.current?.getBoundingClientRect();
          if (rect) {
            const clientX = e.changedTouches[0].clientX;
            const relativeX = clientX - rect.left;

            if (relativeX < rect.width * 0.35) {
              handlePrevSlide();
            } else {
              handleNextSlide();
            }
          }
        }
      }
    };
  });

  // Bind the native event listeners on open
  useEffect(() => {
    if (!isOpen) return;

    const card = cardRef.current;
    if (!card) return;

    const handleNativeTouchStart = (e: TouchEvent) => {
      touchStartRef.current?.(e);
    };
    const handleNativeTouchMove = (e: TouchEvent) => {
      touchMoveRef.current?.(e);
    };
    const handleNativeTouchEnd = (e: TouchEvent) => {
      touchEndRef.current?.(e);
    };

    card.addEventListener("touchstart", handleNativeTouchStart, { passive: false });
    card.addEventListener("touchmove", handleNativeTouchMove, { passive: false });
    card.addEventListener("touchend", handleNativeTouchEnd, { passive: false });

    return () => {
      card.removeEventListener("touchstart", handleNativeTouchStart);
      card.removeEventListener("touchmove", handleNativeTouchMove);
      card.removeEventListener("touchend", handleNativeTouchEnd);
    };
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only track left-click
    mouseStartTime.current = Date.now();
    isLongPress.current = false;
    pressTimer.current = setTimeout(() => {
      setIsPaused(true);
      isLongPress.current = true;
    }, 250);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setIsPaused(false);

    const clickDuration = Date.now() - mouseStartTime.current;
    if (clickDuration < 300) {
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;

      if (relativeX < rect.width * 0.35) {
        handlePrevSlide();
      } else {
        handleNextSlide();
      }
    }
  };

  const handleMouseLeave = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setIsPaused(false);
  };

  const handleArrowClick = (e: React.MouseEvent, direction: "next" | "prev") => {
    e.stopPropagation();
    if (direction === "next") {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div className="stories-section-wrapper">
      <h2 className="stories-section-title">Актуальные программы</h2>

      <div className="stories-row-container">
        <div className="stories-list-inner">
          {programs.map((prog) => (
            <button
              key={prog.id}
              className={`story-program-item ${prog.active ? "active" : ""}`}
              onClick={() => handleProgramClick(prog.id)}
            >
              <div className="story-avatar-gold-ring">
                <div className="story-avatar-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="story-avatar-img"
                  />
                </div>
              </div>
              <span className="story-program-name">{prog.name}</span>
            </button>
          ))}
        </div>

        {/* Separator line stretching to the bell */}
        <div className="stories-horizontal-divider"></div>

        {/* Premium Notification Bell Wrapper */}
        <div className="stories-bell-container" ref={bellWrapperRef}>
          <button
            className={`stories-notification-bell ${isBellOpen ? "active" : ""}`}
            onClick={() => setIsBellOpen((prev) => !prev)}
            aria-label="Уведомления"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="bell-svg-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
              <circle
                cx="18"
                cy="6"
                r="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M18 4.75 V7.25 M16.75 6 H19.25"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>

          {isBellOpen && (
            <div className="bell-tooltip-popover">
              <button
                className="bell-tooltip-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBellOpen(false);
                }}
                aria-label="Закрыть"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="bell-tooltip-text">
                Чтобы быть в курсе событий, подпишитесь на канал ДВ Груп в телеграме
              </p>
              <a
                href="https://t.me/byDVgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="bell-tooltip-link"
              >
                <svg viewBox="0 0 24 24" className="tg-mini-icon">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.02-.27 0-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.34-.26-2-.48-.8-.27-1.44-.42-1.39-.89.03-.25.38-.51 1.07-.78 4.2-1.82 7-3.03 8.4-3.61 4-.17 4.83.69 4.83 1.21z"
                    fill="currentColor"
                  />
                </svg>
                @byDVgroup
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Stories Modal Dialog */}
      {mounted && createPortal(
        <dialog
          ref={dialogRef}
          className="stories-modal-dialog"
          onClose={handleDialogClose}
          onClick={handleBackdropClick}
        >
          {isOpen && currentStory && (
            <div className="story-modal-wrapper">
              {/* Desktop Left Navigation Button */}
              <button
                className="story-nav-btn story-nav-btn-left"
                onClick={(e) => handleArrowClick(e, "prev")}
                aria-label="Предыдущий слайд"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* 9:16 Card Container */}
              <div
                ref={cardRef}
                className={`story-card ${isSwiping ? "swiping" : ""}`}
                style={{
                  transform: translateY > 0 ? `translateY(${translateY}px)` : undefined,
                  opacity: translateY > 0 ? Math.max(1 - translateY / 400, 0.4) : undefined,
                  transition: isSwiping ? "none" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {/* Slide Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentStory.slides[activeSlideIndex].url}
                  alt={currentStory.slides[activeSlideIndex].title}
                  className="story-card-image"
                  draggable={false}
                />

                {/* Progress Bars & Header Container */}
                <div className="story-card-header-overlay">
                  <div className="story-progress-indicator-bar">
                    {currentStory.slides.map((slide, idx) => {
                      let width = "0%";
                      if (idx < activeSlideIndex) {
                        width = "100%";
                      } else if (idx === activeSlideIndex) {
                        width = `${progress}%`;
                      }
                      return (
                        <div key={slide.id} className="story-progress-segment-bg">
                          <div
                            className="story-progress-segment-fill"
                            style={{ width }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="story-author-details-row">
                    <div className="story-author-avatar-badge">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={currentStory.image} alt={currentStory.name} />
                    </div>
                    <span className="story-author-name-text">{currentStory.name}</span>
                    <span className="story-slide-index-indicator">
                      {activeSlideIndex + 1}/{currentStory.slides.length}
                    </span>

                    <button
                      className="story-card-close-btn"
                      onClick={handleCloseClick}
                      aria-label="Закрыть"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="story-card-caption-overlay">
                  <h3 className="story-card-caption-title">
                    {currentStory.slides[activeSlideIndex].title}
                  </h3>
                  <p className="story-card-caption-desc">
                    {currentStory.slides[activeSlideIndex].description}
                  </p>
                </div>
              </div>

              {/* Desktop Right Navigation Button */}
              <button
                className="story-nav-btn story-nav-btn-right"
                onClick={(e) => handleArrowClick(e, "next")}
                aria-label="Следующий слайд"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </dialog>,
        document.body
      )}
    </div>
  );
}
