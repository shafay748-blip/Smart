import React, { useState, useEffect } from 'react';
import { 
  initialUserAccount, 
  initialActiveSubscription, 
  availablePackages, 
  initialBills, 
  initialRouterInfo, 
  initialDevices, 
  initialDailyUsage,
  initialTickets, 
  initialOffers,
  initialNotifications,
  initialSpeedTestHistory,
  loadFromStorage,
  saveToStorage
} from './data/mockData';
import { 
  NavigationTab, 
  Language, 
  UserAccount, 
  ActiveSubscription, 
  InternetPackage, 
  AddOn, 
  DailyUsage, 
  Bill, 
  RouterInfo, 
  ConnectedDevice, 
  SpeedTestResult, 
  SupportTicket, 
  Offer,
  NotificationItem
} from './types';

// Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PackagesView } from './components/PackagesView';
import { UsageAnalyticsView } from './components/UsageAnalyticsView';
import { BillsView } from './components/BillsView';
import { RouterInfoView } from './components/RouterInfoView';
import { ConnectedDevicesView } from './components/ConnectedDevicesView';
import { SpeedTestView } from './components/SpeedTestView';
import { SupportCenterView } from './components/SupportCenterView';
import { AIAssistantView } from './components/AIAssistantView';
import { OffersView } from './components/OffersView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  // App state persistent in localStorage
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<UserAccount>(() => loadFromStorage('user', initialUserAccount));
  const [subscription, setSubscription] = useState<ActiveSubscription>(() => loadFromStorage('subscription', initialActiveSubscription));
  const [packages, setPackages] = useState<InternetPackage[]>(() => loadFromStorage('packages', availablePackages));
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: 'add-ip', name: 'Static IP Address', pricePKR: 300, isSubscribed: true, description: 'Dedicated public IPv4 address' },
    { id: 'add-shield', name: 'Security Shield', pricePKR: 200, isSubscribed: true, description: 'Malware & phishing protection' },
    { id: 'add-tv', name: 'Smart IPTV HD Pack', pricePKR: 500, isSubscribed: false, description: '150+ HD Live Sports & Movies' }
  ]);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage[]>(() => loadFromStorage('dailyUsage', initialDailyUsage));
  const [bills, setBills] = useState<Bill[]>(() => loadFromStorage('bills', initialBills));
  const [router, setRouter] = useState<RouterInfo>(() => loadFromStorage('router', initialRouterInfo));
  const [devices, setDevices] = useState<ConnectedDevice[]>(() => loadFromStorage('devices', initialDevices));
  const [speedHistory, setSpeedHistory] = useState<SpeedTestResult[]>(() => loadFromStorage('speedHistory', initialSpeedTestHistory));
  const [tickets, setTickets] = useState<SupportTicket[]>(() => loadFromStorage('tickets', initialTickets));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadFromStorage('notifications', initialNotifications));
  const [offers] = useState<Offer[]>(initialOffers);

  const [isRebooting, setIsRebooting] = useState(false);

  // Sync back state changes to localStorage
  useEffect(() => { saveToStorage('user', user); }, [user]);
  useEffect(() => { saveToStorage('subscription', subscription); }, [subscription]);
  useEffect(() => { saveToStorage('bills', bills); }, [bills]);
  useEffect(() => { saveToStorage('router', router); }, [router]);
  useEffect(() => { saveToStorage('devices', devices); }, [devices]);
  useEffect(() => { saveToStorage('speedHistory', speedHistory); }, [speedHistory]);
  useEffect(() => { saveToStorage('tickets', tickets); }, [tickets]);
  useEffect(() => { saveToStorage('notifications', notifications); }, [notifications]);

  // Current package object
  const currentPackage = packages.find(p => p.id === subscription.packageId) || packages[1];

  // Actions
  const handleLanguageToggle = () => {
    setLanguage(prev => (prev === 'en' ? 'ur' : 'en'));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleSelectPackage = (pkgId: string) => {
    const targetPkg = packages.find(p => p.id === pkgId);
    if (!targetPkg) return;

    setSubscription(prev => ({
      ...prev,
      packageId: pkgId,
      daysRemaining: 30,
      autoRenew: true
    }));
  };

  const handleToggleAddOn = (addOnId: string) => {
    setAddOns(prev => prev.map(a => a.id === addOnId ? { ...a, isSubscribed: !a.isSubscribed } : a));
  };

  const handlePayBill = (billId: string) => {
    setBills(prev => prev.map(b => b.id === billId ? { ...b, status: 'paid', paymentDate: new Date().toLocaleDateString('en-GB') } : b));
  };

  const handleRestartRouter = () => {
    setIsRebooting(true);
    setRouter(prev => ({ ...prev, isOnline: false }));

    setTimeout(() => {
      setIsRebooting(false);
      setRouter(prev => ({ ...prev, isOnline: true, uptimeHours: 1 }));
    }, 6000);
  };

  const handleUpdateWifiPassword = (band: '2G' | '5G', newPass: string) => {
    setRouter(prev => {
      if (band === '2G') {
        return { ...prev, wifi2G: { ...prev.wifi2G, password: newPass } };
      } else {
        return { ...prev, wifi5G: { ...prev.wifi5G, password: newPass } };
      }
    });
  };

  const handleToggleGuestWifi = (enabled: boolean) => {
    setRouter(prev => ({ ...prev, guestNetwork: { ...prev.guestNetwork, enabled } }));
  };

  const handleToggleBlockDevice = (id: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, isBlocked: !d.isBlocked } : d));
  };

  const handleTogglePriorityDevice = (id: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, isPriority: !d.isPriority } : d));
  };

  const handleRenameDevice = (id: string, newName: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, name: newName } : d));
  };

  const handleAddSpeedTestResult = (result: SpeedTestResult) => {
    setSpeedHistory(prev => [result, ...prev]);
  };

  const handleSubmitTicket = (ticketData: Partial<SupportTicket>) => {
    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNo: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketData.subject || 'Support Query',
      category: ticketData.category || 'speed',
      status: 'open',
      priority: ticketData.priority || 'medium',
      createdAt: 'Just now',
      lastUpdated: 'Just now',
      messages: ticketData.messages || []
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleAddMessageToTicket = (ticketId: string, text: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              id: `m-${Date.now()}`,
              sender: 'user',
              senderName: user.name,
              text,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return t;
    }));
  };

  const unpaidBillsCount = (bills || []).filter(b => b.status === 'unpaid' || b.status === 'overdue').length;

  return (
    <div className={`min-h-screen bg-[#0A0A0B] text-[#E4E4E7] flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white ${language === 'ur' ? 'rtl' : 'ltr'}`}>
      
      {/* Navigation Header */}
      <Header
        currentTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        onLanguageToggle={handleLanguageToggle}
        user={user}
        router={router}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Body Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-8">
        
        {/* Persistent Sidebar Navigation */}
        <Sidebar
          currentTab={activeTab}
          onTabChange={setActiveTab}
          language={language}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          unpaidBillsCount={unpaidBillsCount}
        />

        {/* Dynamic Main View Canvas */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardView
              user={user}
              subscription={subscription}
              currentPackage={currentPackage}
              bills={bills}
              router={router}
              devices={devices}
              language={language}
              onTabChange={setActiveTab}
              onRestartRouter={handleRestartRouter}
              isRebootingRouter={isRebooting}
              onPayBill={handlePayBill}
            />
          )}

          {activeTab === 'packages' && (
            <PackagesView
              packages={packages}
              currentPackage={currentPackage}
              subscription={subscription}
              language={language}
              onSelectPackage={(pkg) => handleSelectPackage(pkg.id)}
            />
          )}

          {activeTab === 'usage' && (
            <UsageAnalyticsView
              dailyUsage={dailyUsage}
              devices={devices}
              language={language}
            />
          )}

          {activeTab === 'bills' && (
            <BillsView
              bills={bills}
              user={user}
              language={language}
              onPayBill={handlePayBill}
            />
          )}

          {activeTab === 'router' && (
            <RouterInfoView
              router={router}
              language={language}
              onUpdateWifiPassword={handleUpdateWifiPassword}
              onToggleGuestWifi={handleToggleGuestWifi}
              onRestartRouter={handleRestartRouter}
              isRebooting={isRebooting}
            />
          )}

          {activeTab === 'devices' && (
            <ConnectedDevicesView
              devices={devices}
              language={language}
              onToggleBlockDevice={handleToggleBlockDevice}
              onTogglePriorityDevice={handleTogglePriorityDevice}
              onRenameDevice={handleRenameDevice}
            />
          )}

          {activeTab === 'speedtest' && (
            <SpeedTestView
              speedHistory={speedHistory}
              packageSpeed={currentPackage.speedMbps}
              language={language}
              onAddTestResult={handleAddSpeedTestResult}
            />
          )}

          {activeTab === 'support' && (
            <SupportCenterView
              tickets={tickets}
              language={language}
              onSubmitTicket={handleSubmitTicket}
              onAddMessageToTicket={handleAddMessageToTicket}
            />
          )}

          {activeTab === 'ai' && (
            <AIAssistantView
              user={user}
              currentPackage={currentPackage}
              subscription={subscription}
              router={router}
              deviceCount={(devices || []).filter(d => !d.isBlocked).length}
              language={language}
            />
          )}

          {activeTab === 'offers' && (
            <OffersView
              offers={offers}
              user={user}
              language={language}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              language={language}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              language={language}
              onLanguageToggle={handleLanguageToggle}
            />
          )}
        </main>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#27272A] bg-[#0A0A0B] py-6 text-center text-xs text-zinc-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Smart WiFi Assistant • Built for Shafay Ali</span>
          <span>Fiber NOC Server: Active • 99.99% Uptime Guarantee</span>
        </div>
      </footer>

    </div>
  );
}
