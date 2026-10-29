import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Smartphone,
  Users,
  LogOut,
  Power,
  Check,
  Copy,
  QrCode,
  X,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsPage() {
  const { user, logout, showToast } = useApp();

  // 2FA state: defaults to false (Disabled) as shown in the user's reference screenshot
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [copiedKey, setCopiedKey] = useState(false);

  const secretKey = 'A1M-AUTH-7729-SEC';

  const handleOpen2FA = () => {
    if (is2FAEnabled) {
      setIs2FAEnabled(false);
      showToast('Two-Factor Authentication (2FA) has been disabled.', 'info');
    } else {
      setShow2FAModal(true);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify2FA = (e) => {
    if (e) e.preventDefault();
    setIs2FAEnabled(true);
    setShow2FAModal(false);
    setOtpCode(['', '', '', '', '', '']);
    showToast('Two-Factor Authentication (2FA) activated successfully for your account!', 'success');
  };

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(secretKey);
    setCopiedKey(true);
    showToast('2FA Secret Key copied to clipboard!');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="settings-page-wrapper">
      {/* ============================================================
          PAGE HEADER (Title, Subtitle & Floating 3D Shield Illustration)
          ============================================================ */}
      <div className="settings-header-banner">
        <div className="settings-header-text">
          <div className="settings-breadcrumb">
            <span>A1-MART</span> / <span className="active-crumb">Settings</span>
          </div>
          <h1 className="settings-main-title">Settings</h1>
          <p className="settings-subheading">
            Manage your account preferences and security settings.
          </p>
        </div>

        {/* Top-Right Decorative Floating 3D Shield with Platform */}
        <div className="settings-header-artwork">
          <img
            src="/settings_header_shield.png"
            alt="Security & Account Protection"
            className="settings-header-shield-img"
          />
        </div>
      </div>

      {/* ============================================================
          CARD 1 — TWO-FACTOR AUTHENTICATION (2FA)
          ============================================================ */}
      <div className="settings-card settings-2fa-card">
        {/* Left Section: Information & 3 Feature Highlights */}
        <div className="settings-2fa-left">
          {/* Header Row: Purple Shield Icon Badge + Title + Status Pill */}
          <div className="settings-card-head-row">
            <div className="settings-icon-dish-square">
              <Shield size={24} color="#5B44F2" fill="#5B44F2" fillOpacity={0.15} />
            </div>

            <div className="settings-card-title-block">
              <div className="settings-card-title-row">
                <h2 className="settings-card-title">Two-Factor Authentication (2FA)</h2>
                {is2FAEnabled ? (
                  <span className="status-pill status-pill-enabled">
                    <span className="status-dot-green" />
                    Enabled
                  </span>
                ) : (
                  <span className="status-pill status-pill-disabled">
                    <span className="status-dot-red" />
                    Disabled
                  </span>
                )}
              </div>

              <p className="settings-card-desc">
                Add an extra layer of security to your account by requiring a code from your
                authenticator app when logging in.
              </p>
            </div>
          </div>

          {/* Feature Highlights: 3 Benefit Columns */}
          <div className="settings-features-grid">
            {/* Feature 1: Stronger security */}
            <div className="settings-feature-item">
              <div className="feature-icon-circle">
                <Lock size={17} color="#5B44F2" />
              </div>
              <div className="feature-text-wrap">
                <h4 className="feature-title">Stronger security</h4>
                <p className="feature-subtitle">
                  Protect your account from unauthorized access
                </p>
              </div>
            </div>

            {/* Feature 2: Easy setup */}
            <div className="settings-feature-item">
              <div className="feature-icon-circle">
                <Smartphone size={17} color="#5B44F2" />
              </div>
              <div className="feature-text-wrap">
                <h4 className="feature-title">Easy setup</h4>
                <p className="feature-subtitle">
                  Use any authenticator app (Google Authenticator, Authy, etc.)
                </p>
              </div>
            </div>

            {/* Feature 3: Keep your data safe */}
            <div className="settings-feature-item">
              <div className="feature-icon-circle">
                <Users size={17} color="#5B44F2" />
              </div>
              <div className="feature-text-wrap">
                <h4 className="feature-title">Keep your data safe</h4>
                <p className="feature-subtitle">
                  Your information stays private and secure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Phone Authenticator Illustration & Enable Button */}
        <div className="settings-2fa-right">
          <div className="settings-phone-illustration-box">
            <img
              src="/settings_2fa_phone_illustration.png"
              alt="2FA Mobile Authenticator Illustration"
              className="settings-phone-illustration-img"
            />
          </div>

          <button
            type="button"
            className={`btn-2fa-toggle ${is2FAEnabled ? 'is-enabled' : 'is-disabled'}`}
            onClick={handleOpen2FA}
          >
            {is2FAEnabled ? (
              <>
                <Check size={18} strokeWidth={2.4} />
                <span>Disable 2FA</span>
              </>
            ) : (
              <>
                <Shield size={18} strokeWidth={2.2} />
                <span>Enable 2FA</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ============================================================
          CARD 2 — LOGOUT
          ============================================================ */}
      <div className="settings-card settings-logout-card">
        <div className="settings-logout-left">
          <div className="settings-icon-dish-square">
            <LogOut size={22} color="#5B44F2" />
          </div>

          <div className="settings-logout-text">
            <h2 className="settings-card-title">Logout</h2>
            <p className="settings-card-desc">
              Sign out of your account. You will need to log in again to access the system.
            </p>
          </div>
        </div>

        <div className="settings-logout-right">
          <button
            type="button"
            className="btn-settings-logout"
            onClick={logout}
            title="Sign out of A1-MART ERP"
          >
            <Power size={17} strokeWidth={2.4} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* ============================================================
          INTERACTIVE 2FA ACTIVATION MODAL (Enterprise Authenticator)
          ============================================================ */}
      {show2FAModal && (
        <div className="settings-modal-backdrop" onClick={() => setShow2FAModal(false)}>
          <div className="settings-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-group">
                <h3 className="modal-title">Enable Two-Factor Authentication</h3>
                <p className="modal-subtitle">Scan the QR code with Google Authenticator or Authy</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShow2FAModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* QR Code Container */}
              <div className="modal-qr-container">
                <div className="modal-qr-box">
                  {/* High Quality SVG Authenticator QR Code */}
                  <svg width="140" height="140" viewBox="0 0 100 100" className="qr-svg-graphic">
                    <rect width="100" height="100" fill="#FFFFFF" rx="8" />
                    {/* Top-left marker */}
                    <rect x="8" y="8" width="28" height="28" fill="#5B44F2" rx="4" />
                    <rect x="14" y="14" width="16" height="16" fill="#FFFFFF" rx="2" />
                    <rect x="18" y="18" width="8" height="8" fill="#5B44F2" rx="1" />
                    {/* Top-right marker */}
                    <rect x="64" y="8" width="28" height="28" fill="#5B44F2" rx="4" />
                    <rect x="70" y="14" width="16" height="16" fill="#FFFFFF" rx="2" />
                    <rect x="74" y="18" width="8" height="8" fill="#5B44F2" rx="1" />
                    {/* Bottom-left marker */}
                    <rect x="8" y="64" width="28" height="28" fill="#5B44F2" rx="4" />
                    <rect x="14" y="70" width="16" height="16" fill="#FFFFFF" rx="2" />
                    <rect x="18" y="74" width="8" height="8" fill="#5B44F2" rx="1" />
                    {/* Data dots */}
                    <rect x="42" y="12" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="52" y="12" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="42" y="22" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="52" y="28" width="6" height="6" fill="#5B44F2" rx="1" />
                    <rect x="42" y="38" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="12" y="44" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="22" y="44" width="6" height="6" fill="#5B44F2" rx="1" />
                    <rect x="32" y="44" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="42" y="48" width="6" height="6" fill="#5B44F2" rx="1" />
                    <rect x="52" y="44" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="64" y="44" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="74" y="44" width="6" height="6" fill="#5B44F2" rx="1" />
                    <rect x="84" y="44" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="42" y="64" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="52" y="64" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="64" y="54" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="74" y="64" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="84" y="64" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="42" y="76" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="52" y="84" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="64" y="76" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="74" y="84" width="6" height="6" fill="#1F2937" rx="1" />
                    <rect x="84" y="76" width="6" height="6" fill="#1F2937" rx="1" />
                  </svg>
                </div>

                <div className="modal-secret-box">
                  <span className="modal-secret-label">Can't scan the QR? Enter manually:</span>
                  <div className="secret-code-pill">
                    <code>{secretKey}</code>
                    <button
                      type="button"
                      className="btn-copy-secret"
                      onClick={handleCopyKey}
                      title="Copy Secret Key"
                    >
                      {copiedKey ? <Check size={14} color="#10B981" /> : <Copy size={14} color="#5B44F2" />}
                      <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 6-Digit OTP Input Row */}
              <div className="otp-verification-section">
                <label className="otp-input-label">Enter 6-digit code from your app:</label>
                <div className="otp-inputs-row">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="otp-digit-box"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer-row">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setShow2FAModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-confirm"
                onClick={handleVerify2FA}
              >
                <Check size={16} strokeWidth={2.4} />
                <span>Verify & Activate 2FA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
