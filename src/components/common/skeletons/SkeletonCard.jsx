import React from 'react';
import Skeleton from './Skeleton';

export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`stat-card skeleton-stat-card ${className}`}>
      {/* Top row: icon dish + title placeholder + top-right arrow */}
      <div className="stat-card-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton variant="rounded" width={32} height={32} style={{ borderRadius: '8px' }} />
          <Skeleton variant="text" width={90} height={14} />
        </div>
        <Skeleton variant="rounded" width={16} height={16} style={{ borderRadius: '4px' }} />
      </div>

      {/* Main Metric Value */}
      <div style={{ margin: '8px 0 12px' }}>
        <Skeleton variant="rounded" width="60%" height={28} style={{ borderRadius: '6px' }} />
      </div>

      {/* Bottom badge pill (e.g. +14.2% trend) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Skeleton variant="rounded" width={64} height={20} style={{ borderRadius: '999px' }} />
        <Skeleton variant="text" width={50} height={12} />
      </div>
    </div>
  );
}

