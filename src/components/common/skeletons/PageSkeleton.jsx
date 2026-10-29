import React from 'react';
import Skeleton from './Skeleton';
import SkeletonCard from './SkeletonCard';
import TableSkeleton from './TableSkeleton';

export default function PageSkeleton({ title = 'Loading Module...', cardCount = 4 }) {
  return (
    <div className="content-wrapper skeleton-page-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header Breadcrumb & Title */}
      <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Skeleton variant="text" width={120} height={13} />
          <Skeleton variant="text" width={240} height={28} />
          <Skeleton variant="text" width={320} height={14} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Skeleton variant="rounded" width={100} height={38} style={{ borderRadius: '10px' }} />
          <Skeleton variant="rounded" width={120} height={38} style={{ borderRadius: '10px' }} />
        </div>
      </div>

      {/* Metric Cards Row */}
      {cardCount > 0 && (
        <div className="stat-cards-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(cardCount, 4)}, minmax(0, 1fr))`, gap: '16px' }}>
          {Array.from({ length: cardCount }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      )}

      {/* Main Content Table or Grid */}
      <TableSkeleton rows={6} cols={5} />
    </div>
  );
}

