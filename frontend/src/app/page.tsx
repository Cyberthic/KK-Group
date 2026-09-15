'use client';

import React, { useState } from 'react';
import { HomeNavbar } from '@/components/Common/HomeNavbar';
import { Footer } from '@/components/Common/Footer';
import { EnterprisePortalsModal } from '@/components/Common/EnterprisePortalsModal';
import { HeroSection } from '@/components/Home/HeroSection';
import { CallOrChatStrip } from '@/components/Home/CallOrChatStrip';
import { AboutSection } from '@/components/Home/AboutSection';
import { TeamRolesStrip } from '@/components/Home/TeamRolesStrip';
import { TestimonialsSection } from '@/components/Home/TestimonialsSection';
import { BlogSection } from '@/components/Home/BlogSection';
import { EmergencyBanner } from '@/components/Home/EmergencyBanner';

export default function HeroLandingPage() {
  const [showPortalModal, setShowPortalModal] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Fixed Floating Navbar */}
      <HomeNavbar setShowPortalModal={setShowPortalModal} />
      
      <main>
        <HeroSection />
        <CallOrChatStrip />
        <AboutSection />
        <TeamRolesStrip />
        <TestimonialsSection />
        <BlogSection />
        <EmergencyBanner />
      </main>

      <Footer />

      {/* Enterprise Role Portals Modal */}
      {showPortalModal && (
        <EnterprisePortalsModal setShowPortalModal={setShowPortalModal} />
      )}
    </div>
  );
}
