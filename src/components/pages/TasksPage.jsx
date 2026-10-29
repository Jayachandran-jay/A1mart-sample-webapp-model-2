import React, { useState } from 'react';
import { CheckSquare, Plus, Filter, Download } from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { useApp } from '../../context/AppContext';

export default function TasksPage({ myTasksOnly = false }) {
  const { tasks, openModal, showToast, user } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter tasks
  let displayTasks = myTasksOnly
    ? tasks.filter(t => (t.assignedTo || '').toLowerCase().includes('vijay'))
    : tasks;

  if (statusFilter !== 'All') {
    displayTasks = displayTasks.filter(t => t.status === statusFilter);
  }

  const openCount = tasks.filter(t => t.status === 'Open').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const doneCount = tasks.filter(t => t.status === 'Done').length;

  const columns = [
    { header: 'Task ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Status', accessor: 'status' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Assigned To', accessor: 'assignedTo' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Created Date', accessor: 'createdAt' }
  ];

  return (
    <div className="content-wrapper">
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-breadcrumb">
            <span>A1-MART</span> / <span className="active-crumb">{myTasksOnly ? 'My Tasks' : 'All Tasks'}</span>
          </div>
          <h1 className="page-main-heading">{myTasksOnly ? 'My Assigned Tasks' : 'Task Management System'}</h1>
          <p className="page-subheading">
            Store operations checklists, department action items, and audit delegations
          </p>
        </div>

        <div className="header-action-group">
          <button
            className="btn-secondary btn-pill-sm"
            onClick={() => showToast('Exporting active tasks list to CSV...')}
          >
            <Download size={14} /> Export
          </button>
          <button
            className="btn-primary btn-pill-sm"
            onClick={() => openModal('taskForm', 'Add New Task')}
          >
            <Plus size={14} /> Add Task
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-grid">
        <StatCard
          label="Total Tasks"
          value={tasks.length.toString()}
          trend="Total"
          isPositive={true}
          icon={CheckSquare}
        />
        <StatCard
          label="Open & Actionable"
          value={openCount.toString()}
          trend="Needs Action"
          isPositive={false}
          icon={CheckSquare}
        />
        <StatCard
          label="In Progress"
          value={inProgressCount.toString()}
          trend="Active"
          isPositive={true}
          icon={CheckSquare}
        />
        <StatCard
          label="Completed"
          value={doneCount.toString()}
          trend="Resolved"
          isPositive={true}
          icon={CheckSquare}
        />
      </div>

      {/* Toolbar filters */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter Status:</span>
        {['All', 'Open', 'In Progress', 'Done'].map((st) => (
          <button
            key={st}
            className={`btn-secondary btn-pill-sm ${statusFilter === st ? 'active' : ''}`}
            style={{
              background: statusFilter === st ? 'var(--primary)' : 'var(--bg-card)',
              color: statusFilter === st ? '#FFFFFF' : 'var(--text-primary)',
              borderColor: statusFilter === st ? 'var(--primary)' : 'var(--border-light)'
            }}
            onClick={() => setStatusFilter(st)}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Task DataTable */}
      <DataTable
        columns={columns}
        data={displayTasks}
        pageSize={10}
        searchPlaceholder="Search task title, assignee, or status..."
        title="Task"
        onRowAction={(row) => {
          openModal('recordDetails', `Task #${row.id}: ${row.title}`, {
            columns,
            row,
            isTask: true
          });
        }}
      />
    </div>
  );
}

