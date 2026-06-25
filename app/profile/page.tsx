"use client";

import { useState } from "react";
import Link from "next/link";

interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatarGradient: string;
  coverGradient: string;
  postsCount: number;
  followersCount: string;
  followingCount: number;
}

const userProfile: UserProfile = {
  name: "Alex Rivera",
  handle: "@arivera",
  bio: "Frontend Architect & Product Designer. Passionate about CSS layouts, interactive web interfaces, and building premium wow-factor digital experiences. 🚀💻",
  avatarGradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  coverGradient: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
  postsCount: 142,
  followersCount: "12.8K",
  followingCount: 482,
};

const mockGridPosts = [
  { id: 1, gradient: "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)", title: "Project Neon" },
  { id: 2, gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)", title: "Glassmorphism UI" },
  { id: 3, gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", title: "Fluid Typography" },
  { id: 4, gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)", title: "CSS Subgrid layout" },
  { id: 5, gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", title: "Motion Design" },
  { id: 6, gradient: "linear-gradient(135deg, #64748b 0%, #334155 100%)", title: "Dark Theme System" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="profile-container">
      {/* Cover Banner */}
      <div className="profile-cover" style={{ background: userProfile.coverGradient }}>
        <Link href="/" className="back-home-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="icon-sm">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span>Feed</span>
        </Link>
      </div>

      {/* Profile Header Details */}
      <div className="profile-header-details">
        <div className="profile-avatar-row">
          <div className="profile-avatar-large">
            <div className="avatar-color" style={{ background: userProfile.avatarGradient }} />
          </div>
          <div className="profile-action-row">
            <button className="btn-primary-custom">Edit Profile</button>
            <button className="btn-secondary-custom" aria-label="Settings">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-md">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="profile-identity">
          <h2 className="profile-name">{userProfile.name}</h2>
          <span className="profile-handle">{userProfile.handle}</span>
        </div>

        {/* Stats Row */}
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{userProfile.postsCount}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userProfile.followersCount}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userProfile.followingCount}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>

        {/* Bio */}
        <p className="profile-bio">{userProfile.bio}</p>
      </div>

      {/* Tabs Menu */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "posts" ? "active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`tab-btn ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
        <button
          className={`tab-btn ${activeTab === "liked" ? "active" : ""}`}
          onClick={() => setActiveTab("liked")}
        >
          Liked
        </button>
      </div>

      {/* Grid Content */}
      <div className="profile-grid">
        {mockGridPosts.map((post) => (
          <div key={post.id} className="grid-post-card" style={{ background: post.gradient }}>
            <div className="grid-post-overlay">
              <span className="grid-post-title">{post.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
