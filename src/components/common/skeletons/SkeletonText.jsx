import React from 'react';
import Skeleton from './Skeleton';

export default function SkeletonText({
  lines = 3,
  lineHeight = 14,
  gap = 8,
  lastLineWidth = '65%',
  className = ''
}) {
  return (
    <div className={`skeleton-text-container ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
      {Array.from({ length: lines }).map((_, idx) => {
        const isLast = idx === lines - 1;
        const width = isLast ? lastLineWidth : idx % 2 === 0 ? '100%' : '92%';
        return (
          <Skeleton
            key={idx}
            variant="text"
            height={lineHeight}
            width={width}
          />
        );
      })}
    </div>
  );
}

