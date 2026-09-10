import React from 'react';
import { RoleGuard } from '@/components/role-guard';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard
      allowedRole="CUSTOMER"
      loginRoute="/login"
      roleLabel="Customer"
      accentColor="indigo"
    >
      {children}
    </RoleGuard>
  );
}
