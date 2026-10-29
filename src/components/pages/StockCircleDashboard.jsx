import React, { useState, useMemo } from 'react';
import {
  Layers, ShieldCheck, Clock, CheckCircle2, Download, Plus, Search,
  Filter, Eye, Edit2, MoreVertical, ChevronDown, ChevronLeft, ChevronRight,
  TrendingUp, TrendingDown, Package, XCircle, ArrowUpRight, ArrowDown,
  BarChart3, Hourglass, PieChart
} from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale, BarElement, Title
} from 'chart.js';
import { stockCircleDashboardRecords } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
  BarElement, Title
);

export default function StockCircleDashboard() {
  const { openModal, showToast, darkMode } = useApp();

  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered Records
  const filteredRecords = useMemo(() => {
    return stockCircleDashboardRecords.filter(rec => {
      const matchModule = selectedModule === 'All Modules' || rec.module === selectedModule;
      const matchStatus = selectedStatus === 'All Status' || rec.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        rec.id.toLowerCase().includes(q) ||
        rec.title.toLowerCase().includes(q) ||
        rec.module.toLowerCase().includes(q);
      return matchModule && matchStatus && matchQuery;
    });
  }, [selectedModule, selectedStatus, searchQuery]);

  // Donut Chart Data
  const donutData = {
    labels: ['Operations', 'Inventory', 'Purchase'],
    datasets: [
      {
        data: [66.7, 16.7, 16.7],
        backgroundColor: ['#6366F1', '#F97316', '#EC4899'],
        borderColor: darkMode ? '#1E1E2A' : '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 4,
        cutout: '70%',
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  // Custom plugin to draw percentage labels directly on donut slices
  const donutLabelPlugin = useMemo(() => ({
    id: 'donutLabelPlugin',
    afterDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const labels = ['66.7%', '16.7%', '16.7%'];
      meta.data.forEach((arc, i) => {
        const { startAngle, endAngle, outerRadius, innerRadius, x, y } = arc;
        const angle = startAngle + (endAngle - startAngle) / 2;
        const r = (innerRadius + outerRadius) / 2;
        const posX = x + Math.cos(angle) * r;
        const posY = y + Math.sin(angle) * r;
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (labels[i]) {
          ctx.fillText(labels[i], posX, posY);
        }
        ctx.restore();
      });
    }
  }), []);

  // Bar Chart Data (Active: 2, Pending: 1, Inactive: 0)
  const barData = {
    labels: ['Active', 'Pending', 'Inactive'],
    datasets: [
      {
        data: [2, 1, 0],
        backgroundColor: ['#6366F1', '#F97316', '#CBD5E1'],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 56,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 4,
        ticks: { stepSize: 1, color: darkMode ? '#A2A2B4' : '#64748B', font: { size: 11 } },
        title: {
          display: true,
          text: 'Count',
          color: darkMode ? '#A2A2B4' : '#64748B',
          font: { size: 11, weight: '600' }
        },
        grid: { color: darkMode ? 'rgba(255,255,255,0.06)' : '#F1F5F9' },
      },
      x: {
        ticks: { color: darkMode ? '#E2E8F0' : '#475569', font: { weight: '600', size: 12 } },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` Count: ${context.raw}`,
        },
      },
    },
  };

  // Custom plugin to draw numbers (2, 1, 0) above bars
  const barValuePlugin = useMemo(() => ({
    id: 'barValuePlugin',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar, index) => {
          const val = dataset.data[index];
          ctx.save();
          ctx.fillStyle = darkMode ? '#E2E8F0' : '#1E293B';
          ctx.font = 'bold 12px Inter, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(String(val), bar.x, bar.y - 6);
          ctx.restore();
        });
      });
    }
  }), [darkMode]);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["RECORD ID,TITLE / CODE,MODULE,UPDATED DATE,STATUS"]
        .concat(filteredRecords.map(r => `"${r.id}","${r.title}","${r.module}","${r.updatedDate}","${r.status}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "stock_circle_dashboard_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Stock circle records exported to CSV!");
  };

  return (
    <div className="stock-circle-dashboard-page">
      {/* ── Breadcrumb matching screenshot ── */}
      <div className="cd-breadcrumb">
        <span>A1-MART</span>
        <span className="cd-crumb-sep">&gt;</span>
        <span className="cd-crumb-current">Stock Circle</span>
      </div>

      {/* ── Header Banner matching screenshot ── */}
      <div className="cd-header-card">
        <div className="cd-header-left">
          <h1 className="cd-title">
            Stock Circle <span className="cd-title-accent">Dashboard</span>
          </h1>
          <p className="cd-subtitle">
            Monitor, manage and track stock circle dashboards across all modules.
          </p>
        </div>

        {/* 3D Forklift & Boxes Graphic with Slogan */}
        <div className="cd-header-graphic-area" aria-hidden="true">
          <div className="cd-graphic-boxes-group">
            <svg viewBox="0 0 240 100" fill="none" className="cd-forklift-svg">
              {/* Stacked warehouse boxes */}
              <rect x="110" y="24" width="28" height="24" rx="2" fill="#E0A96D" stroke="#C68B59" strokeWidth="1" />
              <rect x="140" y="24" width="28" height="24" rx="2" fill="#D49A5B" stroke="#B87D43" strokeWidth="1" />
              <rect x="125" y="0" width="28" height="23" rx="2" fill="#E8B57D" stroke="#C68B59" strokeWidth="1" />
              <rect x="110" y="50" width="28" height="24" rx="2" fill="#D49A5B" stroke="#B87D43" strokeWidth="1" />
              <rect x="140" y="50" width="28" height="24" rx="2" fill="#E0A96D" stroke="#C68B59" strokeWidth="1" />
              <rect x="170" y="50" width="28" height="24" rx="2" fill="#D49A5B" stroke="#B87D43" strokeWidth="1" />
              
              {/* Orange Forklift */}
              <path d="M 60 74 L 102 74 L 102 46 L 78 46 L 60 62 Z" fill="#FF6600" />
              <rect x="80" y="50" width="16" height="12" rx="2" fill="#3B82F6" opacity="0.7" />
              <rect x="103" y="30" width="4" height="44" fill="#374151" />
              <rect x="107" y="60" width="14" height="4" fill="#1F2937" />
              <circle cx="68" cy="74" r="8" fill="#1F2937" />
              <circle cx="68" cy="74" r="4" fill="#E5E7EB" />
              <circle cx="94" cy="74" r="8" fill="#1F2937" />
              <circle cx="94" cy="74" r="4" fill="#E5E7EB" />

              {/* Clipboard checklist */}
              <rect x="180" y="20" width="24" height="34" rx="3" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1.5" />
              <rect x="186" y="17" width="12" height="5" rx="1.5" fill="#4F46E5" />
              <line x1="184" y1="28" x2="200" y2="28" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="184" y1="34" x2="198" y2="34" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="184" y1="40" x2="196" y2="40" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="cd-slogan-wrap">
            <span className="cd-slogan-script">Efficient Stock Management</span>
            <span className="cd-slogan-sub">for a Stronger Tomorrow</span>
            <svg viewBox="0 0 100 10" className="cd-slogan-swoosh" fill="none">
              <path d="M 2 4 Q 50 9, 98 4" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="cd-header-actions">
          <button type="button" className="btn-cd-export" onClick={handleExportCSV}>
            <Download size={14} />
            Export CSV
          </button>
          <button type="button" className="btn-cd-primary" onClick={() => openModal('add-stock-circle')}>
            <Plus size={15} />
            Add Stock Circle Dashboard
          </button>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards with Wave Sparklines & Corner Arrows ── */}
      <div className="cd-stats-grid">
        {/* Card 1: Total Stock Circle Dashboard */}
        <div className="cd-stat-card">
          <div className="cd-stat-top">
            <div className="cd-stat-icon-box cd-icon-purple">
              <Layers size={18} />
            </div>
            <ArrowUpRight size={15} className="cd-stat-corner-arrow" />
          </div>
          <div className="cd-stat-meta-below">
            <div className="cd-stat-label">Total Stock Circle Dashboard</div>
            <div className="cd-stat-val">3</div>
            <div className="cd-stat-badge badge-green">
              <TrendingUp size={12} /> <span>50%</span> <span className="cd-vs-text">vs last month</span>
            </div>
          </div>
          <div className="cd-sparkline-svg-wrap">
            <svg viewBox="0 0 100 35" fill="none" className="cd-sparkline">
              <defs>
                <linearGradient id="scSparkPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 30 Q 25 15, 45 25 T 90 8 L 100 12 L 100 35 L 0 35 Z" fill="url(#scSparkPurple)" />
              <path d="M 0 30 Q 25 15, 45 25 T 90 8 L 100 12" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Active / Verified */}
        <div className="cd-stat-card">
          <div className="cd-stat-top">
            <div className="cd-stat-icon-box cd-icon-green">
              <ShieldCheck size={18} />
            </div>
            <ArrowUpRight size={15} className="cd-stat-corner-arrow" />
          </div>
          <div className="cd-stat-meta-below">
            <div className="cd-stat-label">Active / Verified</div>
            <div className="cd-stat-val">2</div>
            <div className="cd-stat-badge badge-green">
              <TrendingUp size={12} /> <span>67%</span> <span className="cd-vs-text">vs last month</span>
            </div>
          </div>
          <div className="cd-sparkline-svg-wrap">
            <svg viewBox="0 0 100 35" fill="none" className="cd-sparkline">
              <defs>
                <linearGradient id="scSparkGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 28 Q 20 28, 40 18 T 85 8 L 100 10 L 100 35 L 0 35 Z" fill="url(#scSparkGreen)" />
              <path d="M 0 28 Q 20 28, 40 18 T 85 8 L 100 10" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Pending Sync */}
        <div className="cd-stat-card">
          <div className="cd-stat-top">
            <div className="cd-stat-icon-box cd-icon-orange">
              <Hourglass size={18} />
            </div>
            <ArrowUpRight size={15} className="cd-stat-corner-arrow" />
          </div>
          <div className="cd-stat-meta-below">
            <div className="cd-stat-label">Pending Sync</div>
            <div className="cd-stat-val">1</div>
            <div className="cd-stat-badge badge-red">
              <TrendingDown size={12} /> <span>50%</span> <span className="cd-vs-text">vs last month</span>
            </div>
          </div>
          <div className="cd-sparkline-svg-wrap">
            <svg viewBox="0 0 100 35" fill="none" className="cd-sparkline">
              <defs>
                <linearGradient id="scSparkOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 18 Q 30 18, 55 28 T 90 14 L 100 20 L 100 35 L 0 35 Z" fill="url(#scSparkOrange)" />
              <path d="M 0 18 Q 30 18, 55 28 T 90 14 L 100 20" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Compliance Rate */}
        <div className="cd-stat-card">
          <div className="cd-stat-top">
            <div className="cd-stat-icon-box cd-icon-blue">
              <PieChart size={18} />
            </div>
            <ArrowUpRight size={15} className="cd-stat-corner-arrow" />
          </div>
          <div className="cd-stat-meta-below">
            <div className="cd-stat-label">Compliance Rate</div>
            <div className="cd-stat-val">99.4%</div>
            <div className="cd-stat-badge badge-green">
              <TrendingUp size={12} /> <span>2.1%</span> <span className="cd-vs-text">vs last month</span>
            </div>
          </div>
          <div className="cd-sparkline-svg-wrap">
            <svg viewBox="0 0 100 35" fill="none" className="cd-sparkline">
              <defs>
                <linearGradient id="scSparkBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 26 Q 30 12, 60 22 T 95 6 L 100 8 L 100 35 L 0 35 Z" fill="url(#scSparkBlue)" />
              <path d="M 0 26 Q 30 12, 60 22 T 95 6 L 100 8" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Middle Row: Module Distribution Donut & Status Overview Bar Chart ── */}
      <div className="cd-middle-grid">
        {/* Module Distribution Donut Card */}
        <div className="cd-chart-card">
          <div className="cd-chart-header">
            <div className="cd-title-with-icon">
              <div className="cd-title-icon-box">
                <BarChart3 size={15} />
              </div>
              <div>
                <h3 className="cd-chart-title">Module Distribution</h3>
                <p className="cd-chart-desc">Stock circle dashboards across modules</p>
              </div>
            </div>
            <div className="cd-dropdown-pill">
              <span>All Modules</span>
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="cd-donut-layout">
            <div className="cd-donut-canvas-wrap">
              <Doughnut data={donutData} options={donutOptions} plugins={[donutLabelPlugin]} />
              <div className="cd-donut-center-label">
                <span className="cd-donut-total-num">3</span>
                <span className="cd-donut-total-text">Total</span>
              </div>
            </div>

            {/* Legend Table matching screenshot */}
            <div className="cd-donut-legend-table">
              <div className="cd-legend-row cd-legend-th">
                <span>MODULE</span>
                <span style={{ textAlign: 'center' }}>COUNT</span>
                <span style={{ textAlign: 'right' }}>PERCENTAGE</span>
              </div>
              <div className="cd-legend-row">
                <span className="cd-legend-name">
                  <span className="cd-dot cd-dot-purple" /> Operations
                </span>
                <span className="cd-legend-count">2</span>
                <span className="cd-legend-pct">66.7%</span>
              </div>
              <div className="cd-legend-row">
                <span className="cd-legend-name">
                  <span className="cd-dot cd-dot-orange" /> Inventory
                </span>
                <span className="cd-legend-count">1</span>
                <span className="cd-legend-pct">16.7%</span>
              </div>
              <div className="cd-legend-row">
                <span className="cd-legend-name">
                  <span className="cd-dot cd-dot-pink" /> Purchase
                </span>
                <span className="cd-legend-count">0</span>
                <span className="cd-legend-pct">0%</span>
              </div>
              <div className="cd-legend-row">
                <span className="cd-legend-name">
                  <span className="cd-dot cd-dot-blue" /> Sales
                </span>
                <span className="cd-legend-count">0</span>
                <span className="cd-legend-pct">0%</span>
              </div>
              <div className="cd-legend-row">
                <span className="cd-legend-name">
                  <span className="cd-dot cd-dot-grey" /> Others
                </span>
                <span className="cd-legend-count">0</span>
                <span className="cd-legend-pct">0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Overview Bar Chart Card with 3 Summary Badges */}
        <div className="cd-chart-card">
          <div className="cd-chart-header">
            <div className="cd-title-with-icon">
              <div className="cd-title-icon-box">
                <TrendingUp size={15} />
              </div>
              <div>
                <h3 className="cd-chart-title">Status Overview</h3>
                <p className="cd-chart-desc">Current status of stock circle dashboards</p>
              </div>
            </div>
            <div className="cd-chart-controls">
              <div className="cd-dropdown-pill">
                <span>{selectedBranch}</span>
                <ChevronDown size={14} />
              </div>
              <div className="cd-dropdown-pill">
                <span>{selectedPeriod}</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="cd-bar-canvas-wrap">
            <Bar data={barData} options={barOptions} plugins={[barValuePlugin]} />
          </div>

          {/* 3 Horizontal Status Summary Cards matching screenshot */}
          <div className="sc-status-pills-row">
            <div className="sc-status-pill sc-pill-green">
              <div className="sc-pill-icon-wrap sc-icon-green">
                <CheckCircle2 size={16} />
              </div>
              <div className="sc-pill-data">
                <div className="sc-pill-num">2</div>
                <div className="sc-pill-label">Active</div>
              </div>
              <div className="sc-pill-pct-tag sc-tag-green">66.7%</div>
            </div>

            <div className="sc-status-pill sc-pill-orange">
              <div className="sc-pill-icon-wrap sc-icon-orange">
                <Clock size={16} />
              </div>
              <div className="sc-pill-data">
                <div className="sc-pill-num">1</div>
                <div className="sc-pill-label">Pending</div>
              </div>
              <div className="sc-pill-pct-tag sc-tag-orange">33.3%</div>
            </div>

            <div className="sc-status-pill sc-pill-grey">
              <div className="sc-pill-icon-wrap sc-icon-grey">
                <XCircle size={16} />
              </div>
              <div className="sc-pill-data">
                <div className="sc-pill-num">0</div>
                <div className="sc-pill-label">Inactive</div>
              </div>
              <div className="sc-pill-pct-tag sc-tag-grey">0%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Records Table Card matching screenshot ── */}
      <div className="cd-records-card">
        <div className="cd-records-header">
          <div className="cd-records-title-group">
            <div className="cd-records-icon-box">
              <Layers size={18} />
            </div>
            <h3 className="cd-records-title">Stock Circle Dashboard Records</h3>
          </div>

          <div className="cd-records-toolbar">
            <div className="cd-search-input-wrap">
              <Search size={14} className="cd-search-icon" />
              <input
                type="text"
                placeholder="Search stock circle dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cd-search-input"
              />
            </div>

            <div className="cd-filter-pill-wrap">
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="cd-filter-select"
              >
                <option value="All Modules">All Modules</option>
                <option value="Operations">Operations</option>
                <option value="Inventory">Inventory</option>
              </select>
              <ChevronDown size={13} className="cd-pill-arrow" />
            </div>

            <div className="cd-filter-pill-wrap">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="cd-filter-select"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
              <ChevronDown size={13} className="cd-pill-arrow" />
            </div>

            {/* Solid purple square filter button matching screenshot */}
            <button type="button" className="btn-cd-filter-square" title="Filter Records">
              <Filter size={15} color="#FFFFFF" strokeWidth={2.3} />
            </button>
          </div>
        </div>

        {/* Records Table */}
        <div className="table-responsive">
          <table className="cd-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>RECORD ID</th>
                <th>TITLE / CODE</th>
                <th style={{ width: '160px' }}>MODULE</th>
                <th style={{ width: '160px' }}>
                  <div className="th-sort-wrap">
                    <span>UPDATED DATE</span>
                    <ArrowDown size={12} className="th-sort-icon" />
                  </div>
                </th>
                <th style={{ width: '110px' }}>STATUS</th>
                <th style={{ width: '110px', textAlign: 'center' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="cd-rec-id-badge">{r.id}</span>
                  </td>
                  <td className="cd-rec-title">{r.title}</td>
                  <td>
                    <div className="cd-module-cell">
                      {r.module === 'Operations' ? (
                        <Layers size={14} className="cd-mod-icon cd-icon-blue-fill" />
                      ) : (
                        <Package size={14} className="cd-mod-icon cd-icon-orange-fill" />
                      )}
                      <span>{r.module}</span>
                    </div>
                  </td>
                  <td className="cd-rec-date">{r.updatedDate}</td>
                  <td>
                    <span className={`cd-status-badge ${r.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div className="cd-actions-cell">
                      <button
                        type="button"
                        className="btn-cd-action"
                        title="View"
                        onClick={() => openModal('recordDetails', `Stock Circle: ${r.title}`, { data: r })}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-cd-action"
                        title="Edit"
                        onClick={() => openModal('recordDetails', `Edit Stock Circle: ${r.title}`, { data: r })}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-cd-action"
                        title="More Actions"
                        onClick={() => showToast(`Actions menu for ${r.id}`)}
                      >
                        <MoreVertical size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer matching screenshot */}
        <div className="cd-pagination-footer">
          <span className="cd-footer-count">
            Showing 1 to {filteredRecords.length} of {filteredRecords.length} entries
          </span>
          <div className="cd-pagination">
            <button type="button" className="cd-page-btn" disabled>
              <ChevronLeft size={14} />
            </button>
            <button type="button" className="cd-page-btn is-active">
              1
            </button>
            <button type="button" className="cd-page-btn" disabled>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

