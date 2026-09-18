'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PersonDetailView } from '@/components/Admin/person-detail-view';

export default function OfficeStaffDetailPage() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username || '');

  return (
    <PersonDetailView
      username={username}
      expectedRole="OFFICE_STAFF"
      backHref="/admin/people/office-staff"
      categoryLabel="Office Staff"
    />
  );
}
