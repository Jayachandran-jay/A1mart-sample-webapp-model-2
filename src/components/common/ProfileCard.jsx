import React, { useState, useRef, useEffect } from 'react';
import { Building2, Laptop, LogOut, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProfileCard() {
  const { user, showToast, navigate, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="profile-card-wrapper" ref={cardRef}>
      {/* Increased Size, Razor-Sharp Vector Text, Exact Same Model & Text Space */}
      <div
        className="profile-pill-card-large"
        onClick={() => setIsOpen(prev => !prev)}
        title="Vijay Elumalai — A1-MART Corporate Office (IT AND SOFTWARE MANAGER)"
        role="button"
        tabIndex={0}
      >
        {/* Left: Avatar Recessed Circular Dish */}
        <div className="profile-avatar-dish-large">
          <img
            src="/vijay_elumalai.png"
            alt={user.name}
            className="profile-avatar-photo-large"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.classList.add('avatar-fallback');
            }}
          />
          {/* Vibrant Green Online Status Indicator */}
          <span className="profile-status-dot-large" title="Status: Online Active" />
        </div>

        {/* Subtle Vertical Divider */}
        <div className="profile-divider-line-large" />

        {/* Middle: User Identity & Store Metadata (Exact Text Spacing & Crystal-Clear Fonts) */}
        <div className="profile-info-block-large">
          {/* Row 1: Full Name (Clean, Bold, Razor-Sharp, No Chevron) */}
          <div className="profile-user-name-large">{user.name}</div>

          {/* Row 2: Branch Location */}
          <div className="profile-branch-row-large">
            <Building2 size={15} className="profile-icon-gray" strokeWidth={2} />
            <span className="profile-branch-text-large">{user.branch}</span>
          </div>

          {/* Row 3: Role / Designation Pill Chip */}
          <div className="profile-role-pill-large">
            <Laptop size={12} className="profile-icon-gray" strokeWidth={2.2} />
            <span className="profile-role-text-large">{user.role}</span>
          </div>
        </div>

        {/* Right: Decorative Diagonal Beveled Glass Blade */}
        <div className="profile-glass-blade-large" aria-hidden="true" />
      </div>

      {/* Interactive Profile Dropdown Popover */}
      {isOpen && (
        <div className="profile-dropdown-menu">
          <div className="dropdown-header-banner">
            <div className="dropdown-user-title">{user.name}</div>
            <div className="dropdown-user-email">{user.email}</div>
            <div className="dropdown-status-tag">
              <span className="dropdown-online-pulse" />
              <span>Session Active • Super Admin</span>
            </div>
          </div>

          <div className="dropdown-divider" />

          <div className="dropdown-items-list">
            <button
              className="dropdown-item-btn"
              onClick={() => {
                navigate('settings');
                setIsOpen(false);
              }}
            >
              <Settings size={16} color="#7950F2" />
              <span>Store Settings</span>
            </button>

            <button
              className="dropdown-item-btn dropdown-logout-item"
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
            >
              <LogOut size={16} color="#EF4444" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
