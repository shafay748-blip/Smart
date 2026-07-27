export type Language = 'en' | 'ur';

export type NavigationTab = 
  | 'dashboard'
  | 'packages'
  | 'usage'
  | 'bills'
  | 'router'
  | 'devices'
  | 'speedtest'
  | 'support'
  | 'ai'
  | 'offers'
  | 'profile'
  | 'settings';

export type NavTab = NavigationTab;

export interface AddOn {
  id: string;
  name: string;
  pricePKR: number;
  isSubscribed: boolean;
  description: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnic: string;
  address: string;
  city: string;
  ipAddress: string;
  connectionStatus: 'active' | 'suspended' | 'maintenance';
  memberSince: string;
  avatarUrl?: string;
  rewardPoints: number;
  referralCode: string;
}

export interface InternetPackage {
  id: string;
  name: string;
  speedMbps: number;
  priceMonthlyPKR: number;
  downloadCapGB: number | null; // null for Unlimited
  category: 'home' | 'gaming' | 'ultra' | 'business';
  popular?: boolean;
  description: string;
  features: string[];
  perks: string[];
}

export interface ActiveSubscription {
  packageId: string;
  startDate: string;
  expiryDate: string;
  daysRemaining: number;
  autoRenew: boolean;
  dataUsedGB: number;
  monthlyLimitGB: number | null;
  status: 'active' | 'expiring_soon' | 'expired';
}

export interface Bill {
  id: string;
  invoiceNumber: string;
  monthYear: string;
  amountPKR: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  breakdown: {
    packageName: string;
    packageFee: number;
    staticIpFee?: number;
    securityShieldFee?: number;
    taxesAndGovtFees: number;
    discount: number;
  };
}

export interface WifiBandConfig {
  ssid: string;
  password: string;
  enabled: boolean;
  channel: string | number;
  security: string;
  connectedCount: number;
}

export interface RouterInfo {
  model: string;
  brand: string;
  hardwareVersion: string;
  firmwareVersion: string;
  serialNumber: string;
  wanIp: string;
  lanIp: string;
  macAddress: string;
  uptimeHours: number;
  isOnline: boolean;
  signalDbm: number;
  wifi2G: WifiBandConfig;
  wifi5G: WifiBandConfig;
  guestNetwork: {
    ssid: string;
    password: string;
    enabled: boolean;
    durationHours: number;
    maxDevices: number;
  };
}

export interface ConnectedDevice {
  id: string;
  name: string;
  vendor: string;
  type: 'phone' | 'laptop' | 'tv' | 'gaming' | 'smart_home' | 'tablet' | 'desktop';
  ipAddress: string;
  macAddress: string;
  band: '2.4GHz' | '5GHz' | 'Ethernet';
  signalDbm: number;
  downloadCurrentMbps: number;
  uploadCurrentMbps: number;
  totalDataTodayGB: number;
  isBlocked: boolean;
  isPriority: boolean; // QoS priority
  firstSeen: string;
}

export interface DailyUsage {
  day: string;
  date: string;
  downloadGB: number;
  uploadGB: number;
  totalGB: number;
  peakMbps: number;
}

export interface SupportTicket {
  id: string;
  ticketNo: string;
  subject: string;
  category: 'billing' | 'speed' | 'disconnection' | 'router' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  lastUpdated: string;
  messages: {
    id: string;
    sender: 'user' | 'support' | 'ai';
    senderName: string;
    text: string;
    timestamp: string;
    attachmentUrl?: string;
  }[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercent?: number;
  badge: string;
  validTill: string;
  terms: string;
  iconName: string;
}

export interface SpeedTestResult {
  id: string;
  timestamp: string;
  downloadMbps: number;
  uploadMbps: number;
  pingMs: number;
  jitterMs: number;
  server: string;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
}
