import React, { useState } from 'react';
import Header from './components/Header';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AIChat from './components/AIChat';
import AIAnalytics from './components/AIAnalytics';
import TokenSwap from './components/TokenSwap';
import MemeCreator from './components/MemeCreator';
import TradingChart from './components/TradingChart';
import SubscriptionPage from './components/SubscriptionPage';
import Login from './components/Login';
import Whitepaper from './components/Whitepaper';
import Roadmap from './components/Roadmap';
import Mining from './components/Mining';
import Staking from './components/Staking';
import Airdrop from './components/Airdrop';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import OptikGPTSidebar from './components/OptikGPTSidebar';
import WalletDashboard from './components/WalletDashboard';
import StripeProvider from './components/StripeProvider';

function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check for admin mode via URL parameter or special key combination
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdminMode(true);
    }

    // Secret key combination: Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdminMode(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'chat':
        return <AIChat />;
      case 'ai-analytics':
        return <AIAnalytics />;
      case 'swap':
        return <TokenSwap />;
      case 'creator':
        return <MemeCreator />;
      case 'chart':
        return <TradingChart />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'whitepaper':
        return <Whitepaper />;
      case 'roadmap':
        return <Roadmap />;
      case 'mining':
        return <Mining />;
      case 'staking':
        return <Staking />;
      case 'airdrop':
        return <Airdrop />;
      case 'wallet-dashboard':
        return <WalletDashboard />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  // Admin Mode
  if (isAdminMode) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={setIsAdminLoggedIn} />;
    }
    return <AdminDashboard />;
  }

  // Regular User Mode
  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <StripeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderActiveComponent()}
        </main>

        {/* OptikGPT Sidebar - Available on all pages */}
        <OptikGPTSidebar />

        {/* Background Effects - Updated with OptikCoin colors */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Admin Mode Indicator */}
        {isAdminMode && (
          <div className="fixed bottom-4 right-4 bg-red-600/20 border border-red-500/30 rounded-lg px-3 py-2">
            <p className="text-red-400 text-sm font-medium">Admin Mode Active</p>
          </div>
        )}
      </div>
    </StripeProvider>
  );
}

export default App;