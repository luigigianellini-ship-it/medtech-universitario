import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/public/HeroSection';
import { CourseCatalog } from './components/public/CourseCatalog';
import { TopicGoldPage } from './components/public/TopicGoldPage';
import { ProtectedReader } from './components/student/ProtectedReader';
import { ExamSimulator } from './components/student/ExamSimulator';
import { FlashcardsDeck } from './components/student/FlashcardsDeck';
import { StudentAccount } from './components/student/StudentAccount';
import { StudentRequestsQueue } from './components/student/StudentRequestsQueue';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PixCheckoutModal } from './components/checkout/PixCheckoutModal';
import { SessionConflictModal } from './components/security/SessionConflictModal';
import { ArchitectureExplainerDrawer } from './components/explainer/ArchitectureExplainerDrawer';
import { LegalComplianceModal } from './components/legal/LegalComplianceModal';
import { AuthModal } from './components/auth/AuthModal';
import { DatabaseSetupModal } from './components/database/DatabaseSetupModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navbar Superior Pública */}
      <Navbar />

      {/* Roteamento de Visualizações */}
      <main className="flex-1">
        {currentView === 'home' && <HeroSection />}
        {currentView === 'catalog' && <CourseCatalog />}
        {currentView === 'topic' && <TopicGoldPage />}
        {currentView === 'reader' && <ProtectedReader />}
        {currentView === 'simulator' && <ExamSimulator />}
        {currentView === 'flashcards' && <FlashcardsDeck />}
        {currentView === 'account' && <StudentAccount />}
        {currentView === 'requests' && <StudentRequestsQueue />}
        {currentView === 'admin' && (
          <AdminDashboard 
            onOpenDbModal={() => setIsDbModalOpen(true)}
            onOpenExplainer={() => setIsExplainerOpen(true)}
          />
        )}
      </main>

      {/* Rodapé Essencial e Limpo */}
      <Footer
        onOpenLegal={() => setIsLegalOpen(true)}
      />

      {/* Modais Globais */}
      <AuthModal />
      <PixCheckoutModal />
      <SessionConflictModal />
      <ArchitectureExplainerDrawer
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
      <LegalComplianceModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
      />
      <DatabaseSetupModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
