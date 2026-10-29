import React, { useState } from 'react';
import {
  FileText, Coins, Users, Tag, Download, ChevronDown,
  ArrowRight, Trophy, DollarSign, Clock, MapPin, Plus, Receipt, RotateCw
} from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import { useApp } from '../../context/AppContext';

export default function AccountsDashboard() {
  const { openModal, showToast, triggerDemoReload } = useApp();

  // Filters from original legacy HTML
  const [branch, setBranch] = useState('All Branches');
  const [designation, setDesignation] = useState('All Designations');
  const [fromDate, setFromDate] = useState('2026-10-23');
  const [toDate, setToDate] = useState('2026-10-23');

  // Real recent transactions from A1-MART receipt & purchase logs
  const realTransactions = [
    {
      id: 1,
      title: 'Counter 01 Bill #3841',
      branch: 'A1MART-SARON',
      amount: '₹1,250.00',
      time: '15 Min Ago',
      color: '#4ADE80',
      initials: 'BC'
    },
    {
      id: 2,
      title: 'Counter 02 Bill #3840',
      branch: 'A1-MART CORPORATE',
      amount: '₹4,820.00',
      time: 'Today',
      color: '#38BDF8',
      initials: 'BC'
    },
    {
      id: 3,
      title: 'Vendor Invoice PO-162',
      branch: 'r s manufacturing',
      amount: '₹35,472.30',
      time: '2 Days Ago',
      color: '#A855F7',
      initials: 'PO'
    },
    {
      id: 4,
      title: 'Counter 01 Bill #3839',
      branch: 'A1MART-SARON',
      amount: '₹2,140.00',
      time: '3 Days Ago',
      color: '#FB923C',
      initials: 'BC'
    }
  ];

  // Real A1-MART Store Products (from master-products and repack-items-master)
  const realStoreProducts = [
    {
      code: 'PRD-001',
      name: 'Rice 5 kg (A1 Ponni Boiled)',
      category: 'Grocery',
      price: '₹320.00',
      sold: '1,250 packs',
      revenue: '₹4,00,000',
      stock: '125 in stock',
      status: 'Active'
    },
    {
      code: 'PRD-002',
      name: 'Cooking Oil 1 L (Gold Winner)',
      category: 'Grocery',
      price: '₹145.00',
      sold: '2,400 units',
      revenue: '₹3,48,000',
      stock: '86 in stock',
      status: 'Active'
    },
    {
      code: 'PRD-003',
      name: 'Detergent 1 kg (Ariel Matic)',
      category: 'Household',
      price: '₹110.00',
      sold: '980 units',
      revenue: '₹1,07,800',
      stock: '42 in stock',
      status: 'Active'
    },
    {
      code: 'RPK-001',
      name: 'Toor Dal 1 kg Pack (Repack)',
      category: 'Staples & Pulses',
      price: '₹160.00',
      sold: '1,120 packs',
      revenue: '₹1,79,200',
      stock: '64 in stock',
      status: 'Active'
    },
    {
      code: 'RPK-002',
      name: 'Sugar 1 kg Pack (Bulk Repack)',
      category: 'Staples',
      price: '₹45.00',
      sold: '3,100 packs',
      revenue: '₹1,39,500',
      stock: '210 in stock',
      status: 'Active'
    }
  ];

  // Real 10-month sales trend figures from legacy/app.js (in ₹ Lakhs)
  const salesMonths = [
    { month: 'Jan', val: 32.0, height: '70px' },
    { month: 'Feb', val: 28.0, height: '62px' },
    { month: 'Mar', val: 41.0, height: '90px' },
    { month: 'Apr', val: 36.0, height: '79px' },
    { month: 'May', val: 48.0, height: '106px' },
    { month: 'Jun', val: 52.0, height: '115px' },
    { month: 'Jul', val: 44.0, height: '97px' },
    { month: 'Aug', val: 49.0, height: '108px' },
    { month: 'Sep', val: 51.0, height: '112px' },
    { month: 'Oct', val: 48.3, height: '136px', isActive: true }
  ];

  const handleClearFilters = () => {
    setBranch('All Branches');
    setDesignation('All Designations');
    setFromDate('2026-10-23');
    setToDate('2026-10-23');
    showToast('Filters cleared to default range.');
  };

  return (
    <>
      {/* 1. Filter Controls cleanly aligned directly above dashboard grid */}
      <div className="page-title-row accounts-filter-bar-row">
        {/* Real filters from legacy/index.html */}
        <div className="page-filters-row">
          <select
            className="header-select-pill"
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              showToast(`Branch filtered: ${e.target.value}`);
            }}
          >
            <option>All Branches</option>
            <option>A1-MART CORPORATE OFFICE</option>
            <option>A1MART-SARON</option>
            <option>A1MART-DISTRIBUTION WAREHOUSE</option>
          </select>

          <select
            className="header-select-pill"
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
              showToast(`Designation filtered: ${e.target.value}`);
            }}
          >
            <option>All Designations</option>
            <option>IT AND SOFTWARE MANAGER</option>
            <option>BILLING OPERATOR</option>
            <option>GRN-HELPER</option>
          </select>

          <input
            type="date"
            className="header-date-pill"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            className="header-date-pill"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <button
            className="pill-action-btn"
            onClick={handleClearFilters}
            title="Clear filters"
          >
            Clear
          </button>

          <button
            className="pill-action-btn"
            onClick={() => {
              triggerDemoReload(400);
              showToast('Syncing real-time ledger & store counters...', 'info');
            }}
            title="Simulate Live Store Sync (Customer Demo)"
          >
            <RotateCw size={13} />
            <span>Sync</span>
          </button>

          <button
            className="pill-action-btn primary"
            onClick={() => openModal('taskForm', 'Add New Task')}
          >
            <Plus size={14} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* 2. Top Dashboard Grid (Hero Banner + 2x2 Stat Cards with REAL DATA) */}
      <div className="top-dashboard-grid">
        {/* Left: Large Promotional Banner */}
        <HeroBanner />

        {/* Right: Exactly 4 Statistic Cards with Original A1-MART Values */}
        <div className="stat-cards-2x2">
          <StatCard
            label="Total Sales"
            value="₹48,32,500"
            trend="+14.2%"
            isPositive={true}
            icon={Coins}
            onClick={() => showToast('Total Sales: ₹48,32,500 (Gross turnover across all branches)')}
          />
          <StatCard
            label="Total Bills"
            value="3,841"
            trend="+2.3%"
            isPositive={true}
            icon={Receipt}
            onClick={() => showToast('Total Bills: 3,841 counter receipts registered')}
          />
          <StatCard
            label="Total Users / Staff"
            value="152"
            trend="+5.0%"
            isPositive={true}
            icon={Users}
            onClick={() => showToast('Total Users: 152 active retail employees')}
          />
          <StatCard
            label="Avg Bill Value"
            value="₹1,258"
            trend="+3.1%"
            isPositive={true}
            icon={Tag}
            onClick={() => showToast('Avg Bill Value: ₹1,258 | Avg Sales/User: ₹31,793')}
          />
        </div>
      </div>

      {/* 3. Second Dashboard Grid (Monthly Income Chart + Sales History) */}
      <div className="second-dashboard-grid">
        {/* Left: Monthly Sales Overview Card */}
        <div className="dashboard-card">
          <div className="card-header-bar">
            <div className="card-header-left">
              <div className="card-title-icon">
                <Coins size={16} color="#17171D" />
              </div>
              <span className="card-heading-text">Monthly Sales Overview (₹ Lakhs)</span>
            </div>

            {/* Legend dots */}
            <div className="chart-legend-row">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#7950F2' }} />
                <span>Sales (₹)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#45B881' }} />
                <span>Target</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#FB923C' }} />
                <span>Bills</span>
              </div>
            </div>

            {/* Actions */}
            <div className="card-header-actions">
              <button
                className="card-small-btn"
                onClick={() => showToast('Sorted by: Month chronology')}
              >
                <span>Sort By</span>
                <ChevronDown size={12} />
              </button>
              <button
                className="card-small-btn"
                onClick={() => showToast('Exporting sales history to CSV...')}
              >
                <span>Export</span>
                <Download size={12} />
              </button>
            </div>
          </div>

          {/* Stadium Cylindrical Bar Chart with Real A1-MART Month Figures */}
          <div className="income-chart-container">
            {/* Y Axis Ticks in Lakhs */}
            <div className="chart-y-axis">
              <span>₹60L</span>
              <span>₹45L</span>
              <span>₹30L</span>
              <span>₹15L</span>
              <span>₹0</span>
            </div>

            {/* Stadium Cylindrical Bars */}
            <div className="chart-bars-wrap">
              {salesMonths.map((m) => (
                <div key={m.month} className="chart-col">
                  <div
                    className={`stadium-bar ${m.isActive ? 'active-purple' : 'hatched'}`}
                    style={{ height: m.height }}
                    title={`${m.month}: ₹${m.val} Lakhs`}
                    onClick={() => showToast(`${m.month} 2026 Sales: ₹${m.val} Lakhs`)}
                  >
                    {m.isActive && <div className="active-bar-dot" />}
                  </div>
                  <span
                    className="chart-x-label"
                    style={m.isActive ? { fontWeight: 700, color: '#7950F2' } : {}}
                  >
                    {m.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Real Store Sales History */}
        <div className="dashboard-card">
          <div className="card-header-bar">
            <div className="card-header-left">
              <div className="card-title-icon">
                <Receipt size={16} color="#17171D" />
              </div>
              <span className="card-heading-text">Recent Store Transactions</span>
            </div>

            <button
              className="view-all-link"
              onClick={() => showToast('Opening complete receipt ledger...')}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="sales-history-list">
            {realTransactions.map((item) => (
              <div key={item.id} className="sales-history-row">
                <div className="sales-row-left">
                  <div className="sales-thumb" style={{ background: 'rgba(121, 80, 242, 0.12)' }}>
                    <span>{item.initials}</span>
                  </div>
                  <div className="sales-meta">
                    <span className="sales-title">{item.title}</span>
                    <span className="sales-country">
                      <MapPin size={11} color="#777780" />
                      <span>{item.branch}</span>
                    </span>
                  </div>
                </div>

                <div className="sales-row-right">
                  <span className="sales-amount">{item.amount}</span>
                  <span className="sales-time">
                    <Clock size={10} color="#9E9EA7" />
                    <span>{item.time}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Full-Width Section: Real A1-MART Top Selling Products */}
      <div className="products-card-container">
        <div className="card-header-bar">
          <div className="card-header-left">
            <div className="card-title-icon">
              <Trophy size={16} color="#17171D" />
            </div>
            <span className="card-heading-text">Top Selling Store Products (A1-MART Master Inventory)</span>
          </div>

          <button
            className="card-small-btn"
            onClick={() => showToast('Sorted by: Highest turnover')}
          >
            <span>Sort By</span>
            <ChevronDown size={12} />
          </button>
        </div>

        <table className="products-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Product Details</th>
              <th>Category</th>
              <th>Unit MRP / Price</th>
              <th>Units Sold</th>
              <th>Gross Turnover</th>
              <th>Live Available Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {realStoreProducts.map((p) => (
              <tr key={p.code}>
                <td style={{ fontWeight: 700, color: '#7950F2' }}>{p.code}</td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td style={{ color: '#777780' }}>{p.category}</td>
                <td style={{ fontWeight: 700 }}>{p.price}</td>
                <td>{p.sold}</td>
                <td style={{ fontWeight: 700, color: '#17171D' }}>{p.revenue}</td>
                <td style={{ color: '#45B881', fontWeight: 600 }}>{p.stock}</td>
                <td>
                  <span
                    className={`trend-badge ${p.status === 'Active' ? 'positive' : 'negative'}`}
                    style={{ fontSize: '10.5px' }}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
