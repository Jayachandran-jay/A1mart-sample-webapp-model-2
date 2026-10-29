import React, { useState, useMemo } from 'react';
import {
  Calendar, ChevronLeft, ChevronRight, Download, Filter,
  Search, MoreVertical, IndianRupee, BarChart3, Briefcase,
  Users, CheckCircle2, AlertCircle, Clock, ChevronDown, RotateCcw
} from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend
} from 'chart.js';
import EmployeeAvatar from '../common/EmployeeAvatar';
import { payrollEmployeesData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function PayrollDashboard() {
  const { showToast, openModal, darkMode } = useApp();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(4); // June 2026
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedRows, setSelectedRows] = useState({});
  const [carouselOffset, setCarouselOffset] = useState(0);

  // Month list
  const monthsData = [
    { name: 'February 2026', paid: '₹221.85L', onHold: '0', unpaid: '39.76K', employees: 152, isUpcoming: false },
    { name: 'March 2026', paid: '₹22.99L', onHold: '0', unpaid: '6.35K', employees: 148, isUpcoming: false },
    { name: 'April 2026', paid: '₹23.59L', onHold: '0', unpaid: '10.11K', employees: 151, isUpcoming: false },
    { name: 'May 2026', paid: '₹24.85L', onHold: '51.63K', unpaid: '0', employees: 149, isUpcoming: false },
    { name: 'June 2026', paid: '₹26.85L', onHold: '12.59K', unpaid: '0', employees: 161, isUpcoming: false },
    { name: 'July 2026', isUpcoming: true },
    { name: 'August 2026', isUpcoming: true },
    { name: 'September 2026', isUpcoming: true },
  ];

  const activeMonth = monthsData[selectedMonthIndex];

  // Filter employees table
  const filteredEmployees = useMemo(() => {
    return payrollEmployeesData.filter(emp => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        emp.id.toLowerCase().includes(q) ||
        emp.name.toLowerCase().includes(q) ||
        emp.designation.toLowerCase().includes(q) ||
        emp.branch.toLowerCase().includes(q);

      const matchesBranch = selectedBranch === 'All Branches' ||
        emp.branch.toLowerCase().includes(selectedBranch.toLowerCase().replace('branches', '').trim());

      const matchesDesignation = selectedDesignation === 'All Designations' ||
        emp.designation.toLowerCase() === selectedDesignation.toLowerCase();

      const matchesStatus = selectedStatus === 'All Status' ||
        emp.paymentStatus.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesBranch && matchesDesignation && matchesStatus;
    });
  }, [searchQuery, selectedBranch, selectedDesignation, selectedStatus]);

  // Toggle select all
  const handleToggleSelectAll = (e) => {
    if (e.target.checked) {
      const all = {};
      filteredEmployees.forEach(emp => { all[emp.id] = true; });
      setSelectedRows(all);
    } else {
      setSelectedRows({});
    }
  };

  const handleToggleRow = (id) => {
    setSelectedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 1. Donut Chart Data (Payroll Status Overview)
  const donutData = {
    labels: ['Paid', 'On Hold', 'Unpaid'],
    datasets: [
      {
        data: [159, 2, 0],
        backgroundColor: ['#7950F2', '#3B82F6', '#EF4444'],
        borderWidth: 2,
        borderColor: darkMode ? '#1E1E2D' : '#FFFFFF',
        hoverOffset: 4
      }
    ]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#181726' : '#FFFFFF',
        titleColor: darkMode ? '#F1F1F6' : '#181726',
        bodyColor: darkMode ? '#C4C2D6' : '#5A586E',
        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} staff (${((ctx.raw / 161) * 100).toFixed(1)}%)`
        }
      }
    }
  };

  // 2. Grouped Bar Chart Data (Payroll Comparison: June 2026 vs May 2026)
  const comparisonData = {
    labels: ['Gross Pay', 'Total Deductions', 'Net Pay'],
    datasets: [
      {
        label: 'Jun 2026',
        data: [33.11, 4.12, 26.98],
        backgroundColor: '#7950F2',
        borderRadius: 6,
        barThickness: 24
      },
      {
        label: 'May 2026',
        data: [30.29, 4.91, 25.37],
        backgroundColor: '#F59E0B',
        borderRadius: 6,
        barThickness: 24
      }
    ]
  };

  const comparisonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#181726' : '#FFFFFF',
        titleColor: darkMode ? '#F1F1F6' : '#181726',
        bodyColor: darkMode ? '#C4C2D6' : '#5A586E',
        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ₹${ctx.raw}L`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: darkMode ? '#A5A3B8' : '#6B7280', font: { size: 11, weight: 600 } }
      },
      y: {
        max: 50,
        ticks: {
          stepSize: 10,
          callback: (v) => `${v}L`,
          color: darkMode ? '#A5A3B8' : '#6B7280',
          font: { size: 10 }
        },
        grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : '#F1F1F6' }
      }
    }
  };

  const handleRowClick = (emp) => {
    openModal('recordDetails', `Payroll Slip: ${emp.name}`, {
      columns: [
        { header: 'Employee ID', accessor: 'id' },
        { header: 'Full Name', accessor: 'name' },
        { header: 'Designation Role', accessor: 'designation' },
        { header: 'Store Branch', accessor: 'branch' },
        { header: 'Gross Salary', accessor: 'grossPay' },
        { header: 'Total Deductions', accessor: 'totalDeductions' },
        { header: 'Net Disbursement', accessor: 'netPay' },
        { header: 'Disbursement Status', accessor: 'paymentStatus' }
      ],
      row: emp,
      avatarEmpId: emp.id,
      avatarEmpName: emp.name
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBranch('All Branches');
    setSelectedDesignation('All Designations');
    setSelectedStatus('All Status');
    showToast('Filters cleared.');
  };

  return (
    <div className="content-wrapper payroll-dashboard-root">
      {/* 1. Header Row */}
      <div className="page-header-row payroll-header-bar">
        <div className="page-title-group">
          <div className="page-breadcrumb">
            <span>Dashboard</span> <span className="breadcrumb-separator">&gt;</span> <span className="active-crumb">Payroll</span>
          </div>
          <h1 className="page-main-heading">
            Payroll <span className="text-gradient-orange">Dashboard</span>
          </h1>
          <p className="page-subheading">
            Manage payroll, track payments and view monthly summaries.
          </p>
        </div>

        {/* Year Dropdown Filter */}
        <div className="payroll-year-filter">
          <div className="payroll-year-pill">
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>Year</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} color="#7950F2" />
              <select className="payroll-year-select" defaultValue="2026">
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Payroll Months Carousel Row */}
      <div className="content-card payroll-months-card">
        <div className="payroll-months-header">
          <div className="payroll-months-title-group">
            <div className="attendance-icon-badge orange">
              <Calendar size={16} />
            </div>
            <h3 className="attendance-card-title">Payroll Months</h3>
          </div>
          <div className="payroll-carousel-arrows">
            <button
              className="carousel-arrow-btn"
              onClick={() => setCarouselOffset(prev => Math.max(0, prev - 1))}
              disabled={carouselOffset === 0}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="carousel-arrow-btn"
              onClick={() => setCarouselOffset(prev => Math.min(2, prev + 1))}
              disabled={carouselOffset >= 2}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="payroll-months-track">
          {monthsData.slice(carouselOffset, carouselOffset + 5).map((m, idx) => {
            const realIndex = carouselOffset + idx;
            const isSelected = selectedMonthIndex === realIndex;

            if (m.isUpcoming) {
              return (
                <div key={m.name} className="payroll-month-box upcoming">
                  <div className="month-name-row">{m.name}</div>
                  <div className="month-upcoming-body">
                    <Calendar size={22} className="upcoming-cal-icon" />
                    <span className="upcoming-text">No data yet</span>
                    <span className="upcoming-badge">Upcoming</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={m.name}
                className={`payroll-month-box ${isSelected ? 'active-month' : ''}`}
                onClick={() => setSelectedMonthIndex(realIndex)}
              >
                <div className="month-name-row">
                  <span>{m.name}</span>
                  <ChevronRight size={14} className="month-arrow-icon" />
                </div>
                <div className="month-stats-list">
                  <div className="month-stat-line">
                    <span className="stat-label">
                      <span className="dot" style={{ background: '#10B981' }} /> Paid
                    </span>
                    <span className="stat-val green">{m.paid}</span>
                  </div>
                  <div className="month-stat-line">
                    <span className="stat-label">
                      <span className="dot" style={{ background: '#3B82F6' }} /> On Hold
                    </span>
                    <span className="stat-val blue">{m.onHold}</span>
                  </div>
                  <div className="month-stat-line">
                    <span className="stat-label">
                      <span className="dot" style={{ background: '#EF4444' }} /> Unpaid
                    </span>
                    <span className="stat-val red">{m.unpaid}</span>
                  </div>
                </div>
                <div className="month-card-footer">
                  <span>{m.employees} Employees</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Three Middle Analytical Panels */}
      <div className="payroll-analytics-triplet">
        {/* Panel 1: Payroll Status Overview */}
        <div className="content-card payroll-triplet-card">
          <div className="triplet-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge purple">
                <Briefcase size={16} />
              </div>
              <div>
                <h3 className="attendance-card-title">Payroll Status Overview</h3>
                <span className="triplet-sub">Employee count by payment status ({activeMonth.name})</span>
              </div>
            </div>
            <select className="triplet-select" defaultValue="June 2026">
              <option value="June 2026">June 2026</option>
              <option value="May 2026">May 2026</option>
            </select>
          </div>

          <div className="payroll-donut-split">
            <div style={{ width: '130px', height: '130px', position: 'relative', flexShrink: 0 }}>
              <Doughnut data={donutData} options={donutOptions} />
              <div className="attendance-donut-center">
                <span className="attendance-donut-num">161</span>
                <span className="attendance-donut-sub">Employees</span>
              </div>
            </div>

            <div className="payroll-donut-legend">
              <div className="donut-legend-row">
                <span className="dot" style={{ background: '#7950F2' }} />
                <span className="name">Paid</span>
                <span className="count">159</span>
                <span className="pct">98.8%</span>
              </div>
              <div className="donut-legend-row">
                <span className="dot" style={{ background: '#3B82F6' }} />
                <span className="name">On Hold</span>
                <span className="count">2</span>
                <span className="pct">1.2%</span>
              </div>
              <div className="donut-legend-row">
                <span className="dot" style={{ background: '#EF4444' }} />
                <span className="name">Unpaid</span>
                <span className="count">0</span>
                <span className="pct">0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Payment Details */}
        <div className="content-card payroll-triplet-card">
          <div className="triplet-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge orange">
                <IndianRupee size={16} />
              </div>
              <h3 className="attendance-card-title">Payment Details</h3>
            </div>
            <select className="triplet-select" defaultValue="June 2026">
              <option value="June 2026">June 2026</option>
              <option value="May 2026">May 2026</option>
            </select>
          </div>

          <div className="payment-details-stack">
            {/* Total Paid */}
            <div className="payment-metric-card green-tint">
              <div className="payment-metric-icon green">
                <IndianRupee size={16} />
              </div>
              <div className="payment-metric-info">
                <span className="metric-label">Total Paid</span>
                <span className="metric-amount">₹26,85,917.00</span>
              </div>
              <div className="payment-metric-right">
                <span className="metric-badge green">↑ 12%</span>
                <span className="metric-sub">159 Employees</span>
              </div>
            </div>

            {/* Total On Hold */}
            <div className="payment-metric-card blue-tint">
              <div className="payment-metric-icon blue">
                <Clock size={16} />
              </div>
              <div className="payment-metric-info">
                <span className="metric-label">Total On Hold</span>
                <span className="metric-amount">₹12,598.00</span>
              </div>
              <div className="payment-metric-right">
                <span className="metric-badge blue">↑ 5%</span>
                <span className="metric-sub">2 Employees</span>
              </div>
            </div>

            {/* Total Unpaid */}
            <div className="payment-metric-card red-tint">
              <div className="payment-metric-icon red">
                <AlertCircle size={16} />
              </div>
              <div className="payment-metric-info">
                <span className="metric-label">Total Unpaid</span>
                <span className="metric-amount">₹0.00</span>
              </div>
              <div className="payment-metric-right">
                <span className="metric-badge red">0%</span>
                <span className="metric-sub">0 Employees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Payroll Comparison */}
        <div className="content-card payroll-triplet-card">
          <div className="triplet-header">
            <div className="attendance-card-title-group">
              <div className="attendance-icon-badge orange">
                <BarChart3 size={16} />
              </div>
              <h3 className="attendance-card-title">Payroll Comparison</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Compare With</span>
              <select className="triplet-select" defaultValue="May 2026">
                <option value="May 2026">May 2026</option>
                <option value="April 2026">April 2026</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span className="legend-sq" style={{ background: '#7950F2' }} /> Jun 2026
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span className="legend-sq" style={{ background: '#F59E0B' }} /> May 2026
            </span>
          </div>

          <div style={{ height: '175px', width: '100%' }}>
            <Bar data={comparisonData} options={comparisonOptions} />
          </div>
        </div>
      </div>

      {/* 4. Bottom Card: Payroll Employees Table */}
      <div className="content-card payroll-table-card">
        <div className="payroll-table-header">
          <div className="attendance-card-title-group">
            <div className="attendance-icon-badge orange">
              <Users size={18} />
            </div>
            <h3 className="attendance-card-title" style={{ fontSize: '1.1rem' }}>Payroll Employees</h3>
          </div>

          <div className="payroll-filter-toolbar">
            {/* Search */}
            <div className="attendance-search-box" style={{ maxWidth: '240px' }}>
              <Search size={15} className="attendance-search-icon" />
              <input
                type="text"
                placeholder="Search by name, ID, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Branch Filter */}
            <select
              className="payroll-toolbar-select"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="All Branches">All Branches</option>
              <option value="A1MART-DISTRIBUTION WAREHOUSE">A1MART-DISTRIBUTION WAREHOUSE</option>
              <option value="AIMART-CITY CENTER">AIMART-CITY CENTER</option>
              <option value="AIMART-MAIN">AIMART-MAIN</option>
              <option value="A1-MART CORPORATE OFFICE">A1-MART CORPORATE OFFICE</option>
              <option value="A1MART-SARON">A1MART-SARON</option>
            </select>

            {/* Designation Filter */}
            <select
              className="payroll-toolbar-select"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
            >
              <option value="All Designations">All Designations</option>
              <option value="LOAD MAN">LOAD MAN</option>
              <option value="DRIVER">DRIVER</option>
              <option value="HOUSEHOLD MANAGER">HOUSEHOLD MANAGER</option>
              <option value="BILLING CHECKING">BILLING CHECKING</option>
              <option value="ACCOUNTS MANAGER">ACCOUNTS MANAGER</option>
              <option value="GRN-SUPERVISOR">GRN-SUPERVISOR</option>
              <option value="BILLING OPERATOR">BILLING OPERATOR</option>
              <option value="BILLING SECURITY">BILLING SECURITY</option>
              <option value="GRN-HELPER">GRN-HELPER</option>
              <option value="CASHIER">CASHIER</option>
              <option value="IT AND SOFTWARE MANAGER">IT AND SOFTWARE MANAGER</option>
            </select>

            {/* Status Filter */}
            <select
              className="payroll-toolbar-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Paid">Paid</option>
              <option value="On Hold">On Hold</option>
              <option value="Unpaid">Unpaid</option>
            </select>

            {/* Clear */}
            <button className="payroll-clear-btn" onClick={handleClearFilters} title="Clear Filters">
              Clear
            </button>

            {/* Export */}
            <button
              className="payroll-export-btn"
              onClick={() => showToast('Exporting Payroll Records for June 2026...')}
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Responsive Payroll Table */}
        <div className="table-responsive-box attendance-table-box">
          <table className="modern-table payroll-modern-table">
            <thead>
              <tr>
                <th style={{ width: '38px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    onChange={handleToggleSelectAll}
                    checked={filteredEmployees.length > 0 && Object.keys(selectedRows).length === filteredEmployees.length}
                  />
                </th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Branch</th>
                <th>Gross Pay</th>
                <th>Total Deductions</th>
                <th>Net Pay</th>
                <th>Payment Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No matching employee payroll records found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} onClick={() => handleRowClick(emp)} style={{ cursor: 'pointer' }}>
                    <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={Boolean(selectedRows[emp.id])}
                        onChange={() => handleToggleRow(emp.id)}
                      />
                    </td>
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
                        <span className="payroll-emp-name">{emp.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="attendance-role-text">{emp.designation}</span>
                    </td>
                    <td>
                      <span className="attendance-branch-text" title={emp.branch}>
                        {emp.branch}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{emp.grossPay}</span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--text-secondary)' }}>{emp.totalDeductions}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#10B981' }}>{emp.netPay}</span>
                    </td>
                    <td>
                      <span className="status-badge active">{emp.paymentStatus}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="attendance-row-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(emp);
                        }}
                        title="View Slip"
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
