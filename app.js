/* app.js — A1-MART ERP Application Logic */
// Version: 1.0.0

'use strict';

// ============================================================
// PAGE NAVIGATION
// ============================================================
const allPages = document.querySelectorAll('.page');
const allNavItems = document.querySelectorAll('.nav-item, .nav-sub-item');

function navigate(pageId) {
  document.querySelectorAll('main .page').forEach(page => {
    page.classList.remove('active');
  });

  const target = document.getElementById('page-' + pageId);

  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Create a consistent prototype screen for newly-added sidebar routes.
    const labelNode = Array.from(document.querySelectorAll('.nav-sub-item')).find(n => (n.getAttribute('onclick') || '').includes("'" + pageId + "'"));
    const label = labelNode ? labelNode.textContent.trim() : pageId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const page = document.createElement('section');
    page.className = 'page active'; page.id = 'page-' + pageId;
    page.innerHTML = `<div class="page-header"><div><div class="breadcrumb">A1-MART / ${label}</div><h1 class="page-title">${label}</h1><p class="page-subtitle">${label} workspace</p></div></div><div class="content-card"><div class="empty-state"><i class="fa fa-clipboard-list"></i><h3>${label}</h3><p>This route is connected to the sidebar. Its detailed form, table, and business workflow can be implemented next.</p></div></div>`;
    document.querySelector('main')?.appendChild(page);
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Mark active nav item
  allNavItems.forEach(n => {
    n.classList.remove('active-page', 'active');
    if (n.getAttribute('onclick') && n.getAttribute('onclick').includes("'" + pageId + "'")) {
      n.classList.add('active-page');
    }
  });
  // Close search panel
  closeSearch();
  // Init page-specific content
  initPage(pageId);
  renderSidebarRoute(pageId, target || document.getElementById('page-' + pageId));
}


// ============================================================
// MASTER DATA + TASK SUBROUTE CONTENT
// These screens use demo rows until connected to your backend.
const sidebarRouteConfig = {
  'master-designations': {
    title: 'Designations', subtitle: 'Manage employee roles and job titles.',
    columns: ['Designation ID', 'Designation', 'Department', 'Employees', 'Status'],
    rows: [['DSG-001','IT and Software Manager','IT',2,'Active'],['DSG-002','Billing Operator','Accounts',18,'Active'],['DSG-003','GRN Helper','Warehouse',8,'Active']]
  },
  'master-branches': {
    title: 'Branches', subtitle: 'Manage company branches and office locations.',
    columns: ['Branch Code', 'Branch Name', 'Location', 'Contact', 'Status'],
    rows: [['BR-001','A1-MART Corporate Office','Chennai','044-40000001','Active'],['BR-002','A1MART-SARON','Tamil Nadu','044-40000002','Active'],['BR-003','A1MART Distribution Warehouse','Chennai','044-40000003','Active']]
  },
  'master-list': {
    title: 'Master List', subtitle: 'Browse core reference data used across A1-MART.',
    columns: ['Master Code', 'Master Name', 'Category', 'Last Updated', 'Status'],
    rows: [['MST-001','Employee Types','HR','23 Oct 2026','Active'],['MST-002','Payment Modes','Accounts','22 Oct 2026','Active'],['MST-003','Product Units','Inventory','20 Oct 2026','Active']]
  },
  'billing-counters': {
    title: 'Billing Counters', subtitle: 'Manage billing counter IDs, branch mapping, and counter status.',
    columns: ['Counter ID', 'Counter Name', 'Branch', 'Assigned User', 'Status'],
    rows: [['BC-001','Counter 01','A1-MART Corporate Office','K. Priya','Active'],['BC-002','Counter 02','A1MART-SARON','R. Kumar','Active'],['BC-003','Counter 03','A1MART-SARON','Unassigned','Inactive']]
  },
  'master-products': {
    title: 'Products', subtitle: 'Maintain product names, codes, categories, and pricing.',
    columns: ['Product Code', 'Product Name', 'Category', 'Unit Price', 'Stock', 'Status'],
    rows: [['PRD-001','Rice 5 kg','Grocery','₹320','125','Active'],['PRD-002','Cooking Oil 1 L','Grocery','₹145','86','Active'],['PRD-003','Detergent 1 kg','Household','₹110','42','Active']]
  },
  'repack-items-master': {
    title: 'Repack Items Master', subtitle: 'Configure repack products and their source materials.',
    columns: ['Item Code', 'Repack Item', 'Source Material', 'Pack Size', 'Unit', 'Status'],
    rows: [['RPK-001','Rice 1 kg Pack','Rice Bulk','1 kg','Pack','Active'],['RPK-002','Sugar 500 g Pack','Sugar Bulk','500 g','Pack','Active'],['RPK-003','Toor Dal 1 kg Pack','Toor Dal Bulk','1 kg','Pack','Active']]
  }
};

function renderSidebarRoute(id, page) {
  if (!page) return;
  const config = sidebarRouteConfig[id];
  if (!config) return;

  const head = `<div class="page-header"><div><div class="breadcrumb">A1-MART / Master Data / ${config.title}</div><h1 class="page-title">${config.title}</h1><p class="page-subtitle">${config.subtitle}</p></div><button class="btn-primary" type="button" onclick="showToast('Add ${config.title} form can be connected next.')"><i class="fa fa-plus"></i> Add ${config.title.replace(/s$/, '')}</button></div>`;
  const rows = config.rows.map(row => `<tr>${row.map((value, index) => `<td>${index === row.length - 1 ? `<span class="badge badge-active">${value}</span>` : value}</td>`).join('')}<td><button class="action-btn" type="button" title="More actions" onclick="showToast('Record actions selected.')"><i class="fa fa-ellipsis-v"></i></button></td></tr>`).join('');
  page.innerHTML = `${head}
    <div class="stats-grid route-stats">
      <div class="stat-card"><div class="stat-label">Total ${config.title}</div><div class="stat-value">${config.rows.length}</div><div class="stat-bar orange"></div></div>
      <div class="stat-card"><div class="stat-label">Active Records</div><div class="stat-value">${config.rows.filter(r => String(r[r.length - 1]).toLowerCase() === 'active').length}</div><div class="stat-bar blue"></div></div>
    </div>
    <div class="content-card route-table-card">
      <div class="route-toolbar"><input class="route-search" type="search" placeholder="Search ${config.title.toLowerCase()}..." oninput="filterRouteRows(this)"><span class="route-record-count">${config.rows.length} demo records</span></div>
      <div class="table-responsive"><table class="data-table"><thead><tr>${config.columns.map(c => `<th>${c}</th>`).join('')}<th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>`;
}

function filterRouteRows(input) {
  const query = input.value.toLowerCase();
  const table = input.closest('.route-table-card').querySelector('tbody');
  table.querySelectorAll('tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

function initPage(id) {
  switch (id) {
    case 'accounts-dashboard': initAccountsDashboard(); break;
    case 'employee-dashboard': initEmployeeDashboard(); break;
    case 'payroll-dashboard': initPayrollDashboard(); break;
    case 'attendance-dashboard': initAttendanceDashboard(); break;
    case 'tasks': renderTable('tasksBody', taskData, ['id', 'title', 'status', 'priority', 'assignedTo', 'createdBy', 'createdAt'], 'tasksPagination'); break;
    case 'sales-target': renderTable('salesTargetBody', salesTargetData, ['branch', 'department', 'section', 'targetMonth', 'targetAmount', 'status'], 'salesTargetPagination'); break;
    case 'purchase-entries': renderTable('purchaseBody', purchaseData, ['id', 'invoiceNumber', 'invoiceDate', 'poNumber', 'vendor', 'items', 'totalAmount'], 'purchasePagination'); break;
    case 'incentive-approvals': renderTable('incentiveBody', incentiveData, ['id', 'startDate', 'endDate', 'branch', 'designation', 'incentiveType', 'totalIncentive', 'status'], 'incentivePagination'); break;
    case 'receipt-entry': renderTable('receiptBody', receiptData, ['id', 'voucherDate', 'branch', 'totalAmount', 'createdBy'], 'receiptPagination'); break;
    case 'stock-details': renderStockDetails(); break;
    case 'load-data': renderCalendar('loadCalendar'); break;
    case 'performance': renderCalendar('perfCalendar'); break;
    case 'checklist': renderTable('checklistBody', checklistData, ['id', 'title', 'branch', 'assignedTo', 'dueDate', 'status'], null); break;
    case 'materials': renderTable('materialsBody', materialsData, ['id', 'material', 'category', 'quantity', 'unit', 'status'], null); break;
    case 'payroll': renderTable('payrollBody', payrollData, ['id', 'employee', 'branch', 'month', 'basic', 'allowances', 'deductions', 'netPay', 'status'], null); break;
    case 'logs': renderTable('logsBody', logsData, ['id', 'user', 'action', 'module', 'timestamp'], null); break;
    case 'approvals': renderTable('approvalsBody', approvalsData, ['id', 'employee', 'type', 'from', 'to', 'status'], null); break;
    case 'purchase-return': renderTable('returnBody', purchaseReturnData, ['id', 'returnDate', 'invoiceNumber', 'vendor', 'items', 'totalAmount', 'status'], null); break;
    case 'transport': renderTable('transportBody', transportData, ['id', 'vehicle', 'driver', 'route', 'date', 'status'], null); break;
    case 'master-employees': renderTable('masterEmpBody', employeeData, ['id', 'name', 'branch', 'designation', 'gender', 'status'], null); break;
    default: break;
  }
}

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('sidebarToggle');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

function toggleSubmenu(el) {
  const isOpen = el.classList.contains('open');
  // Close siblings
  document.querySelectorAll('.nav-item.has-sub.open').forEach(i => {
    if (i !== el) {
      i.classList.remove('open');
      const nextSib = i.nextElementSibling;
      if (nextSib && nextSib.classList.contains('nav-submenu')) nextSib.classList.remove('open');
    }
  });
  el.classList.toggle('open', !isOpen);
  const submenu = el.nextElementSibling;
  if (submenu && submenu.classList.contains('nav-submenu')) {
    submenu.classList.toggle('open', !isOpen);
  }
}

// ============================================================
// SEARCH
// ============================================================
const searchPages = [
  { label: 'Accounts Dashboard', id: 'accounts-dashboard' },
  { label: 'Employee Dashboard', id: 'employee-dashboard' },
  { label: 'Payroll Dashboard', id: 'payroll-dashboard' },
  { label: 'Attendance Dashboard', id: 'attendance-dashboard' },
  { label: 'Stock Circle Dashboard', id: 'stock-circle-dashboard' },
  { label: 'Checklist Dashboard', id: 'checklist-dashboard' },
  { label: 'Master Data', id: 'master-data' },
  { label: 'Designations', id: 'master-designations' },
  { label: 'Branches', id: 'master-branches' },
  { label: 'Master List', id: 'master-list' },
  { label: 'Billing Counters', id: 'billing-counters' },
  { label: 'Products', id: 'master-products' },
  { label: 'Repack Items Master', id: 'repack-items-master' },
  { label: 'View All Tasks', id: 'tasks' },
  { label: 'View My Tasks', id: 'my-tasks' },
  { label: 'Employees (Master)', id: 'master-employees' },
  { label: 'Task Management', id: 'tasks' },
  { label: 'Performance Entry', id: 'performance' },
  { label: 'Sales Target', id: 'sales-target' },
  { label: 'Checklist Management', id: 'checklist' },
  { label: 'Materials Management', id: 'materials' },
  { label: 'Stock Details', id: 'stock-details' },
  { label: 'Purchase Entries', id: 'purchase-entries' },
  { label: 'Add Circle', id: 'add-circle' },
  { label: 'Reports', id: 'reports' },
  { label: 'Approvals', id: 'approvals' },
  { label: 'Incentive Approvals', id: 'incentive-approvals' },
  { label: 'Billing Checker Incentive', id: 'billing-checker-incentive' },
  { label: 'Logs', id: 'logs' },
  { label: 'Payroll Management', id: 'payroll' },
  { label: 'Receipt Entry', id: 'receipt-entry' },
  { label: 'Load Data', id: 'load-data' },
  { label: 'Purchase Return', id: 'purchase-return' },
  { label: 'Transport Management', id: 'transport' },
  { label: 'Settings', id: 'settings' },
];

function toggleSearch() {
  const panel = document.getElementById('searchPanel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    document.getElementById('searchInput').focus();
    document.getElementById('searchResults').innerHTML = '';
  }
}
function closeSearch() {
  document.getElementById('searchPanel').classList.remove('open');
}
window.searchPages = function (q) {
  const res = document.getElementById('searchResults');
  if (!q.trim()) { res.innerHTML = ''; return; }
  const filtered = searchPages.filter(p => p.label.toLowerCase().includes(q.toLowerCase()));
  if (!filtered.length) { res.innerHTML = '<div style="padding:10px 12px;color:#6b7280;font-size:13px">No results found</div>'; return; }
  res.innerHTML = filtered.map(p =>
    `<div class="search-result-item" onclick="navigate('${p.id}');closeSearch()">
      <span class="search-result-dot"></span>${p.label}
    </div>`
  ).join('');
};

// ============================================================
// CHARTS
// ============================================================
let chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

function initAccountsDashboard() {
  // Animate stat counters
  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    el.textContent = el.dataset.target;
  });

  destroyChart('salesChart');
  destroyChart('billsChart');

  const salesCtx = document.getElementById('salesChart');
  if (salesCtx) {
    chartInstances['salesChart'] = new Chart(salesCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Sales (₹)',
          data: [3200000, 2800000, 4100000, 3600000, 4800000, 5200000, 4400000, 4900000, 5100000, 4832500],
          backgroundColor: 'rgba(224,123,58,0.7)',
          borderColor: '#e07b3a',
          borderWidth: 2,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { callback: v => '₹' + (v / 100000).toFixed(1) + 'L', font: { size: 11 } }, grid: { color: '#f1f2f6' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  destroyChart('billsChart');
  const billsCtx = document.getElementById('billsChart');
  if (billsCtx) {
    chartInstances['billsChart'] = new Chart(billsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Corporate Office', 'A1MART-SARON', 'Distribution WH'],
        datasets: [{
          data: [1842, 1304, 695],
          backgroundColor: ['#e07b3a', '#6366f1', '#22c55e'],
          borderWidth: 3,
          borderColor: '#fff',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } }
        },
        cutout: '60%'
      }
    });
  }
}

function initEmployeeDashboard() {
  renderTable('employeesBody', employeeData, ['id', 'name', 'branch', 'designation', 'gender', 'status'], 'employeesPagination');

  destroyChart('religionChart');
  destroyChart('genderChart');

  const relCtx = document.getElementById('religionChart');
  if (relCtx) {
    chartInstances['religionChart'] = new Chart(relCtx, {
      type: 'bar',
      data: {
        labels: ['Hindu', 'Muslim', 'Christian'],
        datasets: [{
          data: [133, 15, 4],
          backgroundColor: ['#4e79d7', '#4ea86d', '#f0c24b'],
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { grid: { color: '#f1f2f6' } }, x: { grid: { display: false } } }
      }
    });
  }

  const genCtx = document.getElementById('genderChart');
  if (genCtx) {
    chartInstances['genderChart'] = new Chart(genCtx, {
      type: 'pie',
      data: {
        labels: ['Male (66)', 'Female (86)'],
        datasets: [{ data: [66, 86], backgroundColor: ['#4e79d7', '#4ea86d'], borderWidth: 3, borderColor: '#fff' }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 14 } } } }
    });
  }
}

function initPayrollDashboard() {
  destroyChart('payrollChart');
  const ctx = document.getElementById('payrollChart');
  if (ctx) {
    chartInstances['payrollChart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Payroll (₹)',
          data: [1280000, 1310000, 1290000, 1350000, 1420000, 1390000, 1410000, 1450000, 1470000, 1428500],
          borderColor: '#e07b3a',
          backgroundColor: 'rgba(224,123,58,0.08)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#e07b3a',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { callback: v => '₹' + (v / 100000).toFixed(1) + 'L' }, grid: { color: '#f1f2f6' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

function initAttendanceDashboard() {
  destroyChart('attendanceChart');
  const ctx = document.getElementById('attendanceChart');
  if (ctx) {
    chartInstances['attendanceChart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          { label: 'Present', data: [142, 138, 145, 140, 136, 128, 105], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#22c55e' },
          { label: 'Absent', data: [10, 14, 7, 12, 16, 24, 47], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.05)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#ef4444' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } },
        scales: { y: { grid: { color: '#f1f2f6' } }, x: { grid: { display: false } } }
      }
    });
  }
}

// ============================================================
// CALENDAR
// ============================================================
function renderCalendar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const today = new Date();
  const daysInMonth = 31;
  const todayDate = today.getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const div = document.createElement('div');
    div.className = 'cal-day';
    div.textContent = d;
    if (d < 22 && d !== 22) div.classList.add('uploaded');
    else if (d === 22 || d === 23) div.classList.add('missed');
    else div.classList.add('pending');
    if (d === todayDate) div.classList.add('today');
    div.onclick = () => showToast(`Selected: ${d}/10/2026`);
    container.appendChild(div);
  }
}

// ============================================================
// STOCK DETAILS
// ============================================================
function renderStockDetails() {
  const stockData = [
    { name: 'B.SATHYA', id: 'A1-001', suppliers: 16 },
    { name: 'RAMKUMAR M', id: 'A1-006', suppliers: 11 },
    { name: 'BALU SRIDHAR', id: 'A1-513', suppliers: 1 },
    { name: 'BALAMURUGAN-A', id: 'A1-003', suppliers: 1 },
    { name: 'VIJAY K', id: 'A1-254', suppliers: 1 },
    { name: 'FAHATH MUHAMMED V', id: 'A1-420', suppliers: 1 },
  ];
  const container = document.getElementById('stockGroupList');
  if (!container) return;
  container.innerHTML = stockData.map(s => `
    <div class="stock-group-item">
      <div class="stock-buyer">
        <i class="fa fa-circle-user"></i>
        <span>${s.name}</span>
        <span class="stock-meta">${s.id} &nbsp; ${s.suppliers} supplier(s)</span>
      </div>
      <div class="stock-actions">
        <button class="btn-secondary" style="padding:6px 14px;font-size:12px"><i class="fa fa-download"></i> Export</button>
        <button class="action-btn"><i class="fa fa-chevron-down"></i></button>
      </div>
    </div>
  `).join('');
}

// ============================================================
// TABLE RENDERER
// ============================================================
const PAGE_SIZE = 20;
const paginationState = {};

function renderTable(tbodyId, data, cols, paginId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  paginationState[tbodyId] = paginationState[tbodyId] || 1;

  const page = paginationState[tbodyId];
  const start = (page - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);

  tbody.innerHTML = pageData.length === 0
    ? `<tr><td colspan="${cols.length + 1}" class="no-rows">No Records Found</td></tr>`
    : pageData.map((row, idx) => `
      <tr>
        ${cols.map(col => `<td>${formatCell(col, row[col], row)}</td>`).join('')}
        <td><button class="action-btn" aria-label="Record actions" title="Record actions" onclick="rowAction('${tbodyId}', ${start + idx})"><i class="fa fa-ellipsis-v"></i></button></td>
      </tr>
    `).join('');

  if (paginId) renderPagination(paginId, data.length, page, tbodyId, data, cols);
}

function formatCell(col, val, row) {
  if (val === undefined || val === null || val === '') return '—';
  if (col === 'status') return `<span class="badge badge-${val.toLowerCase().replace(/\s+/g, '-')}">${val}</span>`;
  if (col === 'priority') return `<span class="badge badge-${val.toLowerCase()}">${val}</span>`;
  if (col === 'designation') return val.split(',').map(d => `<span class="badge badge-open" style="margin:1px">${d.trim()}</span>`).join(' ');
  return val;
}

function renderPagination(paginId, total, page, tbodyId, data, cols) {
  const paginator = document.getElementById(paginId);
  if (!paginator) return;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = Math.min((page - 1) * PAGE_SIZE + 1, total);
  const to = Math.min(page * PAGE_SIZE, total);
  paginator.innerHTML = `
    <div>Page Size: ${PAGE_SIZE} &nbsp;|&nbsp; ${from} to ${to} of ${total} &nbsp; Page ${page} of ${totalPages}</div>
    <div style="display:flex;gap:6px;align-items:center">
      <button class="action-btn" ${page <= 1 ? 'disabled' : ''} onclick="changePage('${tbodyId}',1,'${paginId}')"><i class="fa fa-angles-left"></i></button>
      <button class="action-btn" ${page <= 1 ? 'disabled' : ''} onclick="changePage('${tbodyId}',${page - 1},'${paginId}')"><i class="fa fa-angle-left"></i></button>
      <button class="action-btn" ${page >= totalPages ? 'disabled' : ''} onclick="changePage('${tbodyId}',${page + 1},'${paginId}')"><i class="fa fa-angle-right"></i></button>
      <button class="action-btn" ${page >= totalPages ? 'disabled' : ''} onclick="changePage('${tbodyId}',${totalPages},'${paginId}')"><i class="fa fa-angles-right"></i></button>
    </div>
  `;
}

window.changePage = function (tbodyId, newPage, paginId) {
  paginationState[tbodyId] = newPage;
  // Look up dataset by tbodyId
  const dataMap = {
    'tasksBody': [taskData, ['id', 'title', 'status', 'priority', 'assignedTo', 'createdBy', 'createdAt']],
    'salesTargetBody': [salesTargetData, ['branch', 'department', 'section', 'targetMonth', 'targetAmount', 'status']],
    'purchaseBody': [purchaseData, ['id', 'invoiceNumber', 'invoiceDate', 'poNumber', 'vendor', 'items', 'totalAmount']],
    'incentiveBody': [incentiveData, ['id', 'startDate', 'endDate', 'branch', 'designation', 'incentiveType', 'totalIncentive', 'status']],
    'receiptBody': [receiptData, ['id', 'voucherDate', 'branch', 'totalAmount', 'createdBy']],
    'employeesBody': [employeeData, ['id', 'name', 'branch', 'designation', 'gender', 'status']],
  };
  const [data, cols] = dataMap[tbodyId] || [[], []];
  renderTable(tbodyId, data, cols, paginId);
};

const tableRegistry = {
  tasksBody: { data: () => taskData, cols: ['id', 'title', 'status', 'priority', 'assignedTo', 'createdBy', 'createdAt'], label: 'Task' },
  salesTargetBody: { data: () => salesTargetData, cols: ['branch', 'department', 'section', 'targetMonth', 'targetAmount', 'status'], label: 'Sales target' },
  purchaseBody: { data: () => purchaseData, cols: ['id', 'invoiceNumber', 'invoiceDate', 'poNumber', 'vendor', 'items', 'totalAmount'], label: 'Purchase entry' },
  incentiveBody: { data: () => incentiveData, cols: ['id', 'startDate', 'endDate', 'branch', 'designation', 'incentiveType', 'totalIncentive', 'status'], label: 'Incentive' },
  receiptBody: { data: () => receiptData, cols: ['id', 'voucherDate', 'branch', 'totalAmount', 'createdBy'], label: 'Receipt' },
  employeesBody: { data: () => employeeData, cols: ['id', 'name', 'branch', 'designation', 'gender', 'status'], label: 'Employee' },
  masterEmpBody: { data: () => employeeData, cols: ['id', 'name', 'branch', 'designation', 'gender', 'status'], label: 'Employee' },
  checklistBody: { data: () => checklistData, cols: ['id', 'title', 'branch', 'assignedTo', 'dueDate', 'status'], label: 'Checklist' },
  materialsBody: { data: () => materialsData, cols: ['id', 'material', 'category', 'quantity', 'unit', 'status'], label: 'Material' },
  payrollBody: { data: () => payrollData, cols: ['id', 'employee', 'branch', 'month', 'basic', 'allowances', 'deductions', 'netPay', 'status'], label: 'Payroll' },
  logsBody: { data: () => logsData, cols: ['id', 'user', 'action', 'module', 'timestamp'], label: 'Log' },
  approvalsBody: { data: () => approvalsData, cols: ['id', 'employee', 'type', 'from', 'to', 'status'], label: 'Approval' },
  returnBody: { data: () => purchaseReturnData, cols: ['id', 'returnDate', 'invoiceNumber', 'vendor', 'items', 'totalAmount', 'status'], label: 'Purchase return' },
  transportBody: { data: () => transportData, cols: ['id', 'vehicle', 'driver', 'route', 'date', 'status'], label: 'Transport route' }
};
let activeRecord = null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

window.rowAction = function (tbodyId, idx) {
  const config = tableRegistry[tbodyId];
  if (!config) return showToast('Actions are not available for this table yet.');
  const row = config.data()[idx];
  if (!row) return showToast('Record not found.', 'error');
  activeRecord = { tbodyId, idx, row };
  document.getElementById('modalTitle').textContent = config.label + ' details';
  document.getElementById('modalBody').innerHTML = `
    <div class="record-details">
      ${config.cols.map(key => `<div class="record-detail"><span>${escapeHtml(key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()))}</span><strong>${escapeHtml(String(row[key] ?? '—'))}</strong></div>`).join('')}
    </div>
    <p class="modal-hint">This prototype uses sample data in your browser. It is not connected to a live company server.</p>
    <div class="modal-actions-row">
      <button class="btn-secondary" onclick="closeModal()">Close</button>
      ${tbodyId === 'tasksBody' ? `<button class="btn-secondary" onclick="editActiveTask()">Edit task</button><button class="btn-primary" onclick="deleteActiveRecord()">Delete task</button>` : ''}
    </div>`;
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modal').classList.add('open');
};

window.editActiveTask = function () {
  if (!activeRecord || activeRecord.tbodyId !== 'tasksBody') return;
  openModal('addTask', activeRecord.row);
};

window.deleteActiveRecord = function () {
  if (!activeRecord || activeRecord.tbodyId !== 'tasksBody') return;
  const index = taskData.findIndex(item => item.id === activeRecord.row.id);
  if (index < 0) return showToast('Task not found.', 'error');
  taskData.splice(index, 1);
  paginationState.tasksBody = 1;
  closeModal();
  renderTable('tasksBody', taskData, tableRegistry.tasksBody.cols, 'tasksPagination');
  showToast('Task deleted.', 'success');
};

// ============================================================
// TAB SWITCH
// ============================================================
window.switchTab = function (btn, tabId) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const section = btn.closest('section');
  section.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
};

// ============================================================
// MODAL
// ============================================================
window.openModal = function (type, existing = null) {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modal').classList.add('open');

  if (type === 'addTask') {
    const task = existing || {};
    document.getElementById('modalTitle').textContent = existing ? 'Edit Task' : 'Add Task';
    document.getElementById('modalBody').innerHTML = `
      <form id="taskForm" class="modal-form">
        <div class="form-group"><label for="taskTitle">Title <span class="required">*</span></label><input id="taskTitle" name="title" type="text" class="form-input" placeholder="Task title" value="${escapeHtml(task.title || '')}" required maxlength="120" /></div>
        <div class="form-row" style="margin-bottom:14px">
          <div class="form-group"><label for="taskPriority">Priority</label><select id="taskPriority" name="priority" class="form-input">${['High', 'Medium', 'Low', 'Urgent'].map(v => `<option ${task.priority === v ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
          <div class="form-group"><label for="taskAssignee">Assign To</label><select id="taskAssignee" name="assignedTo" class="form-input">${['VIJAY ELUMALAI', 'BALU SRIDHAR', 'RAMKUMAR M', 'MUGILAN S', 'RANJITHA S'].map(v => `<option ${task.assignedTo === v ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
        </div>
        <div class="form-group"><label for="taskDescription">Description</label><textarea id="taskDescription" name="description" class="form-input" rows="3" placeholder="Describe the task...">${escapeHtml(task.description || '')}</textarea></div>
        <div class="modal-actions-row"><button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button><button type="submit" class="btn-primary">${existing ? 'Save changes' : 'Create task'}</button></div>
      </form>`;
    document.getElementById('taskForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const title = String(form.get('title') || '').trim();
      if (!title) return showToast('Please enter a task title.', 'error');
      if (existing) {
        const found = taskData.find(item => item.id === existing.id);
        if (found) Object.assign(found, { title, priority: form.get('priority'), assignedTo: form.get('assignedTo'), description: form.get('description') });
      } else {
        taskData.unshift({ id: Math.max(0, ...taskData.map(item => Number(item.id) || 0)) + 1, title, status: 'Open', priority: form.get('priority'), assignedTo: form.get('assignedTo'), createdBy: 'CURRENT USER', createdAt: new Date().toLocaleDateString('en-GB'), description: form.get('description') });
      }
      paginationState.tasksBody = 1;
      closeModal();
      navigate('tasks');
      showToast(existing ? 'Task updated successfully.' : 'Task created successfully.', 'success');
    });
  } else {
    document.getElementById('modalTitle').textContent = 'Prototype action';
    document.getElementById('modalBody').innerHTML = '<p>This screen is part of the interface prototype. This action still needs its specific workflow and backend integration.</p><div class="modal-actions-row"><button class="btn-primary" onclick="closeModal()">Got it</button></div>';
  }
};
window.closeModal = function () {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('modal').classList.remove('open');
  activeRecord = null;
};
window.saveModal = function () {
  const form = document.getElementById('taskForm');
  if (form) form.requestSubmit();
  else { closeModal(); showToast('Saved successfully!', 'success'); }
};

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================
// SETTINGS PANEL
// ============================================================
window.openSettingsPanel = function () {
  document.getElementById('settingsPanel').classList.add('open');
};
window.closeSettingsPanel = function () {
  document.getElementById('settingsPanel').classList.remove('open');
};

// ============================================================
// MISC ACTIONS
// ============================================================
window.clearFilters = function () { showToast('Filters cleared.'); };
window.triggerUpload = function () { document.getElementById('fileUpload').click(); };
window.showNotifications = function () { showToast('3 new notifications'); };
window.confirmLogout = function () {
  if (confirm('Are you sure you want to logout?')) showToast('Logged out.', 'error');
};
window.toggle2FA = function () { showToast('2FA settings updated.', 'success'); };
window.toggleSearch = toggleSearch;
window.closeSearch = closeSearch;
window.navigate = navigate;
window.toggleSubmenu = toggleSubmenu;

// ============================================================
// SAMPLE DATA
// ============================================================
const taskData = [
  { id: 1, title: 'Update Billing System', status: 'Open', priority: 'High', assignedTo: 'VIJAY ELUMALAI', createdBy: 'ADMIN', createdAt: '23/10/2026' },
  { id: 2, title: 'Monthly Payroll Processing', status: 'In Progress', priority: 'Urgent', assignedTo: 'RAMKUMAR M', createdBy: 'VIJAY ELUMALAI', createdAt: '22/10/2026' },
  { id: 3, title: 'Stock Reconciliation', status: 'Done', priority: 'Medium', assignedTo: 'BALU SRIDHAR', createdBy: 'ADMIN', createdAt: '20/10/2026' },
  { id: 4, title: 'Vendor Payment Approval', status: 'Open', priority: 'High', assignedTo: 'VIJAY K', createdBy: 'RAMKUMAR M', createdAt: '19/10/2026' },
  { id: 5, title: 'Employee Attendance Audit', status: 'Done', priority: 'Low', assignedTo: 'B.SATHYA', createdBy: 'ADMIN', createdAt: '18/10/2026' },
  { id: 6, title: 'GST Filing Preparation', status: 'Open', priority: 'High', assignedTo: 'MOGESH', createdBy: 'VIJAY ELUMALAI', createdAt: '17/10/2026' },
  { id: 7, title: 'Transport Route Optimization', status: 'In Progress', priority: 'Medium', assignedTo: 'SIVAKUMAR T', createdBy: 'ADMIN', createdAt: '15/10/2026' },
  { id: 8, title: 'Checklist System Update', status: 'Done', priority: 'Low', assignedTo: 'MUGILAN S', createdBy: 'VIJAY ELUMALAI', createdAt: '14/10/2026' },
  { id: 9, title: 'Incentive Calculation Oct', status: 'Open', priority: 'High', assignedTo: 'RANJITHA S', createdBy: 'ADMIN', createdAt: '12/10/2026' },
  { id: 10, title: 'New Branch Setup - SARON', status: 'In Progress', priority: 'Urgent', assignedTo: 'VIJAY ELUMALAI', createdBy: 'ADMIN', createdAt: '10/10/2026' },
];

const salesTargetData = [
  { branch: 'A1MART-SARON', department: 'GROCERY FOOD', section: 'A1MART GROCERIES', targetMonth: 'Nov 2025', targetAmount: '₹2,10,00,000.00', status: 'Targets Set' },
  { branch: 'A1MART-SARON', department: 'GROCERY FOOD', section: 'LOOSE PRODUCTS', targetMonth: 'Nov 2025', targetAmount: '₹40,00,000.00', status: 'Targets Set' },
  { branch: 'A1MART-SARON', department: 'HOUSEHOLD NECESSARY', section: 'SMALL HOUSE HOLD', targetMonth: 'Dec 2025', targetAmount: '₹90,00,000.00', status: 'Targets Set' },
  { branch: 'A1MART-SARON', department: 'HOUSEHOLD NECESSARY', section: 'SMALL HOUSE HOLD', targetMonth: 'Nov 2025', targetAmount: '₹2,00,00,000.00', status: 'Targets Set' },
];

const purchaseData = [
  { id: 147, invoiceNumber: 'GST/11145/26-27', invoiceDate: '20/10/2026', poNumber: 'PO-162', vendor: 'r s manufacturing', items: 2, totalAmount: '₹35,472.30' },
  { id: 146, invoiceNumber: 'GST/9353/26-27', invoiceDate: '21/09/2026', poNumber: 'PO-161', vendor: 'r s manufacturing', items: 5, totalAmount: '₹75,029.70' },
  { id: 145, invoiceNumber: 'GST/9008/26-27', invoiceDate: '15/09/2026', poNumber: 'PO-160', vendor: 'r s manufacturing', items: 1, totalAmount: '₹13,997.70' },
  { id: 144, invoiceNumber: '043', invoiceDate: '11/09/2026', poNumber: 'PO-159', vendor: 'SWASTIK PACKAGING', items: 4, totalAmount: '₹1,87,561.00' },
  { id: 143, invoiceNumber: 'DBS/26-27/2289', invoiceDate: '04/09/2026', poNumber: 'PO-158', vendor: 'DISHA LABELS AND BARCO...', items: 3, totalAmount: '₹21,352.00' },
  { id: 142, invoiceNumber: 'GST/8531/26-27', invoiceDate: '06/09/2026', poNumber: 'PO-157', vendor: 'r s manufacturing', items: 1, totalAmount: '₹13,354.97' },
  { id: 141, invoiceNumber: 'GST/8570/26-27', invoiceDate: '07/09/2026', poNumber: 'PO-156', vendor: 'r s manufacturing', items: 1, totalAmount: '₹14,753.70' },
  { id: 140, invoiceNumber: 'DBS/26-27/1993', invoiceDate: '17/08/2026', poNumber: 'PO-154', vendor: 'DISHA LABELS AND BARCO...', items: 12, totalAmount: '₹72,487.40' },
  { id: 139, invoiceNumber: 'DBS/26-27/1996', invoiceDate: '17/08/2026', poNumber: 'PO-155', vendor: 'DISHA LABELS AND BARCO...', items: 30, totalAmount: '₹73,313.40' },
  { id: 138, invoiceNumber: 'RKP-797/26-27', invoiceDate: '25/08/2026', poNumber: 'PO-153', vendor: 'RKP POLYBAGS PRIVATE LI...', items: 1, totalAmount: '₹11,290.00' },
  { id: 137, invoiceNumber: 'RKP-796/26-27', invoiceDate: '25/08/2026', poNumber: 'PO-152', vendor: 'RKP POLYBAGS PRIVATE LI...', items: 1, totalAmount: '₹58,365.00' },
  { id: 136, invoiceNumber: 'RKP-795/26-27', invoiceDate: '25/08/2026', poNumber: 'PO-151', vendor: 'RKP POLYBAGS PRIVATE LI...', items: 3, totalAmount: '₹1,88,392.00' },
  { id: 135, invoiceNumber: 'GST/7347/26-27', invoiceDate: '16/08/2026', poNumber: 'PO-145', vendor: 'r s manufacturing', items: 2, totalAmount: '₹21,923.22' },
];

const incentiveData = [
  { id: 56, startDate: '01 Sep 2026', endDate: '30 Sep 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 8, status: 'Approved' },
  { id: 54, startDate: '01 Aug 2026', endDate: '31 Aug 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 9, status: 'Approved' },
  { id: 53, startDate: '01 Jul 2026', endDate: '31 Jul 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 11, status: 'Approved' },
  { id: 52, startDate: '01 Jun 2026', endDate: '30 Jun 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 12, status: 'Approved' },
  { id: 51, startDate: '01 May 2026', endDate: '31 May 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR, BILLING SECURITY', incentiveType: '—', totalIncentive: 16, status: 'Approved' },
  { id: 50, startDate: '01 Apr 2026', endDate: '30 Apr 2026', branch: 'A1MART-DISTRIB...', designation: 'GRN-SUPERVISOR, GRN-HELPER', incentiveType: '—', totalIncentive: 1, status: 'Unapproved' },
  { id: 42, startDate: '01 Apr 2026', endDate: '30 Apr 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR, BILLING SECURITY', incentiveType: '—', totalIncentive: 19, status: 'Approved' },
  { id: 41, startDate: '01 Mar 2026', endDate: '31 Mar 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR, BILLING SECURITY', incentiveType: '—', totalIncentive: 19, status: 'Approved' },
];

const receiptData = [
  { id: 115, voucherDate: '08 Jul 2026', branch: 'A1-MART CORPORATE OFFICE', totalAmount: '₹11,000', createdBy: 'MOGESH' },
  { id: 114, voucherDate: '08 Jul 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹1', createdBy: 'MOGESH' },
  { id: 112, voucherDate: '08 Jul 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹8,000', createdBy: 'SIVAKUMAR T' },
  { id: 111, voucherDate: '12 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹530', createdBy: 'MUGILAN S' },
  { id: 110, voucherDate: '10 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹10,000', createdBy: 'SIVAKUMAR T' },
  { id: 109, voucherDate: '09 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹1,165', createdBy: 'SIVAKUMAR T' },
  { id: 108, voucherDate: '09 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹3,000', createdBy: 'SIVAKUMAR T' },
  { id: 107, voucherDate: '03 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹5,000', createdBy: 'RANJITHA S' },
];

const employeeData = [
  { id: 'A1-001', name: 'B.SATHYA', branch: 'A1MART-SARON', designation: 'GROCERY MANAGER', gender: 'Male', status: 'Active' },
  { id: 'A1-003', name: 'BALAMURUGAN-A', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', gender: 'Male', status: 'Active' },
  { id: 'A1-006', name: 'RAMKUMAR M', branch: 'A1-MART CORPORATE OFFICE', designation: 'ACCOUNTS MANAGER', gender: 'Male', status: 'Active' },
  { id: 'A1-254', name: 'VIJAY K', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'GRN-SUPERVISOR', gender: 'Male', status: 'Active' },
  { id: 'A1-420', name: 'FAHATH MUHAMMED V', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', gender: 'Male', status: 'Active' },
  { id: 'A1-513', name: 'BALU SRIDHAR', branch: 'A1MART-SARON', designation: 'BILLING SECURITY', gender: 'Male', status: 'Active' },
  { id: 'A1-520', name: 'MUGILAN S', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'GRN-HELPER', gender: 'Male', status: 'Active' },
  { id: 'A1-522', name: 'SIVAKUMAR T', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'GRN-SUPERVISOR', gender: 'Male', status: 'Active' },
  { id: 'A1-530', name: 'RANJITHA S', branch: 'A1MART-SARON', designation: 'CASHIER', gender: 'Female', status: 'Active' },
  { id: 'A1-534', name: 'MOGESH', branch: 'A1-MART CORPORATE OFFICE', designation: 'ACCOUNTS ASSISTANT', gender: 'Male', status: 'Active' },
  { id: 'A1-535', name: 'VIJAY ELUMALAI', branch: 'A1-MART CORPORATE OFFICE', designation: 'IT AND SOFTWARE MANAGER', gender: 'Male', status: 'Active' },
];

const checklistData = [
  { id: 1, title: 'Morning Store Opening Check', branch: 'A1MART-SARON', assignedTo: 'B.SATHYA', dueDate: '24/10/2026', status: 'Done' },
  { id: 2, title: 'Cold Chain Compliance', branch: 'A1MART-SARON', assignedTo: 'RAMKUMAR M', dueDate: '24/10/2026', status: 'Open' },
  { id: 3, title: 'Security Round - Night', branch: 'A1MART-DISTRIBUTION WAREHOUSE', assignedTo: 'BALU SRIDHAR', dueDate: '23/10/2026', status: 'Done' },
  { id: 4, title: 'Stock Level Verification', branch: 'A1MART-SARON', assignedTo: 'VIJAY K', dueDate: '25/10/2026', status: 'In Progress' },
];

const materialsData = [
  { id: 1, material: 'Polybags - 1kg', category: 'Packaging', quantity: 5000, unit: 'pcs', status: 'In Stock' },
  { id: 2, material: 'Barcode Labels', category: 'Labelling', quantity: 10000, unit: 'rolls', status: 'In Stock' },
  { id: 3, material: 'Carton Boxes - Medium', category: 'Packaging', quantity: 200, unit: 'pcs', status: 'Low Stock' },
  { id: 4, material: 'Stretch Film Roll', category: 'Packaging', quantity: 50, unit: 'rolls', status: 'In Stock' },
];

const payrollData = [
  { id: 1, employee: 'B.SATHYA', branch: 'A1MART-SARON', month: 'Sep 2026', basic: '₹18,000', allowances: '₹3,200', deductions: '₹1,800', netPay: '₹19,400', status: 'Paid' },
  { id: 2, employee: 'RAMKUMAR M', branch: 'A1-MART CORPORATE OFFICE', month: 'Sep 2026', basic: '₹22,000', allowances: '₹4,000', deductions: '₹2,200', netPay: '₹23,800', status: 'Paid' },
  { id: 3, employee: 'VIJAY ELUMALAI', branch: 'A1-MART CORPORATE OFFICE', month: 'Sep 2026', basic: '₹28,000', allowances: '₹5,000', deductions: '₹2,800', netPay: '₹30,200', status: 'Paid' },
];

const logsData = [
  { id: 1, user: 'VIJAY ELUMALAI', action: 'Login', module: 'Authentication', timestamp: '24/10/2026 09:02 AM' },
  { id: 2, user: 'VIJAY ELUMALAI', action: 'Updated Task #10', module: 'Tasks', timestamp: '24/10/2026 09:15 AM' },
  { id: 3, user: 'RAMKUMAR M', action: 'Added Purchase Entry #147', module: 'Purchase Entries', timestamp: '24/10/2026 10:30 AM' },
  { id: 4, user: 'MOGESH', action: 'Created Receipt #115', module: 'Accounts', timestamp: '24/10/2026 11:00 AM' },
  { id: 5, user: 'SIVAKUMAR T', action: 'Approved Incentive #56', module: 'Incentives', timestamp: '24/10/2026 11:45 AM' },
];

const approvalsData = [
  { id: 1, employee: 'BALU SRIDHAR', type: 'Leave', from: '25/10/2026', to: '26/10/2026', status: 'Open' },
  { id: 2, employee: 'MUGILAN S', type: 'Expense', from: '20/10/2026', to: '20/10/2026', status: 'Approved' },
  { id: 3, employee: 'FAHATH MUHAMMED V', type: 'Leave', from: '28/10/2026', to: '29/10/2026', status: 'Open' },
];

const purchaseReturnData = [
  { id: 1, returnDate: '15/10/2026', invoiceNumber: 'GST/9353/26-27', vendor: 'r s manufacturing', items: 2, totalAmount: '₹12,500.00', status: 'Approved' },
  { id: 2, returnDate: '18/10/2026', invoiceNumber: 'DBS/26-27/1993', vendor: 'DISHA LABELS AND BARCO...', items: 5, totalAmount: '₹8,750.00', status: 'Pending' },
];

const transportData = [
  { id: 1, vehicle: 'TN 01 AB 1234', driver: 'SIVAKUMAR T', route: 'SARON → CORPORATE OFFICE', date: '24/10/2026', status: 'Completed' },
  { id: 2, vehicle: 'TN 02 CD 5678', driver: 'MUGILAN S', route: 'DISTRIBUTION WH → SARON', date: '24/10/2026', status: 'In Transit' },
  { id: 3, vehicle: 'TN 03 EF 9012', driver: 'RANJITHA S', route: 'CORPORATE OFFICE → SARON', date: '25/10/2026', status: 'Scheduled' },
];

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Open Dashboard submenu first
  const dashGroup = document.querySelector('.nav-item.has-sub[data-section="dashboard"]');
  if (dashGroup) {
    dashGroup.classList.add('open');
    const sub = dashGroup.nextElementSibling;
    if (sub) sub.classList.add('open');
  }
  // Wire prototype buttons that otherwise had no action.
  document.querySelectorAll('button').forEach(button => {
    const label = button.textContent.trim().replace(/\s+/g, ' ');
    if (/^Add Task$/i.test(label)) button.addEventListener('click', () => openModal('addTask'));
    else if (/^(Add|Add Employee|Add Route|Generate Payroll|Add Receipt)$/i.test(label) && !button.hasAttribute('onclick')) {
      button.addEventListener('click', () => openModal('prototypeAction'));
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeModal(); closeSearch(); closeSettingsPanel(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); toggleSearch();
    }
  });
  // Navigate to accounts dashboard
  navigate('accounts-dashboard');
  // Mark first sub-item active
  const firstSub = document.querySelector('.nav-sub-item');
  if (firstSub) firstSub.classList.add('active');
});

function showStatsTab(tabName, clickedButton) {
  document.querySelectorAll('#page-target-stats .stats-tab')
    .forEach(button => button.classList.remove('active'));

  document.querySelectorAll('#page-target-stats .stats-table-panel')
    .forEach(panel => panel.hidden = true);

  clickedButton.classList.add('active');

  const selectedPanel = document.getElementById('stats-' + tabName);

  if (selectedPanel) {
    selectedPanel.hidden = false;
  }
}

function togglePurchaseOrderMenu(button) {
  const menu = button.nextElementSibling;
  const shouldOpen = menu.style.display === "none";

  document.querySelectorAll(".po-action-menu").forEach(item => {
    item.style.display = "none";
  });

  menu.style.display = shouldOpen ? "block" : "none";
}

function deletePurchaseOrder(button) {
  if (confirm("Are you sure you want to delete this purchase order?")) {
    button.closest("tr").remove();
  }
}

function editPurchaseOrder(button) {
  alert("Purchase Order editing will be implemented next.");
}

function openPurchaseOrderModal() {
  alert("The Add Purchase Order form will be implemented next.");
}


function togglePurchaseEntryMenu(button) {
  const menu = button.nextElementSibling;
  const shouldOpen = menu.style.display === "none";

  document.querySelectorAll(".pe-action-menu").forEach(item => {
    item.style.display = "none";
  });

  menu.style.display = shouldOpen ? "block" : "none";
}

function deletePurchaseEntry(button) {
  if (confirm("Are you sure you want to delete this purchase entry?")) {
    button.closest("tr").remove();
  }
}

function editPurchaseEntry(button) {
  alert("Purchase Entry editing will be implemented next.");
}

function openPurchaseEntryModal() {
  alert("The Add Purchase Entry form will be implemented next.");
}

function toggleMaterialsRequestMenu(button) {
  const menu = button.nextElementSibling;
  const shouldOpen = menu.style.display === "none";

  document.querySelectorAll(".mr-action-menu").forEach(item => {
    item.style.display = "none";
  });

  menu.style.display = shouldOpen ? "block" : "none";
}

function deleteMaterialsRequest(button) {
  if (confirm("Are you sure you want to delete this materials request?")) {
    button.closest("tr").remove();
  }
}

function viewMaterialsRequest(button) {
  alert("Materials Request details will be implemented next.");
}

function editMaterialsRequest(button) {
  alert("Materials Request editing will be implemented next.");
}

function openMaterialsRequestModal() {
  alert("The Add Materials Request form will be implemented next.");
}


let stockAdditionCurrentPage = 1;

function renderStockAdditionTable() {
  const tbody = document.getElementById("stockAdditionTableBody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const pageSize = Number(document.getElementById("saPageSize").value);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));

  stockAdditionCurrentPage = Math.min(stockAdditionCurrentPage, totalPages);

  rows.forEach((row, index) => {
    row.style.display =
      index >= (stockAdditionCurrentPage - 1) * pageSize &&
        index < stockAdditionCurrentPage * pageSize
        ? ""
        : "none";
  });

  const start = rows.length === 0
    ? 0
    : (stockAdditionCurrentPage - 1) * pageSize + 1;

  const end = Math.min(stockAdditionCurrentPage * pageSize, rows.length);

  document.getElementById("saRecordInfo").textContent =
    `${start} to ${end} of ${rows.length}`;

  document.getElementById("saPageInfo").textContent =
    `Page ${stockAdditionCurrentPage} of ${totalPages}`;
}

function changeStockAdditionPage(direction) {
  const tbody = document.getElementById("stockAdditionTableBody");
  const pageSize = Number(document.getElementById("saPageSize").value);
  const totalPages = Math.max(
    1,
    Math.ceil(tbody.querySelectorAll("tr").length / pageSize)
  );

  if (direction === 999999) {
    stockAdditionCurrentPage = totalPages;
  } else if (direction === 1) {
    stockAdditionCurrentPage = 1;
  } else {
    stockAdditionCurrentPage = Math.max(
      1,
      Math.min(totalPages, stockAdditionCurrentPage + direction)
    );
  }

  renderStockAdditionTable();
}

function toggleStockAdditionMenu(button) {
  const menu = button.nextElementSibling;
  const shouldOpen = menu.style.display === "none";

  document.querySelectorAll(".sa-action-menu").forEach(item => {
    item.style.display = "none";
  });

  menu.style.display = shouldOpen ? "block" : "none";
}

function deleteStockAddition(button) {
  if (confirm("Are you sure you want to delete this stock addition?")) {
    button.closest("tr").remove();
    renderStockAdditionTable();
  }
}

function viewStockAddition() {
  alert("Stock Addition details will be implemented next.");
}

function editStockAddition() {
  alert("Stock Addition editing will be implemented next.");
}

function openStockAdditionModal() {
  alert("The Add Stock Addition form will be implemented next.");
}

renderStockAdditionTable();


function toggleMaterialsMenu(button) {
  const menu = button.nextElementSibling;
  const shouldOpen = menu.style.display === "none";

  document.querySelectorAll("#page-all-materials .materials-action-menu")
    .forEach(item => {
      item.style.display = "none";
    });

  menu.style.display = shouldOpen ? "block" : "none";
}

function openMaterialModal() {
  alert("The Add Material form will be implemented next.");
}

function openMaterialCategoryModal() {
  alert("The Add Category form will be implemented next.");
}

function viewMaterial(button) {
  const row = button.closest("tr");
  const name = row.cells[2].textContent.trim();
  alert("Material: " + name);
}

function editMaterial(button) {
  const row = button.closest("tr");
  const name = row.cells[2].textContent.trim();
  alert("Edit Material: " + name);
}

function deleteMaterial(button) {
  if (confirm("Are you sure you want to delete this material?")) {
    button.closest("tr").remove();
  }
}

function toggleCategoryMenu(button) {
  const menu = button.nextElementSibling;
  const shouldOpen = menu.style.display === "none";

  document.querySelectorAll(
    "#page-materials-category .mc-action-menu"
  ).forEach(item => {
    item.style.display = "none";
  });

  menu.style.display = shouldOpen ? "block" : "none";
}

function openCategoryModal() {
  alert("The Add Category form will be implemented next.");
}

function editCategory(button) {
  const row = button.closest("tr");
  const categoryName = row.cells[1].textContent.trim();

  alert("Edit category: " + categoryName);
}

function deleteCategory(button) {
  const row = button.closest("tr");
  const categoryName = row.cells[1].textContent.trim();

  if (confirm(`Are you sure you want to delete "${categoryName}"?`)) {
    row.remove();
  }
}

/* ==========================================
   STOCK - CIRCLE PAGE FUNCTIONALITY
   ========================================== */

function initializeCirclePage() {
  const circleForm = document.getElementById("circleForm");

  if (!circleForm || circleForm.dataset.initialized === "true") {
    return;
  }

  circleForm.dataset.initialized = "true";

  const departments = document.getElementById("circleDepartments");
  const category = document.getElementById("circleCategory");
  const subcategory = document.getElementById("circleSubcategory");

  // Enable Category after selecting a department
  departments.addEventListener("change", function () {
    const hasDepartments = departments.selectedOptions.length > 0;

    category.disabled = !hasDepartments;

    if (!hasDepartments) {
      category.value = "";
      subcategory.value = "";
      subcategory.disabled = true;
    }
  });

  // Enable Subcategory after selecting a category
  category.addEventListener("change", function () {
    subcategory.disabled = !category.value;

    if (!category.value) {
      subcategory.value = "";
    }
  });

  // Reset dependent fields
  circleForm.addEventListener("reset", function () {
    setTimeout(function () {
      category.disabled = true;
      subcategory.disabled = true;
    }, 0);
  });

  // Basic form validation
  circleForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedDepartments = Array.from(
      departments.selectedOptions
    ).map(option => option.value);

    if (selectedDepartments.length === 0) {
      alert("Please select at least one department.");
      return;
    }

    alert("Circle form validated successfully!");
  });
}

// Initialize after the HTML has loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCirclePage);
} else {
  initializeCirclePage();
}

/* ========================================
   STOCK CHECKER ACTIONS
   ======================================== */

function toggleStockCheckerMenu(button) {
  const currentMenu = button.nextElementSibling;
  const wasOpen = currentMenu.classList.contains("show");

  // Close all other Stock Checker menus
  document.querySelectorAll(
    "#page-stock-checker .stock-checker-action-menu"
  ).forEach(menu => menu.classList.remove("show"));

  if (!wasOpen) {
    currentMenu.classList.add("show");
  }
}

function editStockChecker(button) {
  const row = button.closest("tr");

  if (!row) return;

  const cells = row.querySelectorAll("td");
  const recordId = cells[0].textContent.trim();

  alert(
    "Edit Stock Checker record " + recordId +
    ". Connect this action to your edit form."
  );

  button.closest(".stock-checker-action-menu").classList.remove("show");
}

function deleteStockChecker(button) {
  const row = button.closest("tr");

  if (!row) return;

  const recordId = row.cells[0].textContent.trim();

  if (confirm("Are you sure you want to delete record " + recordId + "?")) {
    row.remove();
    updateStockCheckerCount();
  }
}

function updateStockCheckerCount() {
  const rows = document.querySelectorAll(
    "#stockCheckerTableBody tr"
  );

  const count = rows.length;
  const countLabel = document.getElementById(
    "stockCheckerRecordCount"
  );

  if (countLabel) {
    countLabel.textContent = count === 0
      ? "0 records"
      : "1 to " + count + " of " + count;
  }
}

// Close menus when clicking elsewhere
document.addEventListener("click", function (event) {
  if (!event.target.closest(
    "#page-stock-checker .stock-action-cell"
  )) {
    document.querySelectorAll(
      "#page-stock-checker .stock-checker-action-menu"
    ).forEach(menu => menu.classList.remove("show"));
  }
});

// Placeholder until the Add form is implemented
function openStockCheckerAddModal() {
  alert("Stock Checker Add form will be implemented next.");
}

/* =========================================
   PRICE CHECKER FUNCTIONALITY
   ========================================= */

// Check Price
function checkProductPrice() {
  const tableBody = document.getElementById(
    "priceProductsTableBody"
  );

  if (!tableBody) return;

  const branch = document.getElementById("priceBranch").value;
  const department = document.getElementById("priceDepartment").value;
  const category = document.getElementById("priceCategory").value;
  const subcategory = document.getElementById("priceSubcategory").value;
  const manufacturer = document.getElementById("priceManufacturer").value;
  const brand = document.getElementById("priceBrand").value;
  const buyer = document.getElementById("priceBuyer").value;

  const hasFilters = [
    branch,
    department,
    category,
    subcategory,
    manufacturer,
    brand,
    buyer
  ].some(value => value.trim() !== "");

  tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="price-empty-message">
                ${hasFilters
      ? "Filters selected. Connect your product data to display matching results."
      : "No product data connected yet. Connect your product API to display products."
    }
            </td>
        </tr>
    `;
}

// Export currently displayed products to CSV
function exportPriceChecker() {
  const table = document.querySelector(
    "#page-price-checker .price-products-table"
  );

  if (!table) return;

  const rows = Array.from(table.querySelectorAll("tr"));

  const csv = rows.map(row =>
    Array.from(row.querySelectorAll("th, td"))
      .map(cell => {
        const value = cell.innerText.trim().replace(/"/g, '""');
        return `"${value}"`;
      })
      .join(",")
  ).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "price-checker.csv";
  link.click();

  URL.revokeObjectURL(url);
}

// Barcode button placeholder
function scanPriceBarcode() {
  alert(
    "Barcode scanning will be connected when the scanner or camera integration is added."
  );
}

function navigate(pageName) {

  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // Find the selected page
  let targetPage = document.getElementById(`page-${pageName}`);

  // Create page dynamically if it does not exist
  if (!targetPage) {

    const menuItem = Array.from(
      document.querySelectorAll('.nav-sub-item')
    ).find(item =>
      (item.getAttribute('onclick') || '').includes(`'${pageName}'`)
    );

    const label = menuItem
      ? menuItem.textContent.trim()
      : pageName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    targetPage = document.createElement('section');

    targetPage.className = 'page';
    targetPage.id = `page-${pageName}`;

    // Products and Repack Items Master: heading only
    if (
      pageName === 'products' ||
      pageName === 'repack-items-master'
    ) {

      targetPage.innerHTML = `
        <div class="page-header">
          <div class="page-title-wrap">
            <div class="page-title-bar"></div>
            <h1 class="page-title">${label}</h1>
          </div>
        </div>
      `;

    } else {

      // Default content for other new routes
      targetPage.innerHTML = `
        <div class="page-header">
          <div>
            <div class="breadcrumb">A1-MART / ${label}</div>
            <h1 class="page-title">${label}</h1>
            <p class="page-subtitle">${label} workspace</p>
          </div>
        </div>

        <div class="content-card">
          <div class="empty-state">
            <i class="fa fa-clipboard-list"></i>
            <h3>${label}</h3>
            <p>
              This route is connected to the sidebar.
              Its detailed form, table, and business workflow
              can be implemented next.
            </p>
          </div>
        </div>
      `;

    }

    document.querySelector('main').appendChild(targetPage);
  }

  // Display selected page
  targetPage.style.display = 'block';

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}


function toggleTransportActionMenu(button) {
  const currentMenu = button.nextElementSibling;
  const wasOpen = currentMenu.classList.contains("show");

  // Close all transport action menus
  document.querySelectorAll(".transport-action-menu").forEach(menu => {
    menu.classList.remove("show");
  });

  // Toggle the selected menu
  if (!wasOpen) {
    currentMenu.classList.add("show");
  }
}

function viewTransport(button) {
  const row = button.closest("tr");
  alert("Viewing transport: " + row.cells[3].textContent.trim());
}

function editTransport(button) {
  const row = button.closest("tr");
  alert("Edit transport: " + row.cells[3].textContent.trim());
}

function deleteTransport(button) {
  const row = button.closest("tr");
  const name = row.cells[3].textContent.trim();

  if (confirm("Are you sure you want to delete " + name + "?")) {
    row.remove();
  }
}

function importTransportData() {
  alert("Transport import functionality can be connected here.");
}

// Close menus when clicking elsewhere
document.addEventListener("click", function (event) {
  if (!event.target.closest(".transport-table td:last-child")) {
    document.querySelectorAll(".transport-action-menu").forEach(menu => {
      menu.classList.remove("show");
    });
  }
});
