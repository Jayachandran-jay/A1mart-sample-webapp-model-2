import React from 'react';
import Skeleton from './Skeleton';
import SkeletonCard from './SkeletonCard';
import ChartSkeleton from './ChartSkeleton';
import TransactionListSkeleton from './TransactionListSkeleton';
import TableSkeleton from './TableSkeleton';

export default function DashboardSkeleton() {
  return (
    <div className="dashboard-content dashboard-skeleton-root" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Top Banner & Stat Cards Grid */}
      <div className="top-dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '22px', alignItems: 'stretch' }}>
        {/* Hero Banner Skeleton */}
        <div
          className="hero-banner skeleton-hero-banner"
          style={{
            minHeight: '220px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(121, 80, 242, 0.25) 0%, rgba(91, 68, 242, 0.15) 100%)',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '60%' }}>
            <Skeleton variant="rounded" width={90} height={22} style={{ borderRadius: '999px', background: 'rgba(255, 255, 255, 0.3)' }} />
            <Skeleton variant="text" width={220} height={28} style={{ background: 'rgba(255, 255, 255, 0.4)' }} />
            <Skeleton variant="text" width={280} height={14} style={{ background: 'rgba(255, 255, 255, 0.25)' }} />
            <Skeleton variant="rounded" width={160} height={40} style={{ borderRadius: '999px', background: 'rgba(255, 255, 255, 0.4)', marginTop: '8px' }} />
          </div>
          <div style={{ width: '150px', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton variant="circular" width={120} height={120} style={{ background: 'rgba(255, 255, 255, 0.25)' }} />
          </div>
        </div>

        {/* 4 Stat Cards in 2x2 Grid */}
        <div className="stat-cards-2x2-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Middle Row: Monthly Sales Overview Chart + Recent Store Transactions */}
      <div className="second-dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '22px' }}>
        <ChartSkeleton />
        <TransactionListSkeleton />
      </div>

      {/* Bottom Row: Top Selling Store Products Table */}
      <TableSkeleton rows={5} cols={6} title="Top Selling Store Products" />
    </div>
  );
}

