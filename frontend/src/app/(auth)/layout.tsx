import React from 'react';
import { GuestGuard } from '@/components/guest-guard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestGuard>{children}</GuestGuard>;
}
