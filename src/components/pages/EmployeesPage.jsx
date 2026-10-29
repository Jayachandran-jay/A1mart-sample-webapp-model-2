import React, { useState, useMemo } from 'react';
import {
  Users, RefreshCw, Plus, Search, RotateCcw, MapPin, Phone,
  Headphones, Store, Shield, MoreVertical, ChevronDown, ChevronLeft, ChevronRight,
  Clock, ArrowUpDown
} from 'lucide-react';
import { ourTeamEmployeesData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function EmployeesPage() {
  const { openModal, showToast } = useApp();

  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isSyncing, setIsSyncing] = useState(false);

  // Filter options
  const designations = ['All Designations', 'LINE SUPPORT', 'STORE-SUPERVISOR', 'SECURITY GUARD', 'STORE-MANAGER'];
  const branches = ['All Branches', 'A1MART – VELLORE ROAD', 'A1MART – CHENNAI', 'A1MART – SARON'];

  // Filtered employees
  const filteredData = useMemo(() => {
    return ourTeamEmployeesData.filter(emp => {
      const matchStatus = selectedStatus === 'All' || emp.status === selectedStatus;
      const matchDesig = selectedDesignation === 'All' || selectedDesignation === 'All Designations' || emp.designation === selectedDesignation;
      const matchBranch = selectedBranch === 'All' || selectedBranch === 'All Branches' || emp.branch.includes(selectedBranch.replace('A1MART – ', ''));
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.id.toLowerCase().includes(q) ||
        emp.designation.toLowerCase().includes(q) ||
        emp.mobile.includes(q);
      return matchStatus && matchDesig && matchBranch && matchQuery;
    });
  }, [selectedStatus, selectedDesignation, selectedBranch, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map(e => e.id)));
    }
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const handleSync = () => {
    setIsSyncing(true);
    showToast('Syncing employee directory with store biometric systems...');
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Employee team records successfully synchronized!');
    }, 900);
  };

  const handleReset = () => {
    setSelectedStatus('Active');
    setSelectedDesignation('All');
    setSelectedBranch('All');
    setSearchQuery('');
    showToast('Filters reset to default.');
  };

  // Helper for designation badge styling matching uploaded image
  const renderDesignationBadge = (desig) => {
    switch (desig) {
      case 'LINE SUPPORT':
        return (
          <span className="team-badge badge-support">
            <Headphones size={13} />
            <span>LINE SUPPORT</span>
          </span>
        );
      case 'STORE-SUPERVISOR':
        return (
          <span className="team-badge badge-supervisor">
            <Store size={13} />
            <span>STORE-SUPERVISOR</span>
          </span>
        );
      case 'SECURITY GUARD':
        return (
          <span className="team-badge badge-security">
            <Shield size={13} />
            <span>SECURITY GUARD</span>
          </span>
        );
      case 'STORE-MANAGER':
        return (
          <span className="team-badge badge-manager">
            <Store size={13} />
            <span>STORE-MANAGER</span>
          </span>
        );
      default:
        return (
          <span className="team-badge badge-support">
            <span>{desig}</span>
          </span>
        );
    }
  };

  // Helper for rest day badge styling matching uploaded image
  const renderRestDayBadge = (day) => {
    switch (day) {
      case 'Tuesday':
      case 'Monday':
        return <span className="team-day-badge team-day-yellow">{day}</span>;
      case 'Friday':
        return <span className="team-day-badge team-day-blue">{day}</span>;
      case 'Not Set':
      default:
        return <span className="team-day-badge team-day-grey">{day}</span>;
    }
  };

  return (
    <div className="our-team-page-container">
      {/* ── Top Hero Banner matching Screenshot accurately ── */}
      <div className="our-team-hero-card">
        <div className="our-team-hero-content">
          <div className="our-team-hero-left">
            <h1 className="our-team-title">Our Team</h1>
            <p className="our-team-subtitle">
              Manage and view all employees across A1-MART. Keep your team information updated and in sync.
            </p>
          </div>

          {/* Center 3D Silhouette Wave Artwork matching screenshot */}
          <div className="our-team-silhouette-graphic" aria-hidden="true">
            <svg viewBox="0 0 180 90" fill="none" className="our-team-silhouette-svg">
              {/* Background Left Person */}
              <circle cx="55" cy="46" r="13" fill="#A5B4FC" opacity="0.9" />
              <path d="M 38 78 C 38 64, 72 64, 72 78 Z" fill="#C7D2FE" opacity="0.9" />
              
              {/* Background Right Person */}
              <circle cx="125" cy="46" r="13" fill="#A5B4FC" opacity="0.9" />
              <path d="M 108 78 C 108 64, 142 64, 142 78 Z" fill="#C7D2FE" opacity="0.9" />
              
              {/* Foreground Center Person with peach face and blue shirt */}
              <circle cx="90" cy="34" r="16" fill="#FBCFE8" />
              <path d="M 68 78 C 68 54, 112 54, 112 78 Z" fill="#4F46E5" />
            </svg>
          </div>

          {/* Right Header Widgets */}
          <div className="our-team-hero-right">
            {/* Active Employees Stat */}
            <div className="our-team-stat-widget">
              <div className="our-team-stat-icon-wrap">
                <Users size={20} className="our-team-stat-icon" />
              </div>
              <div className="our-team-stat-data">
                <div className="our-team-stat-number">{ourTeamEmployeesData.length}</div>
                <div className="our-team-stat-label">
                  <span className="our-team-green-dot" /> Active Employees
                </div>
              </div>
            </div>

            {/* Sync Timestamp & Action Button */}
            <div className="our-team-sync-widget">
              <div className="our-team-sync-info">
                <div className="our-team-sync-clock-row">
                  <Clock size={16} className="our-team-clock-icon" />
                  <span className="our-team-sync-text">Last Sync : 2 hours ago</span>
                </div>
                <span className="our-team-sync-date">26 Oct 2026, 10:15 AM</span>
              </div>
              <button
                type="button"
                className={`btn-our-team-sync ${isSyncing ? 'is-syncing' : ''}`}
                onClick={handleSync}
              >
                <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                Sync Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Toolbar matching screenshot ── */}
      <div className="our-team-filter-card">
        <div className="our-team-filters-left">
          {/* Status Dropdown */}
          <div className="team-filter-select-wrap">
            <span className="team-filter-dot-green" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="team-filter-select status-select"
            >
              <option value="Active">Active</option>
              <option value="All">All Status</option>
              <option value="On Leave">On Leave</option>
            </select>
            <ChevronDown size={14} className="team-filter-select-arrow" />
          </div>

          {/* Designation Dropdown */}
          <div className="team-filter-select-wrap">
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="team-filter-select"
            >
              {designations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={14} className="team-filter-select-arrow" />
          </div>

          {/* Branches Dropdown */}
          <div className="team-filter-select-wrap">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="team-filter-select"
            >
              {branches.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown size={14} className="team-filter-select-arrow" />
          </div>

          {/* Search Box */}
          <div className="team-search-box-wrap">
            <Search size={15} className="team-search-icon" />
            <input
              type="text"
              placeholder="Search by name, ID, mobile or designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="team-search-input"
            />
          </div>
        </div>

        <div className="our-team-filters-right">
          <button
            type="button"
            className="btn-team-reset"
            onClick={handleReset}
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            type="button"
            className="btn-team-add"
            onClick={() => openModal('add-employee')}
          >
            <Plus size={15} />
            Add Employee
          </button>
        </div>
      </div>

      {/* ── Table Card matching screenshot accurately in full size ── */}
      <div className="our-team-table-card">
        <div className="table-responsive">
          <table className="our-team-table">
            <thead>
              <tr>
                <th style={{ width: '44px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    className="team-checkbox"
                    checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th style={{ width: '100px' }}>
                  <div className="th-sort-wrap">
                    <span>ID</span>
                    <ArrowUpDown size={12} className="th-sort-icon" />
                  </div>
                </th>
                <th style={{ width: '70px', textAlign: 'center' }}>Image</th>
                <th style={{ minWidth: '190px' }}>Name</th>
                <th style={{ minWidth: '190px' }}>Designation</th>
                <th style={{ minWidth: '150px' }}>Mobile</th>
                <th style={{ minWidth: '220px' }}>Branch</th>
                <th style={{ width: '120px' }}>
                  <div className="th-sort-wrap">
                    <span>Rest Day</span>
                    <ArrowUpDown size={12} className="th-sort-icon" />
                  </div>
                </th>
                <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="team-table-empty">
                    No employees matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((emp) => (
                  <tr key={emp.id} className={selectedRows.has(emp.id) ? 'is-row-selected' : ''}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        className="team-checkbox"
                        checked={selectedRows.has(emp.id)}
                        onChange={() => toggleSelectRow(emp.id)}
                      />
                    </td>
                    <td>
                      <span className="emp-id-pill">{emp.id}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="emp-avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/avatars/employee_avatar_01.png';
                        }}
                      />
                    </td>
                    <td>
                      <div className="emp-name-cell">
                        <span className="emp-name-main">{emp.name}</span>
                        <span className="emp-sub-id">ID: {emp.id}</span>
                      </div>
                    </td>
                    <td>
                      {renderDesignationBadge(emp.designation)}
                    </td>
                    <td>
                      <div className="team-contact">
                        <Phone size={13} className="cell-sub-icon" />
                        <span>{emp.mobile}</span>
                      </div>
                    </td>
                    <td>
                      <div className="team-branch">
                        <MapPin size={13} className="cell-sub-icon" />
                        <span>{emp.branch}</span>
                      </div>
                    </td>
                    <td>
                      {renderRestDayBadge(emp.restDay)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="btn-team-row-action"
                        onClick={() => showToast(`Actions for ${emp.name} (${emp.id})`)}
                        title="More Actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Table Footer / Pagination matching screenshot ── */}
        <div className="our-team-table-footer">
          <span className="team-footer-text">
            Showing 1 to {filteredData.length} of {filteredData.length} employees
          </span>
          <div className="team-pagination">
            <button type="button" className="team-page-btn" disabled>
              <ChevronLeft size={14} />
            </button>
            <button type="button" className="team-page-btn is-active">
              1
            </button>
            <button type="button" className="team-page-btn" disabled>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

