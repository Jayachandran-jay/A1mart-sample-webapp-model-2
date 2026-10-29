import React from 'react';
import Skeleton from './Skeleton';

export default function ProductGridSkeleton({ count = 6, className = '' }) {
  return (
    <div className={`product-grid-skeleton ${className}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="content-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Skeleton variant="rounded" width="100%" height={140} style={{ borderRadius: '14px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton variant="text" width={60} height={11} />
            <Skeleton variant="rounded" width={50} height={18} style={{ borderRadius: '999px' }} />
          </div>
          <Skeleton variant="text" width="85%" height={16} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
            <Skeleton variant="text" width={70} height={18} />
            <Skeleton variant="rounded" width={32} height={32} style={{ borderRadius: '8px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

