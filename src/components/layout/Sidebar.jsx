import React, { useState } from 'react';
import {
  LayoutDashboard, Database, CheckSquare, TrendingUp, Target,
  ClipboardCheck, Boxes, FileText, CheckCircle2, Award,
  Activity, CreditCard, Wallet, Undo2, PackageCheck, Truck,
  ChevronDown, ChevronRight, ArrowRight, ShoppingBag, Folder, Menu, Crown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { navigationGroups } from '../../data/navigation';

const iconMap = {
  LayoutDashboard, Database, CheckSquare, TrendingUp, Target,
  ClipboardCheck, Boxes, FileText, CheckCircle2, Award,
  Activity, CreditCard, Wallet, Undo2, PackageCheck, Truck,
  Folder
};

export default function Sidebar() {
  const { currentPage, navigate, openModal, showToast } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('a1mart_sidebar_pinned');
      if (stored !== null) return stored === 'true';
      return window.innerWidth >= 1024;
    }
    return true;
  });

  // Expanded if hovered or pinned
  const isExpanded = isHovered || isPinned;

  // Track expanded groups (Dashboard & Master Data open by default)
  const [openGroups, setOpenGroups] = useState({
    'Dashboard': true,
    'Master Data': true
  });

  const toggleGroup = (title) => {
    setOpenGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isCurrentInGroup = (group) => {
    return group.items.some(item => item.id === currentPage);
  };

  const handleTogglePin = () => {
    setIsPinned(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('a1mart_sidebar_pinned', String(next));
      }
      showToast(next ? 'Sidebar pinned open' : 'Sidebar unpinned (hover-rail mode active)');
      return next;
    });
  };

  return (
    <div
      className={`sidebar-wrapper ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${isPinned ? 'is-pinned' : 'is-rail'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <aside className={`sidebar ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}>
        <div className="sidebar-top">
          {/* Sidebar Navigation Header (Clean Navbar) */}
          <div className="sidebar-brand-row">
            {isExpanded ? (
              <div className="sidebar-header-brand-clean">
                <span className="sidebar-header-tag">MAIN MENU</span>
              </div>
            ) : (
              <div className="sidebar-rail-brand-clean" title="A1-MART Menu">
                <Menu size={20} strokeWidth={2.3} color="#6366F1" />
              </div>
            )}

            {isExpanded && (
              <button
                className="sidebar-collapse-btn"
                onClick={handleTogglePin}
                title={isPinned ? 'Unpin sidebar (auto-collapse to icons)' : 'Pin sidebar open'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isPinned ? '#6366F1' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
              </button>
            )}
          </div>

          {/* Navigation Categories */}
          <div className="nav-section-label">
            {isExpanded ? 'Operations & Modules' : <span className="nav-rail-divider" />}
          </div>

          <ul className="nav-list">
            {navigationGroups.map((group) => {
              const Icon = iconMap[group.icon] || Folder;
              const hasSub = group.items.length > 1;
              const isSingle = group.items.length === 1;
              const isOpen = openGroups[group.title] || isCurrentInGroup(group);
              const isSingleActive = isSingle && group.items[0].id === currentPage;
              const isGroupActive = isCurrentInGroup(group);

              if (isSingle) {
                const singleItem = group.items[0];
                return (
                  <li key={group.title}>
                    <button
                      className={`nav-link ${isSingleActive ? 'active' : ''} ${!isExpanded ? 'rail-icon-only' : ''}`}
                      onClick={() => navigate(singleItem.id)}
                      title={group.title}
                    >
                      <Icon size={18} strokeWidth={2} />
                      {isExpanded && <span>{group.title}</span>}
                    </button>
                  </li>
                );
              }

              return (
                <li key={group.title}>
                  <button
                    className={`nav-link ${isGroupActive && (!isOpen || !isExpanded) ? 'active' : ''} ${!isExpanded ? 'rail-icon-only' : ''}`}
                    onClick={() => {
                      if (!isExpanded) {
                        // In icon-only mode, click navigates directly to the primary module view
                        navigate(group.items[0].id);
                      } else {
                        toggleGroup(group.title);
                      }
                    }}
                    title={group.title}
                  >
                    <Icon size={18} strokeWidth={2} />
                    {isExpanded && (
                      <>
                        <span>{group.title}</span>
                        <div style={{ marginLeft: 'auto', display: 'flex' }}>
                          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </div>
                      </>
                    )}
                  </button>

                  {isExpanded && isOpen && (
                    <div className="nav-submenu-list">
                      {group.items.map((sub) => {
                        const isSubActive = sub.id === currentPage;
                        return (
                          <button
                            key={sub.id}
                            className={`nav-sub-btn ${isSubActive ? 'active' : ''}`}
                            onClick={() => navigate(sub.id)}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Upgrade Card */}
        <div className="sidebar-bottom">
          {isExpanded ? (
            <div className="sidebar-upgrade-card">
              <div className="upgrade-crown-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Crown size={20} color="#6366F1" fill="#6366F1" />
                </div>
              </div>

              <div className="upgrade-card-title">Upgrade to Pro</div>
              <div className="upgrade-card-sub">
                Unlock advanced features & more
              </div>

              <button
                className="upgrade-pill-btn"
                onClick={() => openModal('prototypeAction', 'Unlock Plan Upgrade', {
                  message: 'A1-MART Pro Enterprise activates real-time multi-branch sync, automated GRN tally, and biometric audit integration.'
                })}
              >
                <span>Upgrade now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="sidebar-rail-bottom-crown" title="Pro Upgrade Active">
              <Crown size={18} color="#6366F1" />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
