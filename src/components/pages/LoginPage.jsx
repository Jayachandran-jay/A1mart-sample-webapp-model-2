import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LoginPage() {
  const { loginWithCredentials, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const loginUser = email.trim() || 'vijay.elumalai@a1mart.com';
    loginWithCredentials(loginUser);
  };

  const handleSocialClick = (provider) => {
    showToast(`${provider} Single Sign-On authenticated for A1-MART Enterprise.`);
    setTimeout(() => {
      loginWithCredentials('vijay.elumalai@a1mart.com');
    }, 400);
  };

  return (
    <div className="login-page-canvas">
      <div className="login-split-card">
        {/* ============================================================
            LEFT COLUMN — 3D ASSISTANT BOY & A1-MART SHOPPING ARTWORK
            ============================================================ */}
        <div className="login-artwork-column">
          <div className="login-artwork-wrapper">
            <img
              src="/login_character_scene.png"
              alt="A1-MART 3D Assistant with Laptop, Orders, and Complete Character"
              className="login-character-scene-img"
            />
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN — LOGIN CARD (Exact UI from Screenshot)
            ============================================================ */}
        <div className="login-form-card">
          {/* Top Brand Logo Banner */}
          <div className="login-brand-header">
            <img
              src="/a1mart_logo.png"
              alt="A1-MART Daily Savings Daily Discount"
              className="login-brand-logo-img"
            />
          </div>

          {/* Heading & Subtitle */}
          <h1 className="login-main-title">Welcome Back</h1>
          <p className="login-subtitle">Login to your account to continue</p>

          {/* Interactive Login Form */}
          <form onSubmit={handleSubmit} className="login-input-form" noValidate>
            {/* Email Address */}
            <div className="login-field-wrap">
              <div className="login-field-icon">
                <Mail size={17} color="#9CA3AF" />
              </div>
              <input
                type="email"
                className="login-text-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="login-field-wrap">
              <div className="login-field-icon">
                <Lock size={17} color="#9CA3AF" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-text-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(prev => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <Eye size={17} color="#9CA3AF" /> : <EyeOff size={17} color="#9CA3AF" />}
              </button>
            </div>

            {/* Options Row: Remember Me & Forgot Password */}
            <div className="login-options-row">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-custom-checkbox"
                />
                <span className="checkbox-custom-mark">
                  {rememberMe && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
                </span>
                <span className="checkbox-text">Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password-link"
                onClick={() => showToast('Password reset link sent to demo administrator email.')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Login Button (Vivid Blue) */}
            <button type="submit" className="login-submit-btn">
              <span>Login</span>
              <ArrowRight size={17} strokeWidth={2.4} />
            </button>
          </form>

          {/* OR Divider */}
          <div className="login-or-divider">
            <span className="divider-line" />
            <span className="divider-text">OR</span>
            <span className="divider-line" />
          </div>

          {/* Social SSO Options (Google, Apple, Microsoft) */}
          <div className="login-social-row">
            {/* Google */}
            <button
              type="button"
              className="social-auth-btn"
              onClick={() => handleSocialClick('Google')}
              title="Sign in with Google"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              className="social-auth-btn"
              onClick={() => handleSocialClick('Apple ID')}
              title="Sign in with Apple"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24z" />
              </svg>
            </button>

            {/* Microsoft */}
            <button
              type="button"
              className="social-auth-btn"
              onClick={() => handleSocialClick('Microsoft Azure')}
              title="Sign in with Microsoft"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
              </svg>
            </button>
          </div>

          {/* Footer Sign Up Link */}
          <div className="login-footer-text">
            <span>Don't have an account? </span>
            <button
              type="button"
              className="signup-inline-link"
              onClick={() => showToast('Sign up request received. Managed by HR & IT Administrator.')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}