import React from 'react';
import { Search, Bell, Sun, Moon, Maximize2, Minimize2, Settings, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProfileCard from '../common/ProfileCard';

export default function Topbar() {
  const { darkMode, setDarkMode, isFullscreen, toggleFullscreen, setIsSearchOpen, showToast, user, navigate, currentPage } = useApp();

  const getSearchPlaceholder = () => {
    switch (currentPage) {
      case 'stock-circle-dashboard':
        return 'Search stock circle, module, record...';
      case 'checklist-dashboard':
        return 'Search checklist, module, record...';
      case 'master-employees':
      case 'employee-dashboard':
        return 'Search employees, ID, designation, branch...';
      default:
        return 'Search modules, records, reports...';
    }
  };

  return (
    <header className="topbar">
      {/* Left: Brand Logo & Hamburger */}
      <div className="topbar-left-cluster">
        <div
          className="topbar-brand-wrap"
          onClick={() => navigate('accounts-dashboard')}
          title="A1-MART Enterprise Retail ERP — Daily Savings Daily Discount"
        >
          <img
            src="/a1mart_logo.png"
            alt="A1-MART — Daily Savings Daily Discount"
            className="topbar-brand-logo"
          />
        </div>
      </div>

      {/* Center Search Input matching screenshot */}
      <div className="topbar-search-wrap" onClick={() => setIsSearchOpen(true)}>
        <Search size={15} className="topbar-search-icon" />
        <input
          type="text"
          placeholder={getSearchPlaceholder()}
          readOnly
          className="topbar-search-input"
        />
      </div>

      {/* Right: Actions, Theme Pill & User Profile */}
      <div className="topbar-actions-right">
        {/* Notifications with red count badge */}
        <button
          className="icon-btn-round"
          onClick={() => showToast('3 Active store notifications: Low stock on Rice 5kg, October payroll processed, PO-162 approved')}
          title="Notifications"
        >
          <Bell size={17} />
          <span className="notif-pill-number">3</span>
        </button>

        {/* Settings button */}
        <button
          className="icon-btn-round"
          onClick={() => navigate('settings')}
          title="Store Settings"
        >
          <Settings size={17} />
        </button>

        {/* Theme Toggle (Moon / Sun) */}
        <button
          className="icon-btn-round"
          onClick={() => {
            const nextMode = !darkMode;
            setDarkMode(nextMode);
            showToast(nextMode ? 'Switched to Dark Theme.' : 'Switched to Light Theme.');
          }}
          title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
        >
          {darkMode ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} />}
        </button>

        {/* User Profile Card */}
        <ProfileCard />
      </div>
    </header>
  );
}
