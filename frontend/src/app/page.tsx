'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import {
  Shield,
  User,
  HardHat,
  Briefcase,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  MailCheck,
  Lock,
  Users,
} from 'lucide-react';

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  const portals = [
    {
      title: 'Customer Portal',
      role: 'CUSTOMER',
      badge: 'Public Access',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: User,
      iconBg: 'from-emerald-500 to-teal-600',
      description:
        'Customers register with Email & Password and confirm their account using a 6-digit email OTP verification code.',
      features: [
        'Self-registration with Email & Password',
        'Secure 6-digit Email OTP confirmation',
        'Customer self-service dashboard',
      ],
      primaryAction: {
        label: 'Customer Sign In',
        href: '/login',
      },
      secondaryAction: {
        label: 'Create Account',
        href: '/register',
      },
    },
    {
      title: 'Worker Portal',
      role: 'WORKER',
      badge: 'Assigned Staff',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      icon: HardHat,
      iconBg: 'from-amber-500 to-orange-600',
      description:
        'Dedicated worker operations portal. Workers login strictly with Username & Password assigned directly by Super Admin.',
      features: [
        'Created by Super Admin (No email required)',
        'Sign in with Username & Password',
        'Dedicated Worker dashboard & shift tasks',
      ],
      primaryAction: {
        label: 'Worker Sign In',
        href: '/worker/login',
      },
      secondaryAction: null,
    },
    {
      title: 'Office Staff Portal',
      role: 'OFFICE_STAFF',
      badge: 'Administrative Desk',
      badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      icon: Briefcase,
      iconBg: 'from-sky-500 to-blue-600',
      description:
        'Dedicated office desk portal. Staff members sign in using their unique Username & Password created by Super Admin.',
      features: [
        'Created by Super Admin (No email required)',
        'Sign in with Username & Password',
        'Desk management & customer records',
      ],
      primaryAction: {
        label: 'Office Staff Sign In',
        href: '/office-staff/login',
      },
      secondaryAction: null,
    },
    {
      title: 'Super Admin Portal',
      role: 'SUPER_ADMIN',
      badge: 'Seeded Master Access',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      icon: KeyRound,
      iconBg: 'from-purple-600 to-indigo-600',
      description:
        'Master administrative control. Super Admin accounts are seeded directly in the database and can create Workers & Office Staff.',
      features: [
        'Seeded role with administrative privileges',
        'Create Workers & Office Staff with username/pwd',
        'Full staff directory & access governance',
      ],
      primaryAction: {
        label: 'Admin Control Center',
        href: '/admin/login',
      },
      secondaryAction: null,
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero Header */}
      <div className="max-w-4xl text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-6">
          <Shield className="w-3.5 h-3.5" />
          <span>Enterprise Multi-Role Authentication</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
          Secure, Role-Segregated <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Portal Ecosystem
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Integrated backend & frontend architecture supporting 4 distinct user
          classes with specialized authentication channels, OTP email verification, and staff provisioning.
        </p>

        {isAuthenticated && user && (
          <div className="mt-8 inline-flex items-center gap-3 p-2 pr-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ml-2" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Active Session: <strong className="font-semibold text-zinc-900 dark:text-white">{user.username || user.email}</strong> ({user.role})
            </span>
            <Link
              href={
                user.role === 'SUPER_ADMIN'
                  ? '/admin/dashboard'
                  : user.role === 'WORKER'
                  ? '/worker/dashboard'
                  : user.role === 'OFFICE_STAFF'
                  ? '/office-staff/dashboard'
                  : '/customer/dashboard'
              }
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-2"
            >
              Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* 4 Role Portals Grid */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portals.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.role}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm group"
            >
              <div>
                {/* Header with Icon & Role Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${portal.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${portal.badgeColor}`}
                  >
                    {portal.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {portal.title}
                </h3>

                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[48px]">
                  {portal.description}
                </p>

                {/* Key specs */}
                <div className="mt-5 space-y-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
                  {portal.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <Link
                  href={portal.primaryAction.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
                >
                  <span>{portal.primaryAction.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {portal.secondaryAction && (
                  <Link
                    href={portal.secondaryAction.href}
                    className="w-full inline-flex items-center justify-center py-2 px-4 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800"
                  >
                    {portal.secondaryAction.label}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Architectural Notice */}
      <div className="max-w-4xl w-full mt-16 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs text-zinc-500 dark:text-zinc-400">
          <strong className="text-zinc-800 dark:text-zinc-200 block text-sm font-semibold mb-0.5">
            Strict Portal Guard Enforcement
          </strong>
          Workers and Office Staff are isolated to their dedicated login channels. Cross-role authentication attempts are automatically blocked with role-guard exceptions.
        </div>
      </div>
    </div>
  );
}
