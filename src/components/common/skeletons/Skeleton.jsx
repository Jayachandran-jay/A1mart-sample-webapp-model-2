import React from 'react';

/**
 * Primitive Skeleton placeholder with shimmer/pulse animations and dark mode support
 */
export default function Skeleton({
  variant = 'rounded', // 'text' | 'circular' | 'rectangular' | 'rounded'
  width,
  height,
  className = '',
  animation = 'shimmer', // 'shimmer' | 'pulse' | 'none'
  style = {}
}) {
  const getVariantClass = () => {
    switch (variant) {
      case 'circular':
        return 'skeleton-circular';
      case 'text':
        return 'skeleton-text';
      case 'rectangular':
        return 'skeleton-rectangular';
      case 'rounded':
      default:
        return 'skeleton-rounded';
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'pulse':
        return 'skeleton-pulse';
      case 'none':
        return '';
      case 'shimmer':
      default:
        return 'skeleton-shimmer';
    }
  };

  const inlineStyles = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style
  };

  return (
    <div
      className={`skeleton-base ${getVariantClass()} ${getAnimationClass()} ${className}`}
      style={inlineStyles}
      aria-hidden="true"
    />
  );
}

