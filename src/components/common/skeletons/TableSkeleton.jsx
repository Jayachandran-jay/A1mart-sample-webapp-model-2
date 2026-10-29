import React from 'react';
import Skeleton from './Skeleton';

export default function TableSkeleton({ rows = 5, cols = 6, title = 'Store Records', className = '' }) {
  return (
    <div className={`table-card-container skeleton-table-container ${className}`}>
      {/* Table Toolbar */}
      <div className="table-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton variant="rounded" width={22} height={22} style={{ borderRadius: '6px' }} />
          <Skeleton variant="text" width={180} height={18} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton variant="rounded" width={210} height={36} style={{ borderRadius: '10px' }} />
          <Skeleton variant="rounded" width={80} height={36} style={{ borderRadius: '10px' }} />
        </div>
      </div>

      {/* Table Structure */}
      <div className="table-responsive-box" style={{ overflowX: 'auto' }}>
        <table className="modern-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, cIdx) => (
                <th key={cIdx} style={{ padding: '12px 16px' }}>
                  <Skeleton variant="text" width={cIdx === 0 ? 60 : cIdx === 1 ? 140 : 80} height={13} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rIdx) => (
              <tr key={rIdx}>
                {Array.from({ length: cols }).map((_, cIdx) => (
                  <td key={cIdx} style={{ padding: '14px 16px', borderTop: '1px solid var(--border)' }}>
                    {cIdx === 0 ? (
                      <Skeleton variant="rounded" width={65} height={16} style={{ borderRadius: '4px' }} />
                    ) : cIdx === 1 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Skeleton variant="text" width={160} height={13} />
                        <Skeleton variant="text" width={100} height={10} />
                      </div>
                    ) : cIdx === cols - 1 ? (
                      <Skeleton variant="rounded" width={55} height={22} style={{ borderRadius: '999px' }} />
                    ) : (
                      <Skeleton variant="text" width={75} height={13} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Bar */}
      <div className="table-pagination-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
        <Skeleton variant="text" width={140} height={12} />
        <div style={{ display: 'flex', gap: '6px' }}>
          <Skeleton variant="rounded" width={32} height={32} style={{ borderRadius: '8px' }} />
          <Skeleton variant="rounded" width={32} height={32} style={{ borderRadius: '8px' }} />
          <Skeleton variant="rounded" width={32} height={32} style={{ borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
}

