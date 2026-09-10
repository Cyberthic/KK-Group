import React from 'react';
import { UserRole } from '../lib/api';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
}

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5',
  };

  const roleConfigs: Record<
    UserRole,
    { label: string; bg: string; text: string; border: string; dot: string }
  > = {
    CUSTOMER: {
      label: 'Customer',
      bg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/20',
      dot: 'bg-emerald-500',
    },
    SUPER_ADMIN: {
      label: 'Super Admin',
      bg: 'bg-purple-500/10 dark:bg-purple-400/10',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/20',
      dot: 'bg-purple-500',
    },
    WORKER: {
      label: 'Worker',
      bg: 'bg-amber-500/10 dark:bg-amber-400/10',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/20',
      dot: 'bg-amber-500',
    },
    OFFICE_STAFF: {
      label: 'Office Staff',
      bg: 'bg-sky-500/10 dark:bg-sky-400/10',
      text: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/20',
      dot: 'bg-sky-500',
    },
  };

  const config = roleConfigs[role] || {
    label: role,
    bg: 'bg-zinc-500/10',
    text: 'text-zinc-700 dark:text-zinc-300',
    border: 'border-zinc-500/20',
    dot: 'bg-zinc-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
