import React from 'react';
import { RoleGuard } from '@/components/role-guard';

export default function WorkerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard
      allowedRole="WORKER"
      loginRoute="/worker/login"
      roleLabel="Worker"
      accentColor="amber"
    >
      {children}
    </RoleGuard>
  );
}
