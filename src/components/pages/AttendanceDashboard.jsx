import React, { useState, useMemo } from 'react';
import {
  Calendar, Clock, RotateCw, MoreVertical, Search, Filter,
  ChevronDown, ArrowUpDown, ChevronRight, User, Users,
  BarChart2, Target, CheckSquare
} from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend
} from 'chart.js';
import EmployeeAvatar from '../common/EmployeeAvatar';
import { attendanceDetailsData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function AttendanceDashboard() {
  const { showToast, openModal, darkMode } = useApp();
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedDate, setSelectedDate] = useState('28/10/2026');
  const [activeTab, setActiveTab] = useState('List');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilled, setShowFilled] = useState(false);

  // Filter attendance records
  const filteredRecords = useMemo(() => {
    return attendanceDetailsData.filter(item => {
      const matchesBranch = selectedBranch === 'All Branches' || item.branch.toLowerCase().includes(selectedBranch.toLowerCase().replace('branches', '').trim());
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.designation.toLowerCase().includes(q) ||
        item.branch.toLowerCase().includes(q);
      return matchesBranch && matchesSearch;
    });
  }, [selectedBranch, searchQuery]);

  // 1. Rest Day Stats Donut Chart Data
  const restDayDonutData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Unset'],
    datasets: [
      {
        data: [45, 17, 20, 25, 19, 14, 3, 9],
        backgroundColor: [
          '#EF4444', // Sun (Coral Red)
          '#F97316', // Mon (Orange)
          '#F59E0B', // Tue (Amber)
          '#10B981', // Wed (Emerald Green)
          '#06B6D4', // Thu (Teal)
          '#3B82F6', // Fri (Blue)
          '#6366F1', // Sat (Indigo)
          '#64748B', // Unset (Slate Gray)
        ],
        borderWidth: 2,
        borderColor: darkMode ? '#1E1E2D' : '#FFFFFF',
        hoverOffset: 4
      }
    ]
  };

  const restDayDonutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#181726' : '#FFFFFF',
        titleColor: darkMode ? '#F1F1F6' : '#181726',
        bodyColor: darkMode ? '#C4C2D6' : '#5A586E',
        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} staff (${((ctx.raw / 152) * 100).toFixed(1)}%)`
        }
      }
    }
  };

  // 2. Present vs Absent Bar Chart Data
  const presentAbsentBarData = {
    labels: ['Present', 'Rest Day - P', 'Rest Day', 'Absent'],
    datasets: [
      {
        data: [107, 11, 14, 20],
        backgroundColor: [
          '#7950F2', // Present (Purple)
          '#EC4899', // Rest Day - P (Pink)
          '#F59E0B', // Rest Day (Amber)
          '#64748B'  // Absent (Slate)
        ],
        borderRadius: 6,
        barThickness: 28
      }
    ]
  };

  const presentAbsentBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#181726' : '#FFFFFF',
        titleColor: darkMode ? '#F1F1F6' : '#181726',
        bodyColor: darkMode ? '#C4C2D6' : '#5A586E',
        borderWidth: 1,
        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: darkMode ? '#A5A3B8' : '#6B7280', font: { size: 10, weight: 600 } }
      },
      y: {
        max: 150,
        grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : '#F1F1F6' },
        ticks: { stepSize: 30, color: darkMode ? '#A5A3B8' : '#6B7280', font: { size: 10 } }
      }
    }
  };

  // 3. Attendance Stats (Late vs Early)
  const attendanceStatsData = {
    labels: ['Late', 'Early'],
    datasets: [
      {
        data: [0, 1],
        backgroundColor: ['#EF4444', '#F59E0B'],
        borderRadius: 6,
        barThickness: 32
      }
    ]
  };

  const attendanceStatsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: darkMode ? '#A5A3B8' : '#6B7280', font: { size: 11, weight: 600 } }
      },
      y: {
        max: 3,
        ticks: { stepSize: 1, color: darkMode ? '#A5A3B8' : '#6B7280', font: { size: 10 } },
        grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : '#F1F1F6' }
      }
    }
  };

  // 4. Allocation by Designation Data (Horizontal Bars)
  const designationList = [
    { name: 'HOUSEHOLD MANAGER', count: 3 },
    { name: 'BILLING CHECKING', count: 2 },
    { name: 'LOAD MAN', count: 2 },
    { name: 'PURCHASE MANAGER', count: 2 },
    { name: 'DRIVER', count: 1 },
    { name: 'HR TRAINER', count: 1 },
    { name: 'STORE KEEPER', count: 1 },
    { name: 'SHELF TALKER', count: 1 },
  ];

  const handleRowClick = (item) => {
    openModal('recordDetails', `Attendance Record: ${item.name}`, {
      columns: [
        { header: 'Employee Code', accessor: 'id' },
        { header: 'Full Name', accessor: 'name' },
        { header: 'Designation Role', accessor: 'designation' },
        { header: 'Store Branch', accessor: 'branch' },
        { header: 'Assigned Rest Day', accessor: 'restDay' },
        { header: 'Presence Status', accessor: 'status' },
        { header: 'Active Session', accessor: 'sessions' },
        { header: 'Total Shift Time', accessor: 'total' }
      ],
      row: item,
      avatarEmpId: item.id,
      avatarEmpName: item.name
    });
  };

  return (
    <div className="content-wrapper attendance-dashboard-root">
      {/* 1. Header Row */}
      <div className="page-header-row attendance-header-bar">
        <div className="page-title-group">
          <div className="page-breadcrumb">
            <span>Dashboard</span> <span className="breadcrumb-separator">&gt;</span> <span className="active-crumb">Attendance</span>
          </div>
          <h1 className="page-main-heading">
            Attendance <span className="text-gradient-purple">Dashboard</span>
          </h1>
          <p className="page-subheading">
            Track employee attendance, presence trends and allocation insights.
          </p>
        </div>

        {/* Right Filter Controls */}
        <div className="attendance-filter-controls">
          {/* Date Picker */}
          <div className="attendance-ctrl-group">
            <label className="attendance-ctrl-label">Date</label>
            <div className="attendance-date-input-wrap">
              <Calendar size={14} className="attendance-input-icon" />
              <input
                type="text"
                className="attendance-date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Branch Dropdown */}
          <div className="attendance-ctrl-group">
            <label className="attendance-ctrl-label">Branch</label>
            <div className="attendance-select-wrap">
              <select
                className="attendance-branch-select"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="All Branches">All Branches</option>
                <option value="A1MART-SARON">A1MART-SARON</option>
                <option value="A1-MART CORPORATE OFFICE">A1-MART CORPORATE OFFICE</option>
                <option value="A1MART-DISTRIBUTION WAREHOUSE">A1MART-DISTRIBUTION WAREHOUSE</option>
                <option value="AIMART-CITY CENTER">AIMART-CITY CENTER</option>
                <option value="AIMART-MAIN">AIMART-MAIN</option>
              </select>
              <ChevronDown size={14} className="attendance-select-arrow" />
            </div>
          </div>

          {/* Last Sync Button */}
          <div className="attendance-ctrl-group">
            <label className="attendance-ctrl-label">Last sync</label>
            <button
              className="attendance-sync-btn"
              onClick={() => showToast('Biometric terminal synced: 152 records updated.')}
              title="Sync Biometrics Now"
            >
              <RotateCw size={14} className="attendance-sync-icon" />
              <span>28 Oct 2026, 10:40 AM</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four Analytical Cards Row */}
      <div className="attendance-analytics-grid">
        {/* Card 1: Rest Day Stats */}
        <div className="content-card attendance-stat-card">
          <div className="attendance-card-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge purple">
                <Calendar size={16} />
              </div>
              <h3 className="attendance-card-title">Rest Day Stats</h3>
            </div>
            <button className="attendance-more-btn" onClick={() => showToast('Rest Day Stats options')}>
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Donut Chart with Centered Number */}
          <div className="attendance-donut-wrap">
            <div style={{ height: '150px', width: '100%', position: 'relative' }}>
              <Doughnut data={restDayDonutData} options={restDayDonutOptions} />
              <div className="attendance-donut-center">
                <span className="attendance-donut-num">152</span>
                <span className="attendance-donut-sub">Employees</span>
              </div>
            </div>
          </div>

          {/* 2-Column Legend */}
          <div className="attendance-rest-legend">
            <div className="attendance-legend-col">
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#EF4444' }} /> Sun (45)</div>
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#F97316' }} /> Mon (17)</div>
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#F59E0B' }} /> Tue (20)</div>
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#10B981' }} /> Wed (25)</div>
            </div>
            <div className="attendance-legend-col">
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#06B6D4' }} /> Thu (19)</div>
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#3B82F6' }} /> Fri (14)</div>
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#6366F1' }} /> Sat (3)</div>
              <div className="attendance-legend-item"><span className="dot" style={{ background: '#64748B' }} /> Unset (9)</div>
            </div>
          </div>
        </div>

        {/* Card 2: Present vs Absent */}
        <div className="content-card attendance-stat-card">
          <div className="attendance-card-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge purple">
                <BarChart2 size={16} />
              </div>
              <h3 className="attendance-card-title">Present vs Absent</h3>
            </div>
            <button className="attendance-more-btn" onClick={() => showToast('Attendance ratio options')}>
              <MoreVertical size={16} />
            </button>
          </div>

          <div style={{ height: '170px', width: '100%', marginTop: '6px' }}>
            <Bar data={presentAbsentBarData} options={presentAbsentBarOptions} />
          </div>

          <div className="attendance-bars-legend">
            <span><span className="legend-sq" style={{ background: '#7950F2' }} /> Present (107)</span>
            <span><span className="legend-sq" style={{ background: '#EC4899' }} /> Rest Day - P (11)</span>
            <span><span className="legend-sq" style={{ background: '#F59E0B' }} /> Rest Day (14)</span>
            <span><span className="legend-sq" style={{ background: '#64748B' }} /> Absent (20)</span>
          </div>
        </div>

        {/* Card 3: Attendance Stats */}
        <div className="content-card attendance-stat-card">
          <div className="attendance-card-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge purple">
                <User size={16} />
              </div>
              <h3 className="attendance-card-title">Attendance Stats</h3>
            </div>
            <button className="attendance-more-btn" onClick={() => showToast('Punctuality metrics')}>
              <MoreVertical size={16} />
            </button>
          </div>

          <div style={{ height: '170px', width: '100%', marginTop: '6px' }}>
            <Bar data={attendanceStatsData} options={attendanceStatsOptions} />
          </div>

          <div className="attendance-late-legend">
            <span><span className="dot" style={{ background: '#EF4444' }} /> Late (0)</span>
            <span><span className="dot" style={{ background: '#F59E0B' }} /> Early (1)</span>
          </div>
        </div>

        {/* Card 4: Allocation by Designation */}
        <div className="content-card attendance-stat-card">
          <div className="attendance-card-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge orange">
                <Target size={16} />
              </div>
              <h3 className="attendance-card-title">Allocation by Designation</h3>
            </div>
            <label className="attendance-checkbox-label">
              <input
                type="checkbox"
                checked={showFilled}
                onChange={(e) => setShowFilled(e.target.checked)}
              />
              <span>Show Filled</span>
            </label>
          </div>

          {/* Allocation Horizontal Bars */}
          <div className="attendance-desig-bars-wrap">
            {designationList.map((item, idx) => (
              <div key={idx} className="attendance-desig-row">
                <span className="attendance-desig-name">{item.name}</span>
                <div className="attendance-desig-bar-track">
                  <div
                    className="attendance-desig-bar-fill"
                    style={{ width: `${(item.count / 3) * 100}%` }}
                  >
                    <span className="attendance-desig-count">{item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Card: Attendance Details */}
      <div className="content-card attendance-details-card">
        {/* Toolbar Bar */}
        <div className="attendance-details-header">
          <div className="attendance-card-title-group">
            <div className="attendance-icon-badge purple">
              <Users size={18} />
            </div>
            <h3 className="attendance-card-title" style={{ fontSize: '1.1rem' }}>Attendance Details</h3>
          </div>

          {/* Search Input */}
          <div className="attendance-search-box">
            <Search size={15} className="attendance-search-icon" />
            <input
              type="text"
              placeholder="Search by name, ID, or designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="attendance-subtabs-row">
          {['List', 'Grouped By Designation', 'Grouped by Branch', 'Rest Day Stats'].map((tab) => (
            <button
              key={tab}
              className={`attendance-subtab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Responsive Table */}
        <div className="table-responsive-box attendance-table-box">
          <table className="modern-table attendance-modern-table">
            <thead>
              <tr>
                <th>Code <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th>Image</th>
                <th>Employee <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th>Designation <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th>Branch <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th>Rest Day <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th>Status <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th>Timeliness <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th>Sessions</th>
                <th>Total <ArrowUpDown size={12} className="th-sort-icon" /></th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No matching attendance records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((row) => (
                  <tr key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                    <td>
                      <span className="attendance-code-badge">{row.id}</span>
                    </td>
                    <td>
                      <EmployeeAvatar
                        empId={row.id}
                        name={row.name}
                        size={36}
                        shape="rounded"
                      />
                    </td>
                    <td>
                      <span className="attendance-emp-name">{row.name}</span>
                    </td>
                    <td>
                      <span className="attendance-role-text">{row.designation}</span>
                    </td>
                    <td>
                      <span className="attendance-branch-text" title={row.branch}>
                        {row.branch}
                      </span>
                    </td>
                    <td>
                      <span className={`attendance-rest-pill ${row.restDay === 'Sunday' ? 'sunday' : 'weekday'}`}>
                        {row.restDay}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge active">{row.status}</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {row.timeliness}
                    </td>
                    <td>
                      <div className="attendance-session-cell">
                        <span className="attendance-session-dot" />
                        <span className="attendance-session-text">
                          <strong style={{ color: '#10B981' }}>{row.sessions.split('→')[0]}</strong> →
                          <span style={{ color: '#F59E0B', fontWeight: 600 }}>{row.sessions.split('→')[1]}</span>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="attendance-total-text">{row.total}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="attendance-row-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(row);
                        }}
                        title="View Attendance Details"
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
      </div>
    </div>
  );
}
