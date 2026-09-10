import React from 'react';
import { RoleGuard } from '@/components/role-guard';

export default function OfficeStaffDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard
      allowedRole="OFFICE_STAFF"
      loginRoute="/office-staff/login"
      roleLabel="Office Staff"
      accentColor="emerald"
    >
      {children}
    </RoleGuard>
  );
}
