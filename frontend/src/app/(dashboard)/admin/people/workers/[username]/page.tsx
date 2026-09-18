'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PersonDetailView } from '@/components/Admin/person-detail-view';

export default function WorkerDetailPage() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username || '');

  return (
    <PersonDetailView
      username={username}
      expectedRole="WORKER"
      backHref="/admin/people/workers"
      categoryLabel="Workers"
    />
  );
}
