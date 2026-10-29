// Extracted datasets from app.js

export const taskData = [
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

export const salesTargetData = [
  { branch: 'A1MART-SARON', department: 'GROCERY FOOD', section: 'A1MART GROCERIES', targetMonth: 'Nov 2025', targetAmount: '₹2,10,00,000.00', status: 'Targets Set' },
  { branch: 'A1MART-SARON', department: 'GROCERY FOOD', section: 'LOOSE PRODUCTS', targetMonth: 'Nov 2025', targetAmount: '₹40,00,000.00', status: 'Targets Set' },
  { branch: 'A1MART-SARON', department: 'HOUSEHOLD NECESSARY', section: 'SMALL HOUSE HOLD', targetMonth: 'Dec 2025', targetAmount: '₹90,00,000.00', status: 'Targets Set' },
  { branch: 'A1MART-SARON', department: 'HOUSEHOLD NECESSARY', section: 'SMALL HOUSE HOLD', targetMonth: 'Nov 2025', targetAmount: '₹2,00,00,000.00', status: 'Targets Set' },
];

export const purchaseData = [
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

export const incentiveData = [
  { id: 56, startDate: '01 Sep 2026', endDate: '30 Sep 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 8, status: 'Approved' },
  { id: 54, startDate: '01 Aug 2026', endDate: '31 Aug 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 9, status: 'Approved' },
  { id: 53, startDate: '01 Jul 2026', endDate: '31 Jul 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 11, status: 'Approved' },
  { id: 52, startDate: '01 Jun 2026', endDate: '30 Jun 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', incentiveType: '—', totalIncentive: 12, status: 'Approved' },
  { id: 51, startDate: '01 May 2026', endDate: '31 May 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR, BILLING SECURITY', incentiveType: '—', totalIncentive: 16, status: 'Approved' },
  { id: 50, startDate: '01 Apr 2026', endDate: '30 Apr 2026', branch: 'A1MART-DISTRIB...', designation: 'GRN-SUPERVISOR, GRN-HELPER', incentiveType: '—', totalIncentive: 1, status: 'Unapproved' },
  { id: 42, startDate: '01 Apr 2026', endDate: '30 Apr 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR, BILLING SECURITY', incentiveType: '—', totalIncentive: 19, status: 'Approved' },
  { id: 41, startDate: '01 Mar 2026', endDate: '31 Mar 2026', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR, BILLING SECURITY', incentiveType: '—', totalIncentive: 19, status: 'Approved' },
];

export const receiptData = [
  { id: 115, voucherDate: '08 Jul 2026', branch: 'A1-MART CORPORATE OFFICE', totalAmount: '₹11,000', createdBy: 'MOGESH' },
  { id: 114, voucherDate: '08 Jul 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹1', createdBy: 'MOGESH' },
  { id: 112, voucherDate: '08 Jul 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹8,000', createdBy: 'SIVAKUMAR T' },
  { id: 111, voucherDate: '12 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹530', createdBy: 'MUGILAN S' },
  { id: 110, voucherDate: '10 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹10,000', createdBy: 'SIVAKUMAR T' },
  { id: 109, voucherDate: '09 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹1,165', createdBy: 'SIVAKUMAR T' },
  { id: 108, voucherDate: '09 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹3,000', createdBy: 'SIVAKUMAR T' },
  { id: 107, voucherDate: '03 Jun 2026', branch: 'A1MART-DISTRIBUTION WAREHOUSE', totalAmount: '₹5,000', createdBy: 'RANJITHA S' },
];

export const employeeData = [
  { id: 'A1-001', name: 'B.SATHYA', branch: 'A1MART-SARON', designation: 'GROCERY MANAGER', gender: 'Male', status: 'Active' },
  { id: 'A1-003', name: 'BALAMURUGAN-A', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', gender: 'Male', status: 'Active' },
  { id: 'A1-004', name: 'JAFFIR ALI', branch: 'AIMART-CITY CENTER', designation: 'HOUSEHOLD MANAGER', gender: 'Male', status: 'Active' },
  { id: 'A1-005', name: 'RAAKUMAR M', branch: 'AIMART-MAIN', designation: 'BILLING CHECKING', gender: 'Male', status: 'Active' },
  { id: 'A1-006', name: 'RAMKUMAR M', branch: 'A1-MART CORPORATE OFFICE', designation: 'ACCOUNTS MANAGER', gender: 'Male', status: 'Active' },
  { id: 'A1-254', name: 'VIJAY K', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'GRN-SUPERVISOR', gender: 'Male', status: 'Active' },
  { id: 'A1-320', name: 'KARTHICK R', branch: 'AIMART-CITY CENTER', designation: 'HOUSEHOLD MANAGER', gender: 'Male', status: 'Active' },
  { id: 'A1-420', name: 'FAHATH MUHAMMED V', branch: 'A1MART-SARON', designation: 'BILLING OPERATOR', gender: 'Male', status: 'Active' },
  { id: 'A1-447', name: 'ARAVINTH A', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'DRIVER', gender: 'Male', status: 'Active' },
  { id: 'A1-513', name: 'BALU SRIDHAR', branch: 'A1MART-SARON', designation: 'BILLING SECURITY', gender: 'Male', status: 'Active' },
  { id: 'A1-520', name: 'MUGILAN S', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'GRN-HELPER', gender: 'Male', status: 'Active' },
  { id: 'A1-522', name: 'SIVAKUMAR T', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'GRN-SUPERVISOR', gender: 'Male', status: 'Active' },
  { id: 'A1-530', name: 'RANJITHA S', branch: 'A1MART-SARON', designation: 'CASHIER', gender: 'Female', status: 'Active' },
  { id: 'A1-534', name: 'MOGESH', branch: 'A1-MART CORPORATE OFFICE', designation: 'ACCOUNTS ASSISTANT', gender: 'Male', status: 'Active' },
  { id: 'A1-535', name: 'VIJAY ELUMALAI', branch: 'A1-MART CORPORATE OFFICE', designation: 'IT AND SOFTWARE MANAGER', gender: 'Male', status: 'Active' },
  { id: 'A1-540', name: 'PRIYA K', branch: 'A1-MART CORPORATE OFFICE', designation: 'HR TRAINER', gender: 'Female', status: 'Active' },
  { id: 'A1-586', name: 'NOWSATH', branch: 'A1MART-DISTRIBUTION WAREHOUSE', designation: 'LOAD MAN', gender: 'Male', status: 'Active' },
];

export const attendanceDetailsData = [
  { id: 'AI-586', name: 'NOWSATH', designation: 'LOAD MAN', branch: 'A1MART-DISTRIBUTION WAREHOUSE', restDay: 'Sunday', status: 'Present', timeliness: '—', sessions: '12:45 AM → Till now (11h 31m)', total: '11h 31m' },
  { id: 'AI-447', name: 'ARAVINTH A', designation: 'DRIVER', branch: 'A1MART-DISTRIBUTION WAREHOUSE', restDay: 'Sunday', status: 'Present', timeliness: '—', sessions: '12:45 AM → Till now (11h 31m)', total: '11h 31m' },
  { id: 'AI-320', name: 'KARTHICK R', designation: 'HOUSEHOLD MANAGER', branch: 'AIMART-CITY CENTER', restDay: 'Monday', status: 'Present', timeliness: '—', sessions: '09:10 AM → Till now (7h 06m)', total: '7h 06m' },
  { id: 'AI-001', name: 'B.SATHYA', designation: 'GROCERY MANAGER', branch: 'A1MART-SARON', restDay: 'Sunday', status: 'Present', timeliness: 'On Time', sessions: '08:30 AM → Till now (7h 45m)', total: '7h 45m' },
  { id: 'AI-003', name: 'BALAMURUGAN- A', designation: 'BILLING OPERATOR', branch: 'A1MART-SARON', restDay: 'Sunday', status: 'Present', timeliness: 'On Time', sessions: '08:45 AM → Till now (7h 30m)', total: '7h 30m' },
  { id: 'AI-004', name: 'JAFFIR ALI', designation: 'HOUSEHOLD MANAGER', branch: 'AIMART-CITY CENTER', restDay: 'Tuesday', status: 'Present', timeliness: 'On Time', sessions: '09:00 AM → Till now (7h 15m)', total: '7h 15m' },
  { id: 'AI-005', name: 'RAAKUMAR M', designation: 'BILLING CHECKING', branch: 'AIMART-MAIN', restDay: 'Wednesday', status: 'Present', timeliness: 'On Time', sessions: '08:50 AM → Till now (7h 25m)', total: '7h 25m' },
  { id: 'AI-006', name: 'RAMKUMAR M', designation: 'ACCOUNTS MANAGER', branch: 'A1-MART CORPORATE OFFICE', restDay: 'Sunday', status: 'Present', timeliness: 'On Time', sessions: '09:00 AM → Till now (7h 15m)', total: '7h 15m' },
  { id: 'AI-254', name: 'VIJAY K', designation: 'GRN-SUPERVISOR', branch: 'A1MART-DISTRIBUTION WAREHOUSE', restDay: 'Thursday', status: 'Present', timeliness: 'On Time', sessions: '07:30 AM → Till now (8h 45m)', total: '8h 45m' },
  { id: 'AI-420', name: 'FAHATH MUHAMMED V', designation: 'BILLING OPERATOR', branch: 'A1MART-SARON', restDay: 'Sunday', status: 'Present', timeliness: 'On Time', sessions: '09:15 AM → Till now (7h 00m)', total: '7h 00m' },
  { id: 'AI-513', name: 'BALU SRIDHAR', designation: 'BILLING SECURITY', branch: 'A1MART-SARON', restDay: 'Sunday', status: 'Present', timeliness: 'On Time', sessions: '08:00 AM → Till now (8h 15m)', total: '8h 15m' },
  { id: 'AI-520', name: 'MUGILAN S', designation: 'GRN-HELPER', branch: 'A1MART-DISTRIBUTION WAREHOUSE', restDay: 'Friday', status: 'Present', timeliness: 'On Time', sessions: '08:15 AM → Till now (8h 00m)', total: '8h 00m' },
  { id: 'AI-530', name: 'RANJITHA S', designation: 'CASHIER', branch: 'A1MART-SARON', restDay: 'Sunday', status: 'Present', timeliness: 'On Time', sessions: '09:00 AM → Till now (7h 15m)', total: '7h 15m' },
  { id: 'AI-535', name: 'VIJAY ELUMALAI', designation: 'IT AND SOFTWARE MANAGER', branch: 'A1-MART CORPORATE OFFICE', restDay: 'Sunday', status: 'Present', timeliness: 'On Time', sessions: '08:00 AM → Till now (8h 15m)', total: '8h 15m' },
];

export const payrollEmployeesData = [
  { id: 'AI-001', name: 'B.SATHYA', designation: 'LOAD MAN', branch: 'A1MART-DISTRIBUTION WAREHOUSE', grossPay: '₹1,78,692.64', totalDeductions: '₹24,278.64', netPay: '₹1,57,414', paymentStatus: 'Paid' },
  { id: 'AI-003', name: 'BALAMURUGAN- A', designation: 'DRIVER', branch: 'A1MART-DISTRIBUTION WAREHOUSE', grossPay: '₹1', totalDeductions: '₹0', netPay: '₹1', paymentStatus: 'Paid' },
  { id: 'AI-004', name: 'JAFFIR ALI', designation: 'HOUSEHOLD MANAGER', branch: 'AIMART-CITY CENTER', grossPay: '₹69,558', totalDeductions: '₹3,787', netPay: '₹65,291', paymentStatus: 'Paid' },
  { id: 'AI-005', name: 'RAAKUMAR M', designation: 'BILLING CHECKING', branch: 'AIMART-MAIN', grossPay: '₹1,35,533.74', totalDeductions: '₹14,913.74', netPay: '₹1,16,619', paymentStatus: 'Paid' },
  { id: 'AI-006', name: 'RAMKUMAR M', designation: 'ACCOUNTS MANAGER', branch: 'A1-MART CORPORATE OFFICE', grossPay: '₹1,85,000', totalDeductions: '₹21,500', netPay: '₹1,63,500', paymentStatus: 'Paid' },
  { id: 'AI-254', name: 'VIJAY K', designation: 'GRN-SUPERVISOR', branch: 'A1MART-DISTRIBUTION WAREHOUSE', grossPay: '₹42,000', totalDeductions: '₹3,800', netPay: '₹38,200', paymentStatus: 'Paid' },
  { id: 'AI-320', name: 'KARTHICK R', designation: 'HOUSEHOLD MANAGER', branch: 'AIMART-CITY CENTER', grossPay: '₹68,400', totalDeductions: '₹4,100', netPay: '₹64,300', paymentStatus: 'Paid' },
  { id: 'AI-420', name: 'FAHATH MUHAMMED V', designation: 'BILLING OPERATOR', branch: 'A1MART-SARON', grossPay: '₹36,000', totalDeductions: '₹2,900', netPay: '₹33,100', paymentStatus: 'Paid' },
  { id: 'AI-513', name: 'BALU SRIDHAR', designation: 'BILLING SECURITY', branch: 'A1MART-SARON', grossPay: '₹28,500', totalDeductions: '₹2,100', netPay: '₹26,400', paymentStatus: 'Paid' },
  { id: 'AI-520', name: 'MUGILAN S', designation: 'GRN-HELPER', branch: 'A1MART-DISTRIBUTION WAREHOUSE', grossPay: '₹24,000', totalDeductions: '₹1,800', netPay: '₹22,200', paymentStatus: 'Paid' },
  { id: 'AI-530', name: 'RANJITHA S', designation: 'CASHIER', branch: 'A1MART-SARON', grossPay: '₹34,000', totalDeductions: '₹2,800', netPay: '₹31,200', paymentStatus: 'Paid' },
  { id: 'AI-535', name: 'VIJAY ELUMALAI', designation: 'IT AND SOFTWARE MANAGER', branch: 'A1-MART CORPORATE OFFICE', grossPay: '₹2,10,000', totalDeductions: '₹28,500', netPay: '₹1,81,500', paymentStatus: 'Paid' },
  { id: 'AI-586', name: 'NOWSATH', designation: 'LOAD MAN', branch: 'A1MART-DISTRIBUTION WAREHOUSE', grossPay: '₹32,500', totalDeductions: '₹2,400', netPay: '₹30,100', paymentStatus: 'Paid' },
];

export const checklistData = [
  { id: 1, title: 'Morning Store Opening Check', branch: 'A1MART-SARON', assignedTo: 'B.SATHYA', dueDate: '24/10/2026', status: 'Done' },
  { id: 2, title: 'Cold Chain Compliance', branch: 'A1MART-SARON', assignedTo: 'RAMKUMAR M', dueDate: '24/10/2026', status: 'Open' },
  { id: 3, title: 'Security Round - Night', branch: 'A1MART-DISTRIBUTION WAREHOUSE', assignedTo: 'BALU SRIDHAR', dueDate: '23/10/2026', status: 'Done' },
  { id: 4, title: 'Stock Level Verification', branch: 'A1MART-SARON', assignedTo: 'VIJAY K', dueDate: '25/10/2026', status: 'In Progress' },
];

export const materialsData = [
  { id: 1, material: 'Polybags - 1kg', category: 'Packaging', quantity: 5000, unit: 'pcs', status: 'In Stock' },
  { id: 2, material: 'Barcode Labels', category: 'Labelling', quantity: 10000, unit: 'rolls', status: 'In Stock' },
  { id: 3, material: 'Carton Boxes - Medium', category: 'Packaging', quantity: 200, unit: 'pcs', status: 'Low Stock' },
  { id: 4, material: 'Stretch Film Roll', category: 'Packaging', quantity: 50, unit: 'rolls', status: 'In Stock' },
];

export const payrollData = [
  { id: 1, employee: 'B.SATHYA', branch: 'A1MART-SARON', month: 'Sep 2026', basic: '₹18,000', allowances: '₹3,200', deductions: '₹1,800', netPay: '₹19,400', status: 'Paid' },
  { id: 2, employee: 'RAMKUMAR M', branch: 'A1-MART CORPORATE OFFICE', month: 'Sep 2026', basic: '₹22,000', allowances: '₹4,000', deductions: '₹2,200', netPay: '₹23,800', status: 'Paid' },
  { id: 3, employee: 'VIJAY ELUMALAI', branch: 'A1-MART CORPORATE OFFICE', month: 'Sep 2026', basic: '₹28,000', allowances: '₹5,000', deductions: '₹2,800', netPay: '₹30,200', status: 'Paid' },
];

export const logsData = [
  { id: 1, user: 'VIJAY ELUMALAI', action: 'Login', module: 'Authentication', timestamp: '24/10/2026 09:02 AM' },
  { id: 2, user: 'VIJAY ELUMALAI', action: 'Updated Task #10', module: 'Tasks', timestamp: '24/10/2026 09:15 AM' },
  { id: 3, user: 'RAMKUMAR M', action: 'Added Purchase Entry #147', module: 'Purchase Entries', timestamp: '24/10/2026 10:30 AM' },
  { id: 4, user: 'MOGESH', action: 'Created Receipt #115', module: 'Accounts', timestamp: '24/10/2026 11:00 AM' },
  { id: 5, user: 'SIVAKUMAR T', action: 'Approved Incentive #56', module: 'Incentives', timestamp: '24/10/2026 11:45 AM' },
];

export const approvalsData = [
  { id: 1, employee: 'BALU SRIDHAR', type: 'Leave', from: '25/10/2026', to: '26/10/2026', status: 'Open' },
  { id: 2, employee: 'MUGILAN S', type: 'Expense', from: '20/10/2026', to: '20/10/2026', status: 'Approved' },
  { id: 3, employee: 'FAHATH MUHAMMED V', type: 'Leave', from: '28/10/2026', to: '29/10/2026', status: 'Open' },
];

export const purchaseReturnData = [
  { id: 1, returnDate: '15/10/2026', invoiceNumber: 'GST/9353/26-27', vendor: 'r s manufacturing', items: 2, totalAmount: '₹12,500.00', status: 'Approved' },
  { id: 2, returnDate: '18/10/2026', invoiceNumber: 'DBS/26-27/1993', vendor: 'DISHA LABELS AND BARCO...', items: 5, totalAmount: '₹8,750.00', status: 'Pending' },
];

export const transportData = [
  { id: 1, vehicle: 'TN 01 AB 1234', driver: 'SIVAKUMAR T', route: 'SARON → CORPORATE OFFICE', date: '24/10/2026', status: 'Completed' },
  { id: 2, vehicle: 'TN 02 CD 5678', driver: 'MUGILAN S', route: 'DISTRIBUTION WH → SARON', date: '24/10/2026', status: 'In Transit' },
  { id: 3, vehicle: 'TN 03 EF 9012', driver: 'RANJITHA S', route: 'CORPORATE OFFICE → SARON', date: '25/10/2026', status: 'Scheduled' },
];

export const sidebarRouteConfig = {
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

export const searchPages = [
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

export const ourTeamEmployeesData = [
  {
    id: 'A1-058',
    name: 'SHORANA',
    avatar: '/avatars/employee_avatar_10.png',
    designation: 'LINE SUPPORT',
    mobile: '8778793688',
    branch: 'A1MART – VELLORE ROAD',
    restDay: 'Tuesday',
    status: 'Active'
  },
  {
    id: 'A1-075',
    name: 'MOHAMAED THAHIR',
    avatar: '/avatars/employee_avatar_02.png',
    designation: 'STORE-SUPERVISOR',
    mobile: '9710298487',
    branch: 'A1MART – VELLORE ROAD',
    restDay: 'Friday',
    status: 'Active'
  },
  {
    id: 'A1-077',
    name: 'VEERAN',
    avatar: '/avatars/employee_avatar_03.png',
    designation: 'SECURITY GUARD',
    mobile: '8120398527',
    branch: 'A1MART – VELLORE ROAD',
    restDay: 'Not Set',
    status: 'Active'
  },
  {
    id: 'A1-221',
    name: 'MOHAMMED MANSUR H',
    avatar: '/avatars/employee_avatar_04.png',
    designation: 'STORE-MANAGER',
    mobile: '9844346616',
    branch: 'A1MART – VELLORE ROAD',
    restDay: 'Monday',
    status: 'Active'
  }
];

export const checklistDashboardRecords = [
  {
    id: 'REC-001',
    title: 'Checklist Dashboard Standard Entry A',
    module: 'Operations',
    updatedDate: '24 Oct 2026',
    status: 'Active'
  },
  {
    id: 'REC-002',
    title: 'Checklist Dashboard Standard Entry B',
    module: 'Operations',
    updatedDate: '23 Oct 2026',
    status: 'Active'
  },
  {
    id: 'REC-003',
    title: 'Checklist Dashboard Standard Entry C',
    module: 'Inventory',
    updatedDate: '22 Oct 2026',
    status: 'Pending'
  }
];

export const stockCircleDashboardRecords = [
  {
    id: 'REC-001',
    title: 'Stock Circle Dashboard Standard Entry A',
    module: 'Operations',
    updatedDate: '24 Oct 2026',
    status: 'Active'
  },
  {
    id: 'REC-002',
    title: 'Stock Circle Dashboard Standard Entry B',
    module: 'Operations',
    updatedDate: '23 Oct 2026',
    status: 'Active'
  },
  {
    id: 'REC-003',
    title: 'Stock Circle Dashboard Standard Entry C',
    module: 'Inventory',
    updatedDate: '22 Oct 2026',
    status: 'Pending'
  }
];

