import React, { useState } from 'react';
import { Plus, Download, Filter, FileText, CheckCircle2, MoreVertical, Layers } from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { htmlPagesData } from '../../data/htmlPagesData';
import {
  sidebarRouteConfig, salesTargetData, purchaseData, incentiveData,
  receiptData, checklistData, materialsData, logsData, approvalsData,
  purchaseReturnData
} from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function GenericWorkflowPage({ pageId }) {
  const { openModal, showToast } = useApp();

  const pageConfig = htmlPagesData[pageId] || {};
  const routeConfig = sidebarRouteConfig[pageId];

  // Specific dataset mapping if available in mockData
  const datasetMap = {
    'sales-target': { data: salesTargetData, cols: ['branch', 'department', 'section', 'targetMonth', 'targetAmount', 'status'] },
    'purchase-entries': { data: purchaseData, cols: ['id', 'invoiceNumber', 'invoiceDate', 'poNumber', 'vendor', 'items', 'totalAmount'] },
    'incentive-approvals': { data: incentiveData, cols: ['id', 'startDate', 'endDate', 'branch', 'designation', 'incentiveType', 'totalIncentive', 'status'] },
    'receipt-entry': { data: receiptData, cols: ['id', 'voucherDate', 'branch', 'totalAmount', 'createdBy'] },
    'checklist': { data: checklistData, cols: ['id', 'title', 'branch', 'assignedTo', 'dueDate', 'status'] },
    'materials': { data: materialsData, cols: ['id', 'material', 'category', 'quantity', 'unit', 'status'] },
    'logs': { data: logsData, cols: ['id', 'user', 'action', 'module', 'timestamp'] },
    'approvals': { data: approvalsData, cols: ['id', 'employee', 'type', 'from', 'to', 'status'] },
    'purchase-return': { data: purchaseReturnData, cols: ['id', 'returnDate', 'invoiceNumber', 'vendor', 'items', 'totalAmount', 'status'] }
  };

  const currentDataset = datasetMap[pageId];

  // Determine Title, Subtitle, Breadcrumb
  const pageTitle = routeConfig?.title || pageConfig.title || pageId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const pageSubtitle = routeConfig?.subtitle || pageConfig.subtitle || `${pageTitle} module operations and record management.`;
  const breadcrumb = pageConfig.breadcrumb || `A1-MART / ${pageTitle}`;

  // Determine Columns and Rows
  let columns = [];
  let rows = [];

  if (routeConfig) {
    columns = routeConfig.columns;
    rows = routeConfig.rows;
  } else if (currentDataset) {
    columns = currentDataset.cols.map(c => ({
      header: c.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      accessor: c
    }));
    rows = currentDataset.data;
  } else if (pageConfig.tables && pageConfig.tables.length > 0) {
    const mainTable = pageConfig.tables[0];
    columns = mainTable.headers;
    rows = mainTable.rows;
  } else {
    // Fallback default columns
    columns = ['Record ID', 'Title / Code', 'Module', 'Updated Date', 'Status'];
    rows = [
      ['REC-001', `${pageTitle} Standard Entry A`, 'Operations', '24 Oct 2026', 'Active'],
      ['REC-002', `${pageTitle} Standard Entry B`, 'Operations', '23 Oct 2026', 'Active'],
      ['REC-003', `${pageTitle} Standard Entry C`, 'Inventory', '22 Oct 2026', 'Pending']
    ];
  }

  // Calculate stats
  const totalCount = rows.length;
  const activeCount = rows.filter(r => {
    const str = JSON.stringify(r).toLowerCase();
    return str.includes('active') || str.includes('done') || str.includes('approved') || str.includes('paid');
  }).length;

  return (
    <div className="content-wrapper">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-breadcrumb">
            <span>{breadcrumb}</span>
          </div>
          <h1 className="page-main-heading">{pageTitle}</h1>
          <p className="page-subheading">{pageSubtitle}</p>
        </div>

        <div className="header-action-group">
          <button
            className="btn-secondary btn-pill-sm"
            onClick={() => showToast(`Exported ${pageTitle} records to CSV.`)}
          >
            <Download size={14} /> Export CSV
          </button>

          <button
            className="btn-primary btn-pill-sm"
            onClick={() => openModal('prototypeAction', `Add ${pageTitle}`, {
              message: `Add form for ${pageTitle} is ready. Submit new records directly into the ERP database.`
            })}
          >
            <Plus size={14} /> Add {pageTitle.replace(/s$/, '')}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-grid">
        <StatCard
          label={`Total ${pageTitle}`}
          value={totalCount.toString()}
          trend="Total"
          isPositive={true}
          icon={Layers}
        />
        <StatCard
          label="Active / Verified"
          value={activeCount.toString()}
          trend={`${totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 100}%`}
          isPositive={true}
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending Sync"
          value={Math.max(0, totalCount - activeCount).toString()}
          trend="In Review"
          isPositive={false}
          icon={FileText}
        />
        <StatCard
          label="Compliance Rate"
          value="99.4%"
          trend="Optimal"
          isPositive={true}
          icon={CheckCircle2}
        />
      </div>

      {/* Filter selects if page has them */}
      {pageConfig.filters && pageConfig.filters.length > 0 && (
        <div className="content-card" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Filter by:
            </span>
            {pageConfig.filters.map((fil, i) => (
              <select
                key={i}
                className="form-select"
                style={{ width: 'auto', minWidth: '180px', padding: '6px 12px' }}
                onChange={(e) => showToast(`Filtered by ${e.target.value}`)}
              >
                {fil.options.map((opt, oi) => (
                  <option key={oi}>{opt}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      )}

      {/* Data Table */}
      <div>
        <h3 className="card-main-title" style={{ marginBottom: '14px' }}>
          {pageTitle} Records
        </h3>
        <DataTable
          columns={columns}
          data={rows}
          pageSize={10}
          searchPlaceholder={`Search ${pageTitle.toLowerCase()}...`}
          title={pageTitle}
        />
      </div>

      {/* If page had secondary tables in HTML (like target-stats) */}
      {pageConfig.tables && pageConfig.tables.length > 1 && (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {pageConfig.tables.slice(1).map((secTable, secIdx) => (
            <div key={secIdx}>
              <h3 className="card-main-title" style={{ marginBottom: '14px' }}>
                Secondary Table #{secIdx + 2}
              </h3>
              <DataTable
                columns={secTable.headers}
                data={secTable.rows}
                pageSize={5}
                searchPlaceholder="Search breakdown..."
                title={`${pageTitle} Breakdown`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

