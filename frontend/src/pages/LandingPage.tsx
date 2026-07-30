import React from 'react';
import { GlobalScrollProgress } from '../components/landing/GlobalScrollProgress';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { StoryNarrative } from '../components/landing/StoryNarrative';
import { HowItWorks } from '../components/landing/HowItWorks';
import { AIPipelineVisualization } from '../components/landing/AIPipelineVisualization';
import { CTABanner } from '../components/landing/CTABanner';
import { LandingFooter } from '../components/landing/LandingFooter';
import { GlobalSearchModal } from '../components/layout/GlobalSearchModal';
import { useAppStore } from '../theme/store';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { wardrobeItems } = useAppStore();
  const items = wardrobeItems || [];

  return (
    <div className="bg-[#FFF5E5] text-slate-900 font-sans min-h-screen flex flex-col justify-between selection:bg-[#D92243] selection:text-white">
      {/* 0. Global Top Scroll Progress Bar */}
      <GlobalScrollProgress />

      {/* ⌘K Global Search Overlay */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={items}
        onSelectItem={() => onNavigate('wardrobe')}
      />

      {/* 1. Centered Wordmark Navbar */}
      <LandingNavbar onSearchClick={() => setIsSearchOpen(true)} />

      {/* 2. Unboxed 3D Dual Avatars Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 3. Storytelling Narrative (Scroll-Linked Transformation) */}
      <StoryNarrative />

      {/* 4. AI Pipeline Visualization */}
      <AIPipelineVisualization />

      {/* 5. Scroll-Driven Vertical Timeline */}
      <HowItWorks />

      {/* 6. Unboxed Conversion CTA */}
      <CTABanner onNavigate={onNavigate} />

      {/* 7. Whering-Inspired Dark Footer */}
      <LandingFooter />
    </div>
  );
}
