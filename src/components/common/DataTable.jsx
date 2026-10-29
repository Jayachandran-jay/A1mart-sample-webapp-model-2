import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EmployeeAvatar from './EmployeeAvatar';

export default function DataTable({
  columns = [],
  data = [],
  pageSize = 10,
  searchPlaceholder = 'Search records...',
  title = '',
  onRowAction,
  actionLabel = 'Details'
}) {
  const { openModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(item => {
      if (Array.isArray(item)) {
        return item.some(cell => String(cell).toLowerCase().includes(q));
      }
      return Object.values(item).some(val => String(val).toLowerCase().includes(q));
    });
  }, [data, searchQuery]);

  // Pagination calculation
  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const pageRows = filteredData.slice(startIndex, startIndex + pageSize);

  const formatCellValue = (val, colKey) => {
    if (val === undefined || val === null || val === '') return '—';

    // Status or Priority badge
    const lowerKey = String(colKey || '').toLowerCase();
    const strVal = String(val);
    if (lowerKey.includes('status') || lowerKey.includes('priority')) {
      const slug = strVal.toLowerCase().replace(/\s+/g, '-');
      return <span className={`status-badge ${slug}`}>{strVal}</span>;
    }

    // Designation badges
    if (lowerKey.includes('designation') && strVal.includes(',')) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {strVal.split(',').map((d, i) => (
            <span key={i} className="status-badge low">{d.trim()}</span>
          ))}
        </div>
      );
    }

    // Personnel name with avatar
    if (
      lowerKey.includes('employee') ||
      lowerKey.includes('assigned') ||
      lowerKey.includes('created by') ||
      lowerKey.includes('driver') ||
      lowerKey === 'user'
    ) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EmployeeAvatar name={strVal} size={28} shape="circle" />
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{strVal}</span>
        </div>
      );
    }

    return strVal;
  };

  const handleAction = (row, index) => {
    if (onRowAction) {
      onRowAction(row, index);
    } else {
      openModal('recordDetails', `${title || 'Record'} Details`, {
        columns,
        row
      });
    }
  };

  return (
    <div className="table-card-container">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        <div className="table-search-input">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Showing <strong>{totalRecords === 0 ? 0 : startIndex + 1}</strong> to{' '}
          <strong>{Math.min(startIndex + pageSize, totalRecords)}</strong> of{' '}
          <strong>{totalRecords}</strong> entries
        </div>
      </div>

      {/* Table Element */}
      <div className="table-responsive-box">
        <table className="modern-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>
                  {typeof col === 'string' ? col : col.header || col.accessor}
                </th>
              ))}
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              pageRows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => {
                    const key = typeof col === 'string' ? col : col.accessor;
                    const value = Array.isArray(row) ? row[colIdx] : row[key];
                    return (
                      <td key={colIdx}>
                        {formatCellValue(value, key)}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="icon-action-btn"
                      style={{ width: '30px', height: '30px', margin: '0 auto' }}
                      title="View actions"
                      onClick={() => handleAction(row, startIndex + rowIdx)}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="table-pagination-bar">
        <span>Page {validCurrentPage} of {totalPages}</span>
        <div className="pagination-controls">
          <button
            className="page-btn"
            disabled={validCurrentPage <= 1}
            onClick={() => setCurrentPage(1)}
            title="First page"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            className="page-btn"
            disabled={validCurrentPage <= 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="page-btn"
            disabled={validCurrentPage >= totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>
          <button
            className="page-btn"
            disabled={validCurrentPage >= totalPages}
            onClick={() => setCurrentPage(totalPages)}
            title="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

