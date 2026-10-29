import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import AccountsDashboard from './components/pages/AccountsDashboard';
import EmployeeDashboard from './components/pages/EmployeeDashboard';
import PayrollDashboard from './components/pages/PayrollDashboard';
import AttendanceDashboard from './components/pages/AttendanceDashboard';
import StockCircleDashboard from './components/pages/StockCircleDashboard';
import ChecklistDashboard from './components/pages/ChecklistDashboard';
import EmployeesPage from './components/pages/EmployeesPage';
import TasksPage from './components/pages/TasksPage';
import PriceCheckerPage from './components/pages/PriceCheckerPage';
import TransportPage from './components/pages/TransportPage';
import SettingsPage from './components/pages/SettingsPage';
import GenericWorkflowPage from './components/pages/GenericWorkflowPage';
import LoginPage from './components/pages/LoginPage';
import Modal from './components/common/Modal';
import Toast from './components/common/Toast';
import SearchModal from './components/common/SearchModal';
import A1MartIllustrativePreloader from './components/common/A1MartIllustrativePreloader';
import { DashboardSkeleton, PageSkeleton, TableSkeleton } from './components/common/skeletons';
import { useApp } from './context/AppContext';

export default function App() {
  const { currentPage, isFullscreen, isAuthenticated, isPageLoading } = useApp();
  const [initialPreloaderDone, setInitialPreloaderDone] = useState(false);

  // Function to render active page or appropriate skeleton during page transition
  const renderPageContent = () => {
    if (isPageLoading) {
      if (currentPage === 'accounts-dashboard') {
        return <DashboardSkeleton />;
      }
      if (currentPage === 'tasks' || currentPage === 'my-tasks') {
        return <TableSkeleton rows={6} cols={5} title="Loading Tasks..." />;
      }
      return <PageSkeleton title={`Loading ${currentPage}...`} />;
    }

    switch (currentPage) {
      case 'accounts-dashboard':
        return <div className="page-transition-enter"><AccountsDashboard /></div>;
      case 'employee-dashboard':
        return <div className="page-transition-enter"><EmployeeDashboard /></div>;
      case 'master-employees':
        return <div className="page-transition-enter"><EmployeesPage /></div>;
      case 'stock-circle-dashboard':
        return <div className="page-transition-enter"><StockCircleDashboard /></div>;
      case 'checklist-dashboard':
        return <div className="page-transition-enter"><ChecklistDashboard /></div>;
      case 'payroll-dashboard':
        return <div className="page-transition-enter"><PayrollDashboard /></div>;
      case 'attendance-dashboard':
        return <div className="page-transition-enter"><AttendanceDashboard /></div>;
      case 'tasks':
        return <div className="page-transition-enter"><TasksPage /></div>;
      case 'my-tasks':
        return <div className="page-transition-enter"><TasksPage myTasksOnly={true} /></div>;
      case 'price-checker':
        return <div className="page-transition-enter"><PriceCheckerPage /></div>;
      case 'transport':
        return <div className="page-transition-enter"><TransportPage /></div>;
      case 'settings':
      case 'store-settings':
        return <div className="page-transition-enter"><SettingsPage /></div>;
      default:
        return <div className="page-transition-enter"><GenericWorkflowPage pageId={currentPage} /></div>;
    }
  };

  return (
    <>
      {/* Branded Illustrative Preloader (Initial Startup Only) */}
      {!initialPreloaderDone && (
        <A1MartIllustrativePreloader
          minDuration={3000}
          onComplete={() => setInitialPreloaderDone(true)}
        />
      )}

      {currentPage === 'login' || !isAuthenticated ? (
        <div className="login-screen-root">
          <LoginPage />
          <Toast />
        </div>
      ) : (
        <div className={`app-frame ${isFullscreen ? 'is-fullscreen' : ''}`}>
          {/* Left Sidebar (Rail / Expandable Navigation) */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="main-content">
            <Topbar />
            {renderPageContent()}
          </main>

          {/* System Overlays */}
          <Modal />
          <SearchModal />
          <Toast />
        </div>
      )}
    </>
  );
}
