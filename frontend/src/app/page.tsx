'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/Home/TopBar';
import { HeroSection } from '@/components/Home/HeroSection';
import { ServicesCarousel } from '@/components/Home/ServicesCarousel';
import { UnmatchedQualitySection } from '@/components/Home/UnmatchedQualitySection';
import { PopularServicesSection } from '@/components/Home/PopularServicesSection';
import { BranchesSection } from '@/components/Home/BranchesSection';
import { ContactSplitSection } from '@/components/Home/ContactSplitSection';
import { Footer } from '@/components/Common/Footer';
import { EnterprisePortalsModal } from '@/components/Common/EnterprisePortalsModal';
import { EnquiryModal } from '@/components/Home/EnquiryModal';

export default function HomePage() {
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [modalService, setModalService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#07190f] text-white font-sans antialiased selection:bg-[#00c576] selection:text-[#07190f] overflow-x-hidden">
      
      {/* Floating Pill Top Navbar */}
      <TopBar 
        setShowPortalModal={setShowPortalModal}
        onOpenEnquiry={() => setModalService('Cococare - Tree Services')}
      />

      {/* Main Page Flow Matching Reference Design */}
      <main>
        {/* 1. Hero Section: "WHERE EVERY PROJECT TELLS A STORY, WHAT'S YOURS?" */}
        <HeroSection 
          onSelectService={(service) => setModalService(service)}
        />

        {/* 2. Category Filter Pills & Horizontal Services Carousel */}
        <ServicesCarousel />

        {/* 3. "UNMATCHED QUALITY" Showcase + Ribbon Ticker Strip #1 */}
        <UnmatchedQualitySection />

        {/* 4. "POPULAR" Section with 3 Protruding Circular Card Headers */}
        <PopularServicesSection />

        {/* 5. "OUR BRANCHES" Vertical Card & 2x2 Hub Grid + Ribbon Ticker Strip #2 */}
        <BranchesSection />

        {/* 6. Side-by-Side Split: White Contact Form & Emerald "THANK YOU!" Card */}
        <ContactSplitSection />
      </main>

      {/* 7. Luxury Deep Green Footer with Watermark */}
      <Footer />

      {/* Enterprise Role Portals Modal */}
      {showPortalModal && (
        <EnterprisePortalsModal setShowPortalModal={setShowPortalModal} />
      )}

      {/* Direct Global Enquiry Modal */}
      <EnquiryModal
        isOpen={!!modalService}
        onClose={() => setModalService(null)}
        serviceTitle={modalService || ''}
      />

    </div>
  );
}
