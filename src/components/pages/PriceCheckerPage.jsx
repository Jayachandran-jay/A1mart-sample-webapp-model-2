import React, { useState } from 'react';
import { Tag, ScanBarcode, Download, Search, CheckCircle2, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import DataTable from '../common/DataTable';

export default function PriceCheckerPage() {
  const { showToast } = useApp();
  const [branch, setBranch] = useState('A1MART-SARON');
  const [department, setDepartment] = useState('GROCERY FOOD');
  const [category, setCategory] = useState('RICE & PULSES');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [hasChecked, setHasChecked] = useState(true);

  const sampleProducts = [
    { id: 'PRD-001', name: 'A1 Ponni Boiled Rice 5 kg', category: 'Grocery', brand: 'A1-BRAND', mrp: '₹360.00', salePrice: '₹320.00', stock: '125 Bags', margin: '11.1%' },
    { id: 'PRD-002', name: 'Gold Winner Refined Sunflower Oil 1 L', category: 'Cooking Oil', brand: 'Gold Winner', mrp: '₹165.00', salePrice: '₹145.00', stock: '86 Pcs', margin: '12.1%' },
    { id: 'PRD-003', name: 'Ariel Matic Detergent Powder 1 kg', category: 'Household', brand: 'Ariel', mrp: '₹140.00', salePrice: '₹110.00', stock: '42 Pcs', margin: '21.4%' },
    { id: 'PRD-004', name: 'Tata Salt Crystal 1 kg', category: 'Grocery', brand: 'Tata', mrp: '₹28.00', salePrice: '₹24.00', stock: '320 Pcs', margin: '14.2%' },
    { id: 'PRD-005', name: 'A1 Roasted Gram (Pottukadalai) 500 g', category: 'Pulses', brand: 'A1-BRAND', mrp: '₹85.00', salePrice: '₹72.00', stock: '110 Packs', margin: '15.2%' },
    { id: 'PRD-006', name: 'Aachi Chilli Powder 500 g', category: 'Masala & Spices', brand: 'Aachi', mrp: '₹190.00', salePrice: '₹165.00', stock: '54 Pcs', margin: '13.1%' }
  ];

  const columns = [
    { header: 'Product Code', accessor: 'id' },
    { header: 'Product Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Brand', accessor: 'brand' },
    { header: 'MRP', accessor: 'mrp' },
    { header: 'Discounted Price', accessor: 'salePrice' },
    { header: 'Available Live Stock', accessor: 'stock' },
    { header: 'Store Margin', accessor: 'margin' }
  ];

  const handleScan = () => {
    setBarcodeInput('8901030384721');
    showToast('Simulated barcode scan: 8901030384721 (Ponni Boiled Rice)');
  };

  const handleCheck = () => {
    setHasChecked(true);
    showToast('Product pricing updated from live POS register.');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Product Code,Name,Category,Brand,MRP,Sale Price,Stock,Margin"]
      .concat(sampleProducts.map(p => `${p.id},"${p.name}",${p.category},${p.brand},${p.mrp},${p.salePrice},${p.stock},${p.margin}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "a1mart-price-checker.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Price list downloaded as CSV.', 'success');
  };

  return (
    <div className="content-wrapper">
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-breadcrumb">
            <span>A1-MART</span> / <span className="active-crumb">Price Checker</span>
          </div>
          <h1 className="page-main-heading">Real-Time Price & Margin Checker</h1>
          <p className="page-subheading">
            Verify retail prices, barcode matching, promotional discounts, and live inventory stock
          </p>
        </div>

        <div className="header-action-group">
          <button className="btn-secondary btn-pill-sm" onClick={handleExportCSV}>
            <Download size={14} /> Export CSV
          </button>
          <button className="btn-primary btn-pill-sm" onClick={handleScan}>
            <ScanBarcode size={14} /> Scan Barcode
          </button>
        </div>
      </div>

      {/* Filter / Search Card */}
      <div className="content-card">
        <h3 className="card-main-title">Select Parameters</h3>
        <div className="form-row-2">
          <div className="form-group">
            <label>Store Branch</label>
            <select
              className="form-select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option>A1-MART CORPORATE OFFICE</option>
              <option>A1MART-SARON</option>
              <option>A1MART DISTRIBUTION WAREHOUSE</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>GROCERY FOOD</option>
              <option>HOUSEHOLD NECESSARY</option>
              <option>NON-FOOD FMCG</option>
              <option>DAIRY & BEVERAGES</option>
            </select>
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>RICE & PULSES</option>
              <option>EDIBLE OILS & GHEE</option>
              <option>DETERGENTS & CLEANERS</option>
              <option>SPICES & MASALAS</option>
            </select>
          </div>

          <div className="form-group">
            <label>Search by Product or Barcode</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter product title or scan barcode (e.g. 8901030...)"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            className="btn-secondary"
            onClick={() => {
              setBarcodeInput('');
              showToast('Filters reset.');
            }}
          >
            Reset
          </button>
          <button className="btn-primary" onClick={handleCheck}>
            <Search size={14} /> Check Live Prices
          </button>
        </div>
      </div>

      {/* Results Table */}
      {hasChecked && (
        <div>
          <h3 className="card-main-title" style={{ marginBottom: '14px' }}>
            Matching Price Checker Results ({sampleProducts.length} items)
          </h3>
          <DataTable
            columns={columns}
            data={sampleProducts}
            pageSize={10}
            searchPlaceholder="Search within results..."
            title="Price Checker Record"
          />
        </div>
      )}
    </div>
  );
}

