import React from 'react';
import { RoleGuard } from '@/components/role-guard';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard
      allowedRole="SUPER_ADMIN"
      loginRoute="/admin/login"
      roleLabel="Super Admin"
      accentColor="purple"
    >
      {children}
    </RoleGuard>
  );
}
