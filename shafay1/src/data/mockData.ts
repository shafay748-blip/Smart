import {
  UserAccount,
  InternetPackage,
  ActiveSubscription,
  Bill,
  RouterInfo,
  ConnectedDevice,
  DailyUsage,
  SupportTicket,
  Offer,
  SpeedTestResult,
  NotificationItem,
} from '../types';

export const initialUserAccount: UserAccount = {
  id: "PK-884920",
  name: "Shafay Ali",
  email: "shafay748@gmail.com",
  phone: "+92 300 1234567",
  cnic: "35202-9842103-1",
  address: "House 142, Block H-3, Johar Town",
  city: "Lahore, Pakistan",
  ipAddress: "182.185.120.44",
  connectionStatus: "active",
  memberSince: "March 2024",
  rewardPoints: 1450,
  referralCode: "SHAFAY-WIFI50",
};

export const availablePackages: InternetPackage[] = [
  {
    id: "pkg-fiber-50",
    name: "Fiber Starter 50",
    speedMbps: 50,
    priceMonthlyPKR: 1999,
    downloadCapGB: null,
    category: "home",
    description: "Ideal for small families, basic HD streaming & video calls.",
    features: ["50 Mbps Symmetric Speed", "Dual Band Wi-Fi 5 Router Included", "24/7 Support", "Free Installation"],
    perks: ["1 Month Basic Cloud Storage"],
  },
  {
    id: "pkg-fiber-100",
    name: "Fiber Value 100",
    speedMbps: 100,
    priceMonthlyPKR: 2899,
    downloadCapGB: null,
    category: "home",
    popular: true,
    description: "Our most popular home fiber plan for smooth 4K streaming and simultaneous devices.",
    features: ["100 Mbps Symmetric Speed", "Wi-Fi 6 Dual-Band AX Router", "Zero Throttling", "Free Static IP Option"],
    perks: ["Free Security Shield Lite", "Priority Phone Support"],
  },
  {
    id: "pkg-speed-250",
    name: "Speed Ultra 250",
    speedMbps: 250,
    priceMonthlyPKR: 3999,
    downloadCapGB: null,
    category: "ultra",
    popular: true,
    description: "Ultra-fast multi-gigabit fiber for smart homes with 10+ active devices.",
    features: ["250 Mbps Low Latency Fiber", "Mesh Wi-Fi 6 Ready", "Free Static IP Included", "Gaming Ping Boost"],
    perks: ["6 Months Free Antivirus", "100 Reward Points / Month"],
  },
  {
    id: "pkg-gaming-500",
    name: "Gaming Pro 500",
    speedMbps: 500,
    priceMonthlyPKR: 5999,
    downloadCapGB: null,
    category: "gaming",
    description: "Engineered for hardcore gamers, esports, and zero-jitter live streaming.",
    features: ["500 Mbps High Speed", "Custom Ping Routing", "Dedicated Port Forwarding", "Tri-Band Router Upgrade"],
    perks: ["Free Discord Nitro 3 Months", "Sub-10ms Routing Node"],
  },
  {
    id: "pkg-gigabit-1000",
    name: "Gigabit Ultimate 1000",
    speedMbps: 1000,
    priceMonthlyPKR: 8999,
    downloadCapGB: null,
    category: "business",
    description: "Enterprise grade 1 Gbps fiber connection for power users and small offices.",
    features: ["1,000 Mbps (1 Gbps) Bandwidth", "SLA 99.9% Uptime Guarantee", "2 Static IPs", "Dedicated VIP Manager"],
    perks: ["Free Cloud Backup 1TB", "On-site 2-hour SLA Technician"],
  }
];

export const initialActiveSubscription: ActiveSubscription = {
  packageId: "pkg-speed-250",
  startDate: "2026-07-10",
  expiryDate: "2026-08-10",
  daysRemaining: 15,
  autoRenew: true,
  dataUsedGB: 412.8,
  monthlyLimitGB: null,
  status: "active",
};

export const initialBills: Bill[] = [
  {
    id: "bill-2026-07",
    invoiceNumber: "INV-2026-0782",
    monthYear: "July 2026",
    amountPKR: 3999,
    dueDate: "2026-08-05",
    status: "unpaid",
    breakdown: {
      packageName: "Speed Ultra 250 Mbps",
      packageFee: 3499,
      staticIpFee: 300,
      securityShieldFee: 200,
      taxesAndGovtFees: 0, // Inclusive promo
      discount: 0,
    }
  },
  {
    id: "bill-2026-06",
    invoiceNumber: "INV-2026-0641",
    monthYear: "June 2026",
    amountPKR: 3999,
    dueDate: "2026-07-05",
    status: "paid",
    paymentDate: "2026-07-02",
    paymentMethod: "JazzCash Wallet",
    transactionId: "TXN-99812480",
    breakdown: {
      packageName: "Speed Ultra 250 Mbps",
      packageFee: 3499,
      staticIpFee: 300,
      securityShieldFee: 200,
      taxesAndGovtFees: 0,
      discount: 0,
    }
  },
  {
    id: "bill-2026-05",
    invoiceNumber: "INV-2026-0511",
    monthYear: "May 2026",
    amountPKR: 2899,
    dueDate: "2026-06-05",
    status: "paid",
    paymentDate: "2026-06-01",
    paymentMethod: "Debit Card (Meezan Bank)",
    transactionId: "TXN-88120341",
    breakdown: {
      packageName: "Fiber Value 100 Mbps",
      packageFee: 2899,
      taxesAndGovtFees: 0,
      discount: 0,
    }
  }
];

export const initialRouterInfo: RouterInfo = {
  model: "Archer AX73 - Wi-Fi 6",
  brand: "TP-Link Fiber Edition",
  hardwareVersion: "v2.0",
  firmwareVersion: "1.3.5 Build 20260412",
  serialNumber: "AX73-2026-98124",
  wanIp: "182.185.120.44",
  lanIp: "192.168.10.1",
  macAddress: "7A:8B:9C:1D:2E:3F",
  uptimeHours: 342,
  isOnline: true,
  signalDbm: -48, // Excellent
  wifi2G: {
    ssid: "SmartWiFi_Home_2.4G",
    password: "wifiPass2026#",
    enabled: true,
    channel: 6,
    security: "WPA3-Personal",
    connectedCount: 3,
  },
  wifi5G: {
    ssid: "SmartWiFi_Home_5G_Ultra",
    password: "wifiPass2026#",
    enabled: true,
    channel: 36,
    security: "WPA3-Personal",
    connectedCount: 4,
  },
  guestNetwork: {
    ssid: "SmartWiFi_Guest_Free",
    password: "guestWelcome2026",
    enabled: false,
    durationHours: 24,
    maxDevices: 10,
  }
};

export const initialDevices: ConnectedDevice[] = [
  {
    id: "dev-1",
    name: "Shafay's iPhone 15 Pro",
    vendor: "Apple Inc.",
    type: "phone",
    ipAddress: "192.168.10.102",
    macAddress: "A2:3B:4C:5D:6E:7F",
    band: "5GHz",
    signalDbm: -42,
    downloadCurrentMbps: 24.5,
    uploadCurrentMbps: 3.2,
    totalDataTodayGB: 8.4,
    isBlocked: false,
    isPriority: true,
    firstSeen: "2 hours ago",
  },
  {
    id: "dev-2",
    name: "MacBook Pro M3 Max",
    vendor: "Apple Inc.",
    type: "laptop",
    ipAddress: "192.168.10.105",
    macAddress: "B3:4C:5D:6E:7F:80",
    band: "5GHz",
    signalDbm: -45,
    downloadCurrentMbps: 88.0,
    uploadCurrentMbps: 12.5,
    totalDataTodayGB: 18.2,
    isBlocked: false,
    isPriority: true,
    firstSeen: "1 hour ago",
  },
  {
    id: "dev-3",
    name: "Samsung 65\" OLED 4K TV",
    vendor: "Samsung Electronics",
    type: "tv",
    ipAddress: "192.168.10.110",
    macAddress: "C4:5D:6E:7F:80:91",
    band: "5GHz",
    signalDbm: -58,
    downloadCurrentMbps: 18.2,
    uploadCurrentMbps: 0.8,
    totalDataTodayGB: 14.6,
    isBlocked: false,
    isPriority: false,
    firstSeen: "5 hours ago",
  },
  {
    id: "dev-4",
    name: "PlayStation 5 Pro",
    vendor: "Sony Interactive",
    type: "gaming",
    ipAddress: "192.168.10.120",
    macAddress: "D5:6E:7F:80:91:A2",
    band: "Ethernet",
    signalDbm: -30,
    downloadCurrentMbps: 110.4,
    uploadCurrentMbps: 22.1,
    totalDataTodayGB: 34.0,
    isBlocked: false,
    isPriority: true,
    firstSeen: "Yesterday",
  },
  {
    id: "dev-5",
    name: "Living Room Smart Cam",
    vendor: "Xiaomi Smart",
    type: "smart_home",
    ipAddress: "192.168.10.130",
    macAddress: "E6:7F:80:91:A2:B3",
    band: "2.4GHz",
    signalDbm: -64,
    downloadCurrentMbps: 1.2,
    uploadCurrentMbps: 2.8,
    totalDataTodayGB: 3.1,
    isBlocked: false,
    isPriority: false,
    firstSeen: "3 days ago",
  },
  {
    id: "dev-6",
    name: "iPad Air 5th Gen",
    vendor: "Apple Inc.",
    type: "tablet",
    ipAddress: "192.168.10.141",
    macAddress: "F7:80:91:A2:B3:C4",
    band: "5GHz",
    signalDbm: -50,
    downloadCurrentMbps: 0.0,
    uploadCurrentMbps: 0.0,
    totalDataTodayGB: 2.3,
    isBlocked: false,
    isPriority: false,
    firstSeen: "4 hours ago",
  },
  {
    id: "dev-7",
    name: "Guest Android Phone",
    vendor: "Samsung",
    type: "phone",
    ipAddress: "192.168.10.155",
    macAddress: "11:22:33:44:55:66",
    band: "2.4GHz",
    signalDbm: -72,
    downloadCurrentMbps: 0.5,
    uploadCurrentMbps: 0.1,
    totalDataTodayGB: 0.8,
    isBlocked: false,
    isPriority: false,
    firstSeen: "30 mins ago",
  }
];

export const initialDailyUsage: DailyUsage[] = [
  { day: "Mon", date: "Jul 20", downloadGB: 18.4, uploadGB: 3.2, totalGB: 21.6, peakMbps: 210 },
  { day: "Tue", date: "Jul 21", downloadGB: 22.1, uploadGB: 4.8, totalGB: 26.9, peakMbps: 238 },
  { day: "Wed", date: "Jul 22", downloadGB: 15.8, uploadGB: 2.9, totalGB: 18.7, peakMbps: 195 },
  { day: "Thu", date: "Jul 23", downloadGB: 31.2, uploadGB: 8.4, totalGB: 39.6, peakMbps: 248 },
  { day: "Fri", date: "Jul 24", downloadGB: 42.0, uploadGB: 11.5, totalGB: 53.5, peakMbps: 249 },
  { day: "Sat", date: "Jul 25", downloadGB: 58.6, uploadGB: 14.1, totalGB: 72.7, peakMbps: 251 },
  { day: "Sun", date: "Jul 26", downloadGB: 38.4, uploadGB: 9.3, totalGB: 47.7, peakMbps: 245 },
];

export const initialTickets: SupportTicket[] = [
  {
    id: "tkt-101",
    ticketNo: "TKT-2026-9041",
    subject: "Sub-10ms Ping Routing Request for Valorant Asia Server",
    category: "speed",
    priority: "medium",
    status: "resolved",
    createdAt: "2026-07-18 14:30",
    lastUpdated: "2026-07-18 16:15",
    messages: [
      {
        id: "m1",
        sender: "user",
        senderName: "Shafay Ali",
        text: "Hi support team, I play competitive Valorant on Singapore/Hongkong servers. Can you optimize my routing node?",
        timestamp: "2026-07-18 14:30"
      },
      {
        id: "m2",
        sender: "support",
        senderName: "Nabeel (NOC Fiber Specialist)",
        text: "Hello Shafay! We updated your routing profile to our Tier-1 Low Latency Direct Transit. Ping should now be under 12ms.",
        timestamp: "2026-07-18 16:15"
      }
    ]
  },
  {
    id: "tkt-102",
    ticketNo: "TKT-2026-9122",
    subject: "Static IP Configuration Confirmation",
    category: "router",
    priority: "low",
    status: "in_progress",
    createdAt: "2026-07-24 10:15",
    lastUpdated: "2026-07-25 09:00",
    messages: [
      {
        id: "m1",
        sender: "user",
        senderName: "Shafay Ali",
        text: "Please verify if static IP 182.185.120.44 is assigned correctly for home server hosting.",
        timestamp: "2026-07-24 10:15"
      },
      {
        id: "m2",
        sender: "support",
        senderName: "Ayesha (Support Engineer)",
        text: "Hi Shafay, your static IP binding is active and configured on VLAN 102. Let us know if you need port forwarding rules.",
        timestamp: "2026-07-25 09:00"
      }
    ]
  }
];

export const initialOffers: Offer[] = [
  {
    id: "off-1",
    title: "Double Speed Summer Boost",
    description: "Get upgraded from 250 Mbps to 500 Mbps Gaming Pro for 30 days at zero extra cost!",
    code: "SUMMER500",
    discountPercent: 50,
    badge: "Limited Time",
    validTill: "August 15, 2026",
    terms: "Applicable for active Fiber Ultra customers with auto-pay enabled.",
    iconName: "Zap"
  },
  {
    id: "off-2",
    title: "Free Static IP for 3 Months",
    description: "Enjoy dedicated public IP address for smooth port forwarding, VPN hosting & security cams.",
    code: "STATICFREE",
    badge: "Popular Add-on",
    validTill: "August 31, 2026",
    terms: "Requires 6-month continuous subscription.",
    iconName: "ShieldCheck"
  },
  {
    id: "off-3",
    title: "Referral Reward - PKR 1,000 Bill Credit",
    description: "Share your code SHAFAY-WIFI50. Every friend who joins Smart WiFi gets 50% off & you get PKR 1,000!",
    code: "SHAFAY-WIFI50",
    badge: "Unlimited Cashback",
    validTill: "Dec 31, 2026",
    terms: "No cap on referral credits.",
    iconName: "Gift"
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "July Bill Ready",
    message: "Invoice INV-2026-0782 for PKR 3,999 is generated. Due date is Aug 05, 2026.",
    timestamp: "2 hours ago",
    type: "warning",
    read: false,
  },
  {
    id: "notif-2",
    title: "Router Firmware Upgraded",
    message: "Your Archer AX73 received Firmware v1.3.5 patch with enhanced Wi-Fi 6 WPA3 security.",
    timestamp: "Yesterday",
    type: "success",
    read: true,
  },
  {
    id: "notif-3",
    title: "Scheduled Fiber Maintenance",
    message: "System maintenance in Johar Town region on July 29, 02:00 AM - 03:00 AM. Uptime un-affected.",
    timestamp: "3 days ago",
    type: "info",
    read: true,
  }
];

export const initialSpeedTestHistory: SpeedTestResult[] = [
  {
    id: "st-1",
    timestamp: "Today, 18:20",
    downloadMbps: 248.5,
    uploadMbps: 212.0,
    pingMs: 9,
    jitterMs: 2,
    server: "SmartWiFi Fiber Server - Node #04",
    rating: "Excellent"
  },
  {
    id: "st-2",
    timestamp: "Yesterday, 21:10",
    downloadMbps: 242.0,
    uploadMbps: 205.4,
    pingMs: 11,
    jitterMs: 3,
    server: "SmartWiFi Fiber Server - Node #04",
    rating: "Excellent"
  },
  {
    id: "st-3",
    timestamp: "Jul 22, 14:00",
    downloadMbps: 236.2,
    uploadMbps: 198.0,
    pingMs: 12,
    jitterMs: 4,
    server: "SmartWiFi Fiber Server - Node #04",
    rating: "Good"
  }
];

// LocalStorage helpers
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(`smart_wifi_${key}`);
    if (!data) return defaultValue;
    const parsed = JSON.parse(data);
    return (parsed !== null && parsed !== undefined) ? parsed : defaultValue;
  } catch (err) {
    console.warn(`Failed to read ${key} from storage`, err);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`smart_wifi_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to save ${key} to storage`, err);
  }
}
