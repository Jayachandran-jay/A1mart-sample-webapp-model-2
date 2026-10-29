import React, { useState, useMemo } from 'react';
import {
  Users, UserCheck, Building2, Briefcase, Plus, Download,
  Search, Eye, MoreVertical, ChevronDown, ChevronLeft, ChevronRight, User, Heart
} from 'lucide-react';
import StatCard from '../common/StatCard';
import EmployeeAvatar from '../common/EmployeeAvatar';
import { employeeData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function EmployeeDashboard() {
  const { openModal, showToast, darkMode } = useApp();

  // Filter States for Employee Directory
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Extract unique filter options from data
  const branches = useMemo(() => {
    return ['All', ...new Set(employeeData.map(e => e.branch))];
  }, []);

  const designations = useMemo(() => {
    return ['All', ...new Set(employeeData.map(e => e.designation))];
  }, []);

  // Filtered Employee List
  const filteredEmployees = useMemo(() => {
    return employeeData.filter(emp => {
      const matchBranch = selectedBranch === 'All' || emp.branch === selectedBranch;
      const matchDesig = selectedDesignation === 'All' || emp.designation === selectedDesignation;
      const matchGender = selectedGender === 'All' || emp.gender === selectedGender;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.id.toLowerCase().includes(q) ||
        emp.designation.toLowerCase().includes(q) ||
        emp.branch.toLowerCase().includes(q);
      return matchBranch && matchDesig && matchGender && matchQuery;
    });
  }, [searchQuery, selectedBranch, selectedDesignation, selectedGender]);

  // Pagination calculations
  const totalRecords = filteredEmployees.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const pagedEmployees = filteredEmployees.slice(startIndex, startIndex + pageSize);

  // Demographic religion data
  const religionData = [
    { name: 'Hindu', count: 133, pct: '87.5%', color: '#7950F2' },
    { name: 'Muslim', count: 15, pct: '9.9%', color: '#EC4899' },
    { name: 'Christian', count: 4, pct: '2.6%', color: '#F59E0B' },
  ];

  // Gender data
  const maleCount = 66;
  const femaleCount = 86;
  const totalGender = maleCount + femaleCount;
  const malePct = ((maleCount / totalGender) * 100).toFixed(1);
  const femalePct = ((femaleCount / totalGender) * 100).toFixed(1);

  const handleRowClick = (emp) => {
    openModal('recordDetails', `Employee Profile: ${emp.name}`, {
      columns: [
        { header: 'Employee ID', accessor: 'id' },
        { header: 'Full Name', accessor: 'name' },
        { header: 'Branch Location', accessor: 'branch' },
        { header: 'Designation Role', accessor: 'designation' },
        { header: 'Gender', accessor: 'gender' },
        { header: 'Employment Status', accessor: 'status' }
      ],
      row: emp,
      avatarEmpId: emp.id,
      avatarEmpName: emp.name
    });
  };

  return (
    <div className="content-wrapper workforce-target-root">
      {/* 1. Workforce Hero Card */}
      <div className="workforce-hero-target-card">
        <div className="workforce-hero-target-left">
          <div className="workforce-target-breadcrumb">
            <span>A1-MART</span> <span className="breadcrumb-separator">&gt;</span> <span className="active-crumb">Workforce &amp; Human Resources</span>
          </div>

          <div className="workforce-target-title-row">
            <h1 className="workforce-target-main-title">
              Workforce &amp; <span className="text-gradient-purple">Human Resources</span>
            </h1>
            <span className="workforce-target-pulse-pill">
              <span className="pulse-dot-green" />
              <span>148 Active On Duty</span>
            </span>
          </div>

          <p className="workforce-target-subheading">
            Enterprise workforce directory, department allocations, and demographic balance across all 3 retail branches.
          </p>

          <div className="workforce-target-actions-row">
            <button
              className="btn-target-primary"
              onClick={() => openModal('prototypeAction', 'Add New Employee', {
                message: 'Employee onboarding module: generates system employee ID, registers biometric fingerprint, assigns PF/ESI number, and provisions branch shift schedule.'
              })}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add Employee</span>
            </button>

            <button
              className="btn-target-outline"
              onClick={() => showToast('Exporting complete A1-MART Employee Directory (152 records) to CSV...')}
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Far Right 3D Illustration */}
        <div className="workforce-hero-target-illustration-wrap">
          <div className="sparkle-diamond d1" />
          <div className="sparkle-diamond d2" />
          <img
            src="/workforce_team_scene.png"
            alt="Workforce Analytics Team"
            className="workforce-target-team-scene"
          />
        </div>
      </div>

      {/* 2. Four KPI Metric Cards in 1 Horizontal Row */}
      <div className="workforce-target-kpi-grid">
        <StatCard
          label="Total Workforce"
          value="152"
          badgeText="+5 new ↑"
          sparkline="purple"
          icon={Users}
          iconColor="purple"
          onClick={() => showToast('Total Registered Employees across all branches: 152')}
        />
        <StatCard
          label="Active On Duty"
          value="148"
          badgeText="97.3% ↑"
          sparkline="green"
          icon={UserCheck}
          iconColor="green"
          onClick={() => showToast('148 of 152 employees checked in and on active shift today (97.3% presence)')}
        />
        <StatCard
          label="Operating Branches"
          value="3"
          badgeText="Active ✓"
          sparkline="purple"
          icon={Building2}
          iconColor="purple"
          onClick={() => showToast('3 Operating Branches: Corporate Office, SARON, Distribution Warehouse')}
        />
        <StatCard
          label="Designation Roles"
          value="18"
          badgeText="Structured ∨"
          sparkline="orange"
          icon={Briefcase}
          iconColor="orange"
          onClick={() => showToast('18 Specialized retail designations configured in Master Data')}
        />
      </div>

      {/* 3. Two Side-by-Side Analytical Cards */}
      <div className="workforce-target-analytics-grid">
        {/* Left Card: Demographic Religion Distribution */}
        <div className="content-card workforce-target-analytic-card">
          <div className="analytic-card-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge purple">
                <Users size={16} />
              </div>
              <div>
                <h3 className="attendance-card-title">Demographic Religion Distribution</h3>
                <span className="analytic-card-sub">Equal opportunity workforce mapping across all branches.</span>
              </div>
            </div>

            <div className="analytic-card-actions">
              <div className="analytic-select-pill">
                <select defaultValue="All Branches">
                  <option value="All Branches">All Branches</option>
                  <option value="SARON">A1MART-SARON</option>
                  <option value="HQ">A1-MART CORPORATE OFFICE</option>
                  <option value="WH">A1MART-DISTRIBUTION WAREHOUSE</option>
                </select>
                <ChevronDown size={13} className="select-arrow" />
              </div>
              <button className="attendance-more-btn" onClick={() => showToast('Demographic analysis settings')}>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal Lollipop Chart & Side Legend Split */}
          <div className="religion-horizontal-chart-split">
            {/* Chart Area */}
            <div className="religion-horizontal-bars-container">
              {religionData.map((item) => {
                const widthPct = (item.count / 140) * 100;
                return (
                  <div key={item.name} className="religion-bar-lane">
                    <span className="religion-lane-label">{item.name}</span>
                    <div className="religion-lane-track">
                      {/* Grid background lines */}
                      <div className="track-grid-lines">
                        <span /><span /><span /><span /><span /><span /><span /><span />
                      </div>
                      <div
                        className="religion-lane-fill"
                        style={{
                          width: `${widthPct}%`,
                          background: item.color
                        }}
                      >
                        <div
                          className="religion-bullet-point"
                          style={{
                            background: item.color,
                            boxShadow: `0 0 0 3px #FFFFFF, 0 2px 6px ${item.color}55`
                          }}
                        />
                      </div>
                      <span
                        className="religion-val-tooltip"
                        style={{
                          left: `calc(${widthPct}% + 14px)`,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {item.count} ({item.pct})
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* X-Axis Scale */}
              <div className="religion-x-axis-scale">
                <span>0</span>
                <span>20</span>
                <span>40</span>
                <span>60</span>
                <span>80</span>
                <span>100</span>
                <span>120</span>
                <span>140</span>
              </div>
            </div>

            {/* Right Legend Summary */}
            <div className="religion-target-legend-table">
              {religionData.map((item) => (
                <div key={item.name} className="religion-legend-table-row">
                  <div className="legend-name-with-dot">
                    <span className="dot" style={{ background: item.color }} />
                    <span className="legend-cat-name">{item.name}</span>
                  </div>
                  <span className="legend-cat-count">{item.count}</span>
                  <span className="legend-cat-pct">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Gender Ratio Breakdown */}
        <div className="content-card workforce-target-analytic-card">
          <div className="analytic-card-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge purple">
                <Heart size={16} />
              </div>
              <div>
                <h3 className="attendance-card-title">Gender Ratio Breakdown</h3>
                <span className="analytic-card-sub">Male vs. Female staffing balance across all branches.</span>
              </div>
            </div>

            <div className="analytic-card-actions">
              <div className="analytic-select-pill">
                <select defaultValue="All Branches">
                  <option value="All Branches">All Branches</option>
                  <option value="SARON">A1MART-SARON</option>
                  <option value="HQ">A1-MART CORPORATE OFFICE</option>
                  <option value="WH">A1MART-DISTRIBUTION WAREHOUSE</option>
                </select>
                <ChevronDown size={13} className="select-arrow" />
              </div>
              <button className="attendance-more-btn" onClick={() => showToast('Gender ratio settings')}>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal Proportional Segment Bar */}
          <div className="gender-target-bar-wrap">
            <div className="gender-proportional-bar">
              <div
                className="gender-seg-male"
                style={{ width: `${malePct}%` }}
              >
                <span>{maleCount} ({malePct}%)</span>
              </div>
              <div
                className="gender-seg-female"
                style={{ width: `${femalePct}%` }}
              >
                <span>{femaleCount} ({femalePct}%)</span>
              </div>
            </div>

            {/* Scale Ticks */}
            <div className="gender-bar-ticks">
              <span>0%</span>
              <span>20%</span>
              <span>40%</span>
              <span>60%</span>
              <span>80%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Dual Bottom Metric Cards */}
          <div className="gender-dual-metric-cards">
            {/* Male Card */}
            <div className="gender-summary-card male-card">
              <div className="gender-card-icon-wrap male">
                <User size={18} strokeWidth={2.4} />
              </div>
              <div className="gender-card-info">
                <span className="gender-card-label">Male</span>
                <span className="gender-card-number">{maleCount}</span>
              </div>
              <span className="gender-card-badge male">{malePct}%</span>
            </div>

            {/* Female Card */}
            <div className="gender-summary-card female-card">
              <div className="gender-card-icon-wrap female">
                <User size={18} strokeWidth={2.4} />
              </div>
              <div className="gender-card-info">
                <span className="gender-card-label">Female</span>
                <span className="gender-card-number">{femaleCount}</span>
              </div>
              <span className="gender-card-badge female">{femalePct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Full-Width Employee Directory Card */}
      <div className="content-card workforce-target-table-card">
        <div className="workforce-target-table-header">
          <div className="attendance-card-title-group">
            <div className="attendance-icon-badge purple">
              <Users size={18} />
            </div>
            <div>
              <h3 className="attendance-card-title" style={{ fontSize: '1.08rem' }}>Registered Employee Directory</h3>
              <span className="table-subtitle-muted">
                Showing {totalRecords === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, totalRecords)} of {totalRecords} entries
              </span>
            </div>
          </div>

          {/* Unified Filter Controls Row */}
          <div className="workforce-target-filter-bar">
            {/* Branch Filter */}
            <div className="target-table-select-wrap">
              <select
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Operating Branches</option>
                {branches.filter(b => b !== 'All').map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <ChevronDown size={13} className="select-arrow" />
            </div>

            {/* Designation Filter */}
            <div className="target-table-select-wrap">
              <select
                value={selectedDesignation}
                onChange={(e) => {
                  setSelectedDesignation(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Designations</option>
                {designations.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown size={13} className="select-arrow" />
            </div>

            {/* Gender Filter */}
            <div className="target-table-select-wrap">
              <select
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <ChevronDown size={13} className="select-arrow" />
            </div>

            {/* Search Input */}
            <div className="target-table-search-box">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search employee..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="table-responsive-box target-table-box">
          <table className="modern-table workforce-modern-table">
            <thead>
              <tr>
                <th style={{ width: '110px' }}>EMPLOYEE ID</th>
                <th>FULL NAME</th>
                <th>STORE BRANCH</th>
                <th>DESIGNATION</th>
                <th>GENDER</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'center', width: '90px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {pagedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No matching employees found for selected filters.
                  </td>
                </tr>
              ) : (
                pagedEmployees.map((emp) => (
                  <tr key={emp.id} onClick={() => handleRowClick(emp)} style={{ cursor: 'pointer' }}>
                    <td>
                      <span className="attendance-code-badge">{emp.id}</span>
                    </td>
                    <td>
                      <div className="payroll-user-cell">
                        <EmployeeAvatar
                          empId={emp.id}
                          name={emp.name}
                          size={32}
                          shape="circle"
                        />
                        <span className="attendance-emp-name">{emp.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="workforce-branch-cell">
                        <Building2 size={13} color="var(--text-muted)" />
                        <span>{emp.branch}</span>
                      </span>
                    </td>
                    <td>
                      <span className="workforce-target-desig-badge">
                        {emp.designation}
                      </span>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          background: emp.gender === 'Female' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(121, 80, 242, 0.1)',
                          color: emp.gender === 'Female' ? '#EC4899' : '#7950F2',
                          fontWeight: 600,
                          fontSize: '11.5px'
                        }}
                      >
                        {emp.gender}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge active">{emp.status}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="target-view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(emp);
                        }}
                        title="View Employee Profile"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Directory Table Pagination Footer */}
        {totalPages > 1 && (
          <div className="workforce-table-pagination">
            <span className="workforce-pagination-info">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, totalRecords)} of {totalRecords} entries
            </span>
            <div className="workforce-pagination-btns">
              <button
                className="table-page-nav-btn"
                disabled={validCurrentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} />
                <span>Previous</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`table-page-number-btn ${page === validCurrentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="table-page-nav-btn"
                disabled={validCurrentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
