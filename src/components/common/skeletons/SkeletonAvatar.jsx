import React from 'react';
import Skeleton from './Skeleton';

export default function SkeletonAvatar({
  size = 44,
  shape = 'circular', // 'circular' | 'rounded'
  className = ''
}) {
  return (
    <Skeleton
      variant={shape === 'circular' ? 'circular' : 'rounded'}
      width={size}
      height={size}
      className={`skeleton-avatar-wrap ${className}`}
    />
  );
}

