import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Trash2, Edit3, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EmployeeAvatar from './EmployeeAvatar';

export default function Modal() {
  const { activeModal, closeModal, addTask, updateTask, deleteTask } = useApp();

  if (!activeModal) return null;

  const { type, title, data } = activeModal;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="icon-action-btn" onClick={closeModal} title="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {type === 'recordDetails' && (
            <RecordDetailsView data={data} />
          )}

          {type === 'taskForm' && (
            <TaskFormView
              task={data?.task}
              onSubmit={(formData) => {
                if (data?.task?.id) {
                  updateTask(data.task.id, formData);
                } else {
                  addTask(formData);
                }
              }}
              onClose={closeModal}
            />
          )}

          {type === 'prototypeAction' && (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--primary-subtle)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle size={28} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Action Ready for Integration</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {data?.message || 'This retail workflow is active in the interface. Connect your company API endpoint to submit live records.'}
              </p>
            </div>
          )}
        </div>

        {type === 'recordDetails' && (
          <div className="modal-footer">
            <button className="btn-secondary" onClick={closeModal}>
              Close
            </button>
            {data?.isTask && (
              <>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    closeModal();
                    openModal('taskForm', 'Edit Task', { task: data.row });
                  }}
                >
                  <Edit3 size={15} /> Edit
                </button>
                <button
                  className="btn-primary"
                  style={{ background: 'var(--danger)' }}
                  onClick={() => deleteTask(data.row.id)}
                >
                  <Trash2 size={15} /> Delete
                </button>
              </>
            )}
          </div>
        )}

        {type === 'prototypeAction' && (
          <div className="modal-footer">
            <button className="btn-primary" onClick={closeModal}>
              Understood
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RecordDetailsView({ data }) {
  if (!data || !data.row) return <p>No data available.</p>;
  const { columns, row } = data;

  const empId = data?.avatarEmpId || (row?.id && String(row.id).startsWith('A1-') ? row.id : null);
  const empName = data?.avatarEmpName || row?.name || row?.employee;
  const isPersonnel = Boolean(empId || (empName && (row?.designation || row?.branch || row?.basic || (typeof data?.title === 'string' && data.title.toLowerCase().includes('employee')))));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {isPersonnel && empName && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'linear-gradient(135deg, rgba(121, 80, 242, 0.08) 0%, rgba(246, 245, 250, 0.5) 100%)',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)'
          }}
        >
          <EmployeeAvatar
            empId={empId}
            name={empName}
            size={64}
            shape="rounded"
            showStatus={true}
          />
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              {empName}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '12px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              {empId && (
                <span className="status-badge" style={{ background: 'var(--primary-subtle)', color: 'var(--primary)', fontWeight: 600 }}>
                  {empId}
                </span>
              )}
              {row?.designation && <span style={{ fontWeight: 600 }}>{row.designation}</span>}
              {row?.branch && <span>• {row.branch}</span>}
              {row?.status && <span className="status-badge active">{row.status}</span>}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
          background: 'var(--bg-main)',
          padding: '16px',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {Array.isArray(row)
          ? columns.map((col, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {typeof col === 'string' ? col : col.header}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {row[idx] || '—'}
                </span>
              </div>
            ))
          : Object.entries(row).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {k.replace(/([A-Z])/g, ' $1')}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {String(v ?? '—')}
                </span>
              </div>
            ))}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
        A1-MART Enterprise ERP record status is active.
      </p>
    </div>
  );
}

function TaskFormView({ task, onSubmit, onClose }) {
  const [title, setTitle] = useState(task?.title || '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || 'VIJAY ELUMALAI');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, priority, assignedTo, description });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="form-group">
        <label>Task Title *</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Stock audit for FMCG category"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-row-2">
        <div className="form-group">
          <label>Priority</label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assign To</label>
          <select
            className="form-select"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option>VIJAY ELUMALAI</option>
            <option>RAMKUMAR M</option>
            <option>BALU SRIDHAR</option>
            <option>MUGILAN S</option>
            <option>RANJITHA S</option>
            <option>B.SATHYA</option>
            <option>MOGESH</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-textarea"
          rows="3"
          placeholder="Enter detailed instructions for this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {task?.id ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}

