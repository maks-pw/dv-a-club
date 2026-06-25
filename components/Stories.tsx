"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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

const STORIES_DATA: ProgramStory[] = [
  {
    id: "suzdal",
    name: "Суздаль",
    image: "/story_suzdal.png",
    active: true,
    slides: [
      {
        id: "suzdal_1",
        url: "/story_suzdal_1.png",
        title: "Русский терем",
        description: "Погрузитесь в атмосферу тепла и уюта деревянного зодчества.",
      },
      {
        id: "suzdal_2",
        url: "/story_suzdal_2.png",
        title: "Рассвет над Каменкой",
        description: "Утренние туманы и золотые купола древних монастырей.",
      },
      {
        id: "suzdal_3",
        url: "/story_suzdal_3.png",
        title: "Чай из самовара",
        description: "Традиционное чаепитие с блинами и медом у камина.",
      },
    ],
  },
  {
    id: "japan",
    name: "Япония",
    image: "/story_japan.png",
    active: false,
    slides: [
      {
        id: "japan_1",
        url: "/story_japan_1.png",
        title: "Традиционный рёкан",
        description: "Комната с татами, раздвижными сёдзи и видом на сад камней.",
      },
      {
        id: "japan_2",
        url: "/story_japan_2.png",
        title: "Золотой павильон",
        description: "Древний храм в Киото в окружении осенних кленов момидзи.",
      },
      {
        id: "japan_3",
        url: "/story_japan_3.png",
        title: "Огни Токио",
        description: "Закат над футуристическим мегаполисом из окна небоскреба.",
      },
    ],
  },
];

export default function Stories() {
  const [programs, setPrograms] = useState<ProgramStory[]>(STORIES_DATA);
  const [isOpen, setIsOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch and Swipe Gesture States
  const [translateY, setTranslateY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isSwipingY = useRef(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

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
    setTranslateY(0);
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

  // Scroll-lock effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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

  // Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    isSwipingY.current = false;
    isLongPress.current = false;

    pressTimer.current = setTimeout(() => {
      setIsPaused(true);
      isLongPress.current = true;
    }, 200);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
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
      // Direct drag mapping
      setTranslateY(diffY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (pressTimer.current) clearTimeout(pressTimer.current);

    if (isSwipingY.current) {
      setIsSwiping(false);
      if (translateY > 120) {
        closeModal();
      } else {
        setTranslateY(0);
        setIsPaused(false);
      }
    } else {
      setIsPaused(false);
      if (!isLongPress.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.changedTouches[0].clientX;
        const relativeX = clientX - rect.left;

        if (relativeX < rect.width * 0.35) {
          handlePrevSlide();
        } else {
          handleNextSlide();
        }
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only track left-click
    isLongPress.current = false;
    pressTimer.current = setTimeout(() => {
      setIsPaused(true);
      isLongPress.current = true;
    }, 200);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setIsPaused(false);

    if (!isLongPress.current) {
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

        {/* Premium Notification Bell Button */}
        <button className="stories-notification-bell" aria-label="Уведомления">
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
      </div>

      {/* Stories Modal Dialog */}
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
              className={`story-card ${isSwiping ? "swiping" : ""}`}
              style={{
                transform: translateY > 0 ? `translateY(${translateY}px)` : undefined,
                opacity: translateY > 0 ? Math.max(1 - translateY / 400, 0.4) : undefined,
                transition: isSwiping ? "none" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
      </dialog>
    </div>
  );
}
