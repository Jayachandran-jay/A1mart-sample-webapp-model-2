import React, { useState } from 'react';

// Explicit deterministic mapping for known A1-MART personnel
const EXPLICIT_AVATAR_MAP = {
  'A1-535': '/vijay_elumalai.png',
  'A1-001': '/avatars/employee_avatar_02.png', // B.SATHYA
  'A1-003': '/avatars/employee_avatar_04.png', // BALAMURUGAN-A
  'A1-004': '/avatars/employee_avatar_06.png', // JAFFIR ALI
  'A1-005': '/avatars/employee_avatar_08.png', // RAAKUMAR M
  'A1-006': '/avatars/employee_avatar_08.png', // RAMKUMAR M
  'A1-254': '/avatars/employee_avatar_10.png', // VIJAY K
  'A1-320': '/avatars/employee_avatar_12.png', // KARTHICK R
  'A1-420': '/avatars/employee_avatar_14.png', // FAHATH MUHAMMED V
  'A1-447': '/avatars/employee_avatar_16.png', // ARAVINTH A
  'A1-513': '/avatars/employee_avatar_02.png', // BALU SRIDHAR
  'A1-520': '/avatars/employee_avatar_04.png', // MUGILAN S
  'A1-522': '/avatars/employee_avatar_06.png', // SIVAKUMAR T
  'A1-530': '/avatars/employee_avatar_01.png', // RANJITHA S (Female)
  'A1-534': '/avatars/employee_avatar_08.png', // MOGESH
  'A1-586': '/avatars/employee_avatar_10.png', // NOWSATH
};

const EXPLICIT_NAME_MAP = {
  'VIJAY ELUMALAI': '/vijay_elumalai.png',
  'B.SATHYA': '/avatars/employee_avatar_02.png',
  'BALAMURUGAN-A': '/avatars/employee_avatar_04.png',
  'BALAMURUGAN- A': '/avatars/employee_avatar_04.png',
  'JAFFIR ALI': '/avatars/employee_avatar_06.png',
  'RAAKUMAR M': '/avatars/employee_avatar_08.png',
  'RAMKUMAR M': '/avatars/employee_avatar_08.png',
  'VIJAY K': '/avatars/employee_avatar_10.png',
  'KARTHICK R': '/avatars/employee_avatar_12.png',
  'FAHATH MUHAMMED V': '/avatars/employee_avatar_14.png',
  'ARAVINTH A': '/avatars/employee_avatar_16.png',
  'BALU SRIDHAR': '/avatars/employee_avatar_02.png',
  'MUGILAN S': '/avatars/employee_avatar_04.png',
  'SIVAKUMAR T': '/avatars/employee_avatar_06.png',
  'RANJITHA S': '/avatars/employee_avatar_01.png',
  'MOGESH': '/avatars/employee_avatar_08.png',
  'NOWSATH': '/avatars/employee_avatar_10.png',
  'PRIYA K': '/avatars/employee_avatar_03.png',
  'DEEPA N': '/avatars/employee_avatar_05.png',
};

/**
 * Deterministically resolves the avatar image URL for any employee
 * based on employee ID or name.
 */
export function getEmployeeAvatarUrl(empId, name) {
  const normId = (empId || '').trim();
  const normName = (name || '').trim().toUpperCase();

  if (normId && EXPLICIT_AVATAR_MAP[normId]) {
    return EXPLICIT_AVATAR_MAP[normId];
  }
  if (normName && EXPLICIT_NAME_MAP[normName]) {
    return EXPLICIT_NAME_MAP[normName];
  }
  if (normName.includes('VIJAY ELUMALAI')) {
    return '/vijay_elumalai.png';
  }

  // Hash-based deterministic fallback for any arbitrary personnel ID or name
  const seed = (normId || normName || 'employee').toString();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const avatarIndex = (Math.abs(hash) % 16) + 1;
  const pad = avatarIndex < 10 ? `0${avatarIndex}` : `${avatarIndex}`;
  return `/avatars/employee_avatar_${pad}.png`;
}

/**
 * Helper to compute monogram initials (e.g., "Vijay Elumalai" -> "VE")
 */
function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'EM';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Reusable Employee Avatar Component
 * - Deterministic portrait image based on employee ID and name
 * - Automatic graceful fallback to stylish initials badge on error
 * - Configurable sizes, shapes (rounded / circle / square), and live status dot
 */
export default function EmployeeAvatar({
  empId,
  name = 'Staff Member',
  src,
  size = 36,
  shape = 'rounded', // 'rounded' | 'circle' | 'square'
  showStatus = false,
  statusColor = '#10B981',
  className = '',
  style = {},
  alt,
}) {
  const [hasError, setHasError] = useState(false);

  // Pixel sizing presets
  const sizeMap = {
    xs: 24,
    sm: 30,
    md: 36,
    lg: 44,
    xl: 60,
    '2xl': 80,
  };
  const pixelSize = typeof size === 'number' ? size : sizeMap[size] || 36;

  // Shape radius
  const radiusMap = {
    circle: '50%',
    rounded: `${Math.max(6, Math.round(pixelSize * 0.22))}px`,
    square: '4px',
  };
  const borderRadius = radiusMap[shape] || '8px';

  const avatarSrc = src || getEmployeeAvatarUrl(empId, name);
  const initials = getInitials(name);
  const accessibleAlt = alt || `${name}${empId ? ` (${empId})` : ''} Profile Avatar`;

  return (
    <div
      className={`employee-avatar-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        minWidth: `${pixelSize}px`,
        minHeight: `${pixelSize}px`,
        borderRadius,
        overflow: 'hidden',
        backgroundColor: '#EBE9F5',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        border: '1.5px solid rgba(255, 255, 255, 0.9)',
        flexShrink: 0,
        ...style,
      }}
      title={`${name}${empId ? ` • ${empId}` : ''}`}
    >
      {!hasError ? (
        <img
          src={avatarSrc}
          alt={accessibleAlt}
          onError={() => setHasError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
          loading="lazy"
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #7950F2 0%, #5B32D1 100%)',
            color: '#FFFFFF',
            fontSize: `${Math.max(10, Math.round(pixelSize * 0.38))}px`,
            fontWeight: 700,
            letterSpacing: '0.5px',
            userSelect: 'none',
          }}
        >
          {initials}
        </div>
      )}

      {showStatus && (
        <span
          className="employee-avatar-status-dot"
          style={{
            position: 'absolute',
            bottom: '1px',
            right: '1px',
            width: `${Math.max(7, Math.round(pixelSize * 0.22))}px`,
            height: `${Math.max(7, Math.round(pixelSize * 0.22))}px`,
            borderRadius: '50%',
            backgroundColor: statusColor,
            border: '1.5px solid #FFFFFF',
            boxShadow: '0 0 4px rgba(0,0,0,0.15)',
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
}

