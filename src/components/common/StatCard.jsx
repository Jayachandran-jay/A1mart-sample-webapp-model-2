import React from 'react';
import { ArrowUpRight, ArrowUp, ArrowDown } from 'lucide-react';

export default function StatCard({
  label,
  value,
  trend,
  isPositive = true,
  icon: Icon,
  iconColor = 'purple', // 'purple' | 'green' | 'orange' | 'blue'
  sparkline,           // 'purple' | 'green' | 'orange' | 'blue'
  badgeText,
  onClick
}) {
  const strokeColor = sparkline === 'green' ? '#10B981' : sparkline === 'orange' ? '#F59E0B' : '#7950F2';
  const gradId = `spark-grad-${sparkline || 'default'}-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="shoplay-stat-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="stat-card-top-row">
        <div className="stat-label-with-icon">
          {Icon && (
            <div className={`stat-icon-wrap ${iconColor}`}>
              <Icon size={16} strokeWidth={2} />
            </div>
          )}
          <span className="stat-card-title">{label}</span>
        </div>
        <div className="stat-arrow-corner">
          <ArrowUpRight size={15} strokeWidth={2.2} />
        </div>
      </div>

      <div className="stat-card-bottom-row">
        <div className="stat-number-badge-col">
          <span className="stat-card-number">{value}</span>
          {badgeText ? (
            <span className="trend-badge positive">
              {badgeText}
            </span>
          ) : trend ? (
            <span className={`trend-badge ${isPositive ? 'positive' : 'negative'}`}>
              {trend}
              {isPositive ? <ArrowUp size={11} strokeWidth={2.5} /> : <ArrowDown size={11} strokeWidth={2.5} />}
            </span>
          ) : null}
        </div>

        {sparkline && (
          <div className="stat-sparkline-wrap">
            <svg width="76" height="34" viewBox="0 0 76 34" fill="none">
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,28 C18,28 28,22 42,16 C54,10 64,4 76,2 L76,34 L0,34 Z"
                fill={`url(#${gradId})`}
              />
              <path
                d="M0,28 C18,28 28,22 42,16 C54,10 64,4 76,2"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
