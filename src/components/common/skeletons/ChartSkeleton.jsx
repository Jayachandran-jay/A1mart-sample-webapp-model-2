import React from 'react';
import Skeleton from './Skeleton';

export default function ChartSkeleton({ className = '' }) {
  // Height variations to simulate realistic bar chart data
  const barHeights = [45, 62, 38, 55, 75, 88, 68, 80, 52, 95];

  return (
    <div className={`content-card skeleton-chart-card ${className}`} style={{ minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
      {/* Header: Title + Export controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton variant="rounded" width={24} height={24} style={{ borderRadius: '6px' }} />
          <Skeleton variant="text" width={180} height={18} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton variant="rounded" width={75} height={32} style={{ borderRadius: '8px' }} />
          <Skeleton variant="rounded" width={75} height={32} style={{ borderRadius: '8px' }} />
        </div>
      </div>

      {/* Simulated Chart Bars */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', padding: '16px 8px 12px' }}>
        {barHeights.map((h, idx) => (
          <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Skeleton
              variant="rounded"
              width="85%"
              height={`${h}%`}
              style={{ borderRadius: '12px 12px 4px 4px', minHeight: '30px' }}
            />
            <Skeleton variant="text" width={22} height={10} />
          </div>
        ))}
      </div>

      {/* Legend Row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Skeleton variant="circular" width={8} height={8} />
          <Skeleton variant="text" width={55} height={11} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Skeleton variant="circular" width={8} height={8} />
          <Skeleton variant="text" width={55} height={11} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Skeleton variant="circular" width={8} height={8} />
          <Skeleton variant="text" width={45} height={11} />
        </div>
      </div>
    </div>
  );
}

