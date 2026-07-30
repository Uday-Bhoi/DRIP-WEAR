import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { OnboardingFlow } from './pages/OnboardingFlow';
import { DashboardHome } from './pages/DashboardHome';
import { VirtualWardrobe } from './pages/VirtualWardrobe';
import { OutfitBuilder } from './pages/OutfitBuilder';
import { SavedOutfits } from './pages/SavedOutfits';
import { Recommendations } from './pages/Recommendations';
import { WardrobeAnalytics } from './pages/WardrobeAnalytics';
import { ProfilePage, SettingsPage } from './pages/ProfileSettings';
import { AboutUsPage, FAQPage, ThoughtsPage, ContactPage } from './pages/PublicPages';
import { StyleGuide } from './pages/StyleGuide';
import { AuthPage } from './pages/AuthPage';
import { AppShell } from './components/layout/AppShell';
import { useAppStore, initAuthListener } from './theme/store';

function AppContent() {
  const { wardrobeItems, addWardrobeItem } = useAppStore();
  const items = wardrobeItems || [];
  const navigate = useNavigate();

  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <Routes>
      {/* Public Marketing Routes */}
      <Route path="/" element={<LandingPage onNavigate={(page) => navigate(`/${page === 'auth' ? 'auth' : page}`)} />} />
      <Route path="/auth" element={<AuthPage onNavigate={(page) => navigate(page === 'onboarding' ? '/onboarding' : '/')} />} />
      <Route path="/onboarding" element={<OnboardingFlow onComplete={() => navigate('/dashboard')} onNavigate={() => navigate('/')} />} />
      
      {/* Editorial Public Pages */}
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/thoughts" element={<ThoughtsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/style-guide" element={<StyleGuide />} />

      {/* Authenticated SaaS Application Routes (Wrapped in AppShell) */}
      <Route
        path="/dashboard"
        element={
          <AppShell items={items}>
            <DashboardHome items={items} onNavigate={(page) => navigate(`/${page}`)} />
          </AppShell>
        }
      />
      <Route
        path="/wardrobe"
        element={
          <AppShell items={items}>
            <VirtualWardrobe items={items} onAddItem={addWardrobeItem} />
          </AppShell>
        }
      />
      <Route
        path="/builder"
        element={
          <AppShell items={items}>
            <OutfitBuilder items={items} />
          </AppShell>
        }
      />
      <Route
        path="/saved-outfits"
        element={
          <AppShell items={items}>
            <SavedOutfits items={items} onNavigate={(page) => navigate(`/${page}`)} />
          </AppShell>
        }
      />
      <Route
        path="/recommendations"
        element={
          <AppShell items={items}>
            <Recommendations items={items} onNavigate={(page) => navigate(`/${page}`)} />
          </AppShell>
        }
      />
      <Route
        path="/analytics"
        element={
          <AppShell items={items}>
            <WardrobeAnalytics items={items} />
          </AppShell>
        }
      />
      <Route
        path="/profile"
        element={
          <AppShell items={items}>
            <ProfilePage />
          </AppShell>
        }
      />
      <Route
        path="/settings"
        element={
          <AppShell items={items}>
            <SettingsPage />
          </AppShell>
        }
      />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
