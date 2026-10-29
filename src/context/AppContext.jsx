import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskData, searchPages } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('page') === 'login') {
        return 'login';
      }
      const pageParam = urlParams.get('page');
      if (pageParam) return pageParam;
      const stored = sessionStorage.getItem('a1mart_current_page');
      if (stored) return stored;
    }
    return 'checklist-dashboard';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('theme') === 'dark') return true;
      if (urlParams.get('theme') === 'light') return false;
      const saved = localStorage.getItem('a1mart_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isFullscreen, setIsFullscreen] = useState(() => {
    return typeof window !== 'undefined' && (
      window.location.search.includes('fullscreen=true') ||
      window.location.search.includes('layout=fullscreen')
    );
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('page') === 'login' || urlParams.has('login')) return false;
      return true;
    }
    return true;
  });

  // Simulated Page Transition Skeleton Loading State (Customer Demo)
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [tasks, setTasks] = useState(taskData);
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // { type, title, data }
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Stock level low in A1MART-SARON: Rice 5kg (12 units left)', time: '10m ago' },
    { id: 2, text: 'Purchase Order #162 approved by Admin', time: '1h ago' },
    { id: 3, text: 'October Payroll batch calculated for 152 employees', time: '2h ago' }
  ]);

  const user = {
    name: 'Vijay Elumalai',
    role: 'IT & Software Manager',
    branch: 'A1-MART Corporate Office',
    email: 'vijay.elumalai@a1mart.com',
    avatar: '/vijay_elumalai.png',
    status: 'online'
  };

  const loginWithCredentials = (email = 'vijay.elumalai@a1mart.com') => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('a1mart_session_auth', 'true');
    }
    setCurrentPage('accounts-dashboard');
    showToast('Welcome back, Vijay Elumalai! Redirecting to Accounts Dashboard...');
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('a1mart_session_auth');
      localStorage.removeItem('a1mart_auth');
    }
    setCurrentPage('login');
    showToast('Logged out of session. Please log in to continue.');
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Centralized light/dark theme synchronization & persistence
  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('a1mart_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, [darkMode]);

  // Framed demo mode effect (only if ?framed=true is explicitly in URL)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.search.includes('framed=true') || window.location.search.includes('demo=framed'))) {
      document.body.classList.add('framed-mode');
    } else {
      document.body.classList.remove('framed-mode');
    }
  }, []);

  // Browser fullscreen sync
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const navigate = (pageId) => {
    if (pageId === currentPage) return;
    setIsPageLoading(true);
    setCurrentPage(pageId);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('a1mart_current_page', pageId);
      window.history.replaceState(null, '', `?page=${pageId}`);
    }
    setIsMobileSidebarOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Restrained simulated transition delay for customer demo (280ms)
    setTimeout(() => {
      setIsPageLoading(false);
    }, 280);
  };

  const triggerDemoReload = (duration = 350) => {
    setIsPageLoading(true);
    setTimeout(() => {
      setIsPageLoading(false);
    }, duration);
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const openModal = (type, title, data = null) => {
    setActiveModal({ type, title, data });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Task CRUD
  const addTask = (newTask) => {
    const id = Math.max(0, ...tasks.map(t => Number(t.id) || 0)) + 1;
    const taskItem = {
      id,
      title: newTask.title,
      status: newTask.status || 'Open',
      priority: newTask.priority || 'Medium',
      assignedTo: newTask.assignedTo || user.name,
      createdBy: user.name,
      createdAt: new Date().toLocaleDateString('en-GB'),
      description: newTask.description || ''
    };
    setTasks(prev => [taskItem, ...prev]);
    showToast('Task created successfully!', 'success');
    closeModal();
  };

  const updateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
    showToast('Task updated successfully!', 'success');
    closeModal();
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast('Task deleted successfully.', 'success');
    closeModal();
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigate,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isSearchOpen,
        setIsSearchOpen,
        darkMode,
        setDarkMode,
        isFullscreen,
        setIsFullscreen,
        toggleFullscreen,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toasts,
        showToast,
        activeModal,
        openModal,
        closeModal,
        user,
        notifications,
        searchPages,
        isAuthenticated,
        setIsAuthenticated,
        loginWithCredentials,
        logout,
        isPageLoading,
        setIsPageLoading,
        triggerDemoReload
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

