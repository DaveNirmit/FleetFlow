import React from 'react';
import { VehicleStatus, DriverStatus, TripStatus } from '@/types';

type StatusType = VehicleStatus | DriverStatus | TripStatus;

const statusClasses: Record<string, string> = {
  Available: 'status-available',
  OnTrip: 'status-ontrip',
  InShop: 'status-inshop',
  Retired: 'status-retired',
  OnDuty: 'status-onduty',
  OffDuty: 'status-offduty',
  Suspended: 'status-suspended',
  Draft: 'status-draft',
  Dispatched: 'status-dispatched',
  Completed: 'status-completed',
  Cancelled: 'status-cancelled',
};

export const StatusPill = ({ status }: { status: StatusType }) => (
  <span className={`status-pill ${statusClasses[status] || 'status-draft'}`}>
    {status}
  </span>
);
