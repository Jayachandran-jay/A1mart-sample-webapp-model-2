import React from 'react';
import { Truck, Plus, Download, Navigation, ShieldCheck } from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { transportData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function TransportPage() {
  const { openModal, showToast } = useApp();

  const columns = [
    { header: 'Vehicle Number', accessor: 'vehicle' },
    { header: 'Assigned Driver', accessor: 'driver' },
    { header: 'Transit Route', accessor: 'route' },
    { header: 'Scheduled Date', accessor: 'date' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="content-wrapper">
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="page-breadcrumb">
            <span>A1-MART</span> / <span className="active-crumb">Transport Management</span>
          </div>
          <h1 className="page-main-heading">Logistics & Fleet Transport</h1>
          <p className="page-subheading">
            Inter-branch transport dispatches, warehouse fulfillment trucks, and route monitoring
          </p>
        </div>

        <div className="header-action-group">
          <button
            className="btn-secondary btn-pill-sm"
            onClick={() => showToast('Fleet schedule downloaded.')}
          >
            <Download size={14} /> Export Schedule
          </button>
          <button
            className="btn-primary btn-pill-sm"
            onClick={() => openModal('prototypeAction', 'Schedule New Transport Dispatch', {
              message: 'Assign vehicle number, driver, source warehouse, destination store, and bill of lading.'
            })}
          >
            <Plus size={14} /> Add Route Dispatch
          </button>
        </div>
      </div>

      <div className="stat-cards-grid">
        <StatCard
          label="Total Fleet Vehicles"
          value="8"
          trend="Active"
          isPositive={true}
          icon={Truck}
        />
        <StatCard
          label="Active In Transit"
          value="2"
          trend="On Route"
          isPositive={true}
          icon={Navigation}
        />
        <StatCard
          label="Deliveries Completed"
          value="14"
          trend="Today"
          isPositive={true}
          icon={ShieldCheck}
        />
        <StatCard
          label="Fleet On-Time Rate"
          value="98.5%"
          trend="+1.2%"
          isPositive={true}
          icon={Truck}
        />
      </div>

      <div>
        <h3 className="card-main-title" style={{ marginBottom: '14px' }}>
          Inter-Branch Transport Manifests
        </h3>
        <DataTable
          columns={columns}
          data={transportData}
          pageSize={10}
          searchPlaceholder="Search vehicle, driver or route..."
          title="Transport Manifest"
        />
      </div>
    </div>
  );
}

