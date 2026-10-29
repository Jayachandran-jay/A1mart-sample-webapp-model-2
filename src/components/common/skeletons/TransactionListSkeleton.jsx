import React from 'react';
import Skeleton from './Skeleton';

export default function TransactionListSkeleton({ className = '' }) {
  return (
    <div className={`content-card skeleton-tx-card ${className}`} style={{ minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton variant="rounded" width={22} height={22} style={{ borderRadius: '6px' }} />
          <Skeleton variant="text" width={160} height={17} />
        </div>
        <Skeleton variant="text" width={60} height={14} />
      </div>

      {/* Transaction Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'space-around' }}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Skeleton variant="rounded" width={38} height={38} style={{ borderRadius: '10px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Skeleton variant="text" width={130} height={13} />
                <Skeleton variant="text" width={90} height={11} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
              <Skeleton variant="text" width={75} height={14} />
              <Skeleton variant="text" width={50} height={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

