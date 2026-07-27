import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & App
    appName: "Smart WiFi Assistant",
    tagline: "Broadband & Fiber Internet Management",
    welcomeUser: "Welcome back",
    statusOnline: "Connected & Healthy",
    statusWarning: "Action Needed",
    statusOffline: "Disconnected",

    // Navigation
    dashboard: "Dashboard",
    packages: "Internet Packages",
    usage: "Usage Analytics",
    bills: "Bills & Payments",
    router: "Router Info",
    devices: "Connected Devices",
    speedtest: "Speed Test",
    support: "Support Center",
    aiAssistant: "AI Assistant",
    offers: "Offers & Promos",
    profile: "Profile",
    settings: "Settings",

    // Common Buttons & Labels
    search: "Search...",
    save: "Save Changes",
    cancel: "Cancel",
    close: "Close",
    payNow: "Pay Bill Now",
    upgrade: "Upgrade Plan",
    renewNow: "Renew Now",
    restartRouter: "Restart Router",
    rebooting: "Rebooting Router...",
    copySsid: "Copy Wi-Fi Details",
    pauseInternet: "Pause Internet",
    resumeInternet: "Resume Internet",
    priorityQos: "Priority QoS",
    runTest: "Start Speed Test",
    submitTicket: "Submit Support Ticket",
    askAi: "Ask AI Assistant",
    language: "Language / زبان",
    quickActions: "Quick Actions",

    // Dashboard
    activePackage: "Active Package",
    packageExpiry: "Package Expiry",
    daysLeft: "days left",
    dataUsedThisMonth: "Data Used This Month",
    downloadSpeed: "Download Speed",
    uploadSpeed: "Upload Speed",
    pingLatency: "Ping / Latency",
    connectedDevicesCount: "Connected Devices",
    routerStatus: "Router Status",
    unpaidBillAlert: "You have an unpaid bill due soon!",
    dueAmount: "Due Amount",
    quickTroubleshoot: "Smart Troubleshooter",

    // Packages
    selectCategory: "Select Package Category",
    allPackages: "All Plans",
    homePlans: "Home Fiber",
    gamingPlans: "Gaming Pro",
    ultraPlans: "Ultra Fiber",
    businessPlans: "Business Pro",
    unlimitedData: "Unlimited Data",
    perMonth: "/month",
    currentPlan: "Current Active Plan",
    subscribePlan: "Select & Subscribe",
    packageFeatures: "Package Features",
    packagePerks: "Included Perks",
    expiryCountdown: "Time Remaining Until Expiry",

    // Usage Analytics
    dailyDataUsage: "Daily Traffic Consumption",
    peakHoursAnalysis: "Peak Usage Time",
    topConsumingDevices: "Top Consuming Devices",
    downloadVsUpload: "Download vs Upload Ratio",
    dataCapLimit: "Data Limit Alert",
    unlimitedTag: "Unlimited High-Speed Fiber",

    // Router
    routerDetails: "Router Hardware & Wireless Settings",
    dualBandSSID: "Dual Band Wi-Fi Configuration",
    frequency2G: "2.4 GHz Band (Long Range)",
    frequency5G: "5 GHz Band (Ultra Fast)",
    guestNetworkTitle: "Guest Wi-Fi Network",
    wifiPassword: "Wi-Fi Password",
    channel: "Channel",
    showPassword: "Show Password",
    hidePassword: "Hide Password",
    changePasswordModal: "Change Wi-Fi Password",
    routerRebootNotice: "Router restart will take approximately 10 seconds. Devices will briefly reconnect.",

    // Devices
    deviceList: "All Active Devices",
    deviceType: "Device Type",
    bandwidthUsage: "Current Bandwidth",
    actions: "Actions",
    blockDevice: "Block Device",
    unblockDevice: "Unblock Device",
    priorityBoost: "Priority High Speed",

    // Speed test
    speedTestTitle: "Interactive Broadband Speed Test",
    testingDownload: "Testing Download Speed...",
    testingUpload: "Testing Upload Speed...",
    testingPing: "Measuring Ping & Jitter...",
    testComplete: "Test Complete!",
    recommendation: "Streaming & Gaming Recommendation",

    // AI
    aiTitle: "AI WiFi Smart Assistant",
    aiSubtitle: "Get instant AI troubleshooting, package advice, and router optimization instructions.",
    typeMessage: "Type your query or troubleshooting request...",
    quickQuestions: "Quick Questions",

    // Bills
    billingHistory: "Billing & Payment Invoices",
    invoiceNo: "Invoice #",
    dueDate: "Due Date",
    amount: "Amount",
    status: "Status",
    downloadInvoice: "Download PDF Receipt",
    paymentMethods: "Select Payment Option",
    jazzcash: "JazzCash Mobile Wallet",
    easypaisa: "EasyPaisa Wallet",
    creditCard: "Debit / Credit Card",
    bankTransfer: "Direct Bank Transfer",

    // Support
    supportCenterTitle: "Customer Support & Diagnostics",
    faqSection: "Common WiFi Fixes",
    myTickets: "My Support Tickets",
    createNewTicket: "Open New Support Ticket",

    // Offers
    promotionsTitle: "Exclusive Customer Offers & Rewards",
    referralTitle: "Refer a Friend & Earn PKR 1,000",
    yourReferralCode: "Your Referral Code",

    // Settings
    settingsTitle: "Account & App Preferences",
    notifications: "Notification Preferences",
    smsAlerts: "SMS Expiry & Bill Alerts",
    emailAlerts: "Email Invoices & Updates",
    pushAlerts: "Push Notifications",
    themeMode: "Display Mode",
  },
  ur: {
    // Brand & App
    appName: "سمارٹ وائی فائی اسسٹنٹ",
    tagline: "براڈ بینڈ اور فائبر انٹرنیٹ مینجمنٹ",
    welcomeUser: "خوش آمدید",
    statusOnline: "کنیکٹڈ اور بہترین رفتار",
    statusWarning: "توجه کی ضرورت ہے",
    statusOffline: "منقطع",

    // Navigation
    dashboard: "ڈیش بورڈ",
    packages: "انٹرنیٹ پیکیجز",
    usage: "ڈیٹا کا استعمال",
    bills: "بل اور ادائیگیاں",
    router: "راؤٹر معلومات",
    devices: "منسلک ڈیوائسز",
    speedtest: "اسپیڈ ٹیسٹ",
    support: "کسٹمر سپورٹ",
    aiAssistant: "اے آئی وائی فائی اسسٹنٹ",
    offers: "خاص پیشکشیں",
    profile: "پروفائل",
    settings: "سیٹنگز",

    // Common Buttons & Labels
    search: "تلاش کریں...",
    save: "تبدیلیاں محفوظ کریں",
    cancel: "منسوخ کریں",
    close: "بند کریں",
    payNow: "ابھی بل ادا کریں",
    upgrade: "پلان اپ گریڈ کریں",
    renewNow: "پیکیج کی تجدید کریں",
    restartRouter: "راؤٹر ری سٹارٹ کریں",
    rebooting: "راؤٹر ری سٹارٹ ہو رہا ہے...",
    copySsid: "وائی فائی تفصیلا ت کاپی کریں",
    pauseInternet: "انٹرنیٹ روکیں",
    resumeInternet: "انٹرنیٹ بحال کریں",
    priorityQos: "ترجیحی رفتار (QoS)",
    runTest: "اسپیڈ ٹیسٹ شروع کریں",
    submitTicket: "شکایت درج کریں",
    askAi: "اے آئی سے پوچھیں",
    language: "زبان / Language",
    quickActions: "فوری کارروائی",

    // Dashboard
    activePackage: "موجودہ انٹرنیٹ پیکیج",
    packageExpiry: "پیکیج کے ختم ہونے کا وقت",
    daysLeft: "دن باقی",
    dataUsedThisMonth: "اس ماہ استعمال شدہ ڈیٹا",
    downloadSpeed: "ڈاؤن لوڈ اسپیڈ",
    uploadSpeed: "اپ لوڈ اسپیڈ",
    pingLatency: "پنگ / لیتنسی",
    connectedDevicesCount: "منسلک ڈیوائسز",
    routerStatus: "راؤٹر کی حالت",
    unpaidBillAlert: "آپ کا بل واجب الادا ہے!",
    dueAmount: "واجب الادا رقم",
    quickTroubleshoot: "فوری وائی فائی درستگی",

    // Packages
    selectCategory: "پیکیج کی کیٹیگری منتخب کریں",
    allPackages: "تمام پلانز",
    homePlans: "ہوم فائبر",
    gamingPlans: "گیمنگ پرو",
    ultraPlans: "الٹرا فائبر",
    businessPlans: "بزنس پرو",
    unlimitedData: "لامحدود ڈیٹا",
    perMonth: "/ماہانہ",
    currentPlan: "موجودہ فعال پلان",
    subscribePlan: "پلان منتخب کریں",
    packageFeatures: "پیکیج کی خصوصیات",
    packagePerks: "شامل فوائد",
    expiryCountdown: "میعاد ختم ہونے کا وقت",

    // Usage Analytics
    dailyDataUsage: "روزانہ کا ڈیٹا استعمال",
    peakHoursAnalysis: "زیادہ استعمال کا وقت",
    topConsumingDevices: "زیادہ ڈیٹا استعمال کرنے والی ڈیوائسز",
    downloadVsUpload: "ڈاؤن لوڈ اور اپ لوڈ کی شرح",
    dataCapLimit: "ڈیٹا کی حد الرٹ",
    unlimitedTag: "لامحدود تیز ترین فائبر",

    // Router
    routerDetails: "راؤٹر ہارڈ ویئر اور وائرلیس سیٹنگز",
    dualBandSSID: "ڈوئل بینڈ وائی فائی سیٹنگز",
    frequency2G: "2.4 گیگا ہرٹز (طویل رینج)",
    frequency5G: "5 گیگا ہرٹز (الٹرا فاسٹ)",
    guestNetworkTitle: "مہمان وائی فائی نیٹ ورک",
    wifiPassword: "وائی فائی پاس ورڈ",
    channel: "چینل",
    showPassword: "پاس ورڈ دکھائیں",
    hidePassword: "پاس ورڈ چھپائیں",
    changePasswordModal: "وائی فائی پاس ورڈ تبدیل کریں",
    routerRebootNotice: "راؤٹر ری سٹارٹ ہونے میں تقریباً 10 سیکنڈ لگیں گے۔",

    // Devices
    deviceList: "تمام فعال ڈیوائسز",
    deviceType: "ڈیوائس کی قسم",
    bandwidthUsage: "موجودہ بینڈوڈتھ",
    actions: "اقدامات",
    blockDevice: "ڈیوائس بلاک کریں",
    unblockDevice: "ڈیوائس ان بلاک کریں",
    priorityBoost: "ترجیحی تیز رفتاری",

    // Speed test
    speedTestTitle: "براڈ بینڈ اسپیڈ ٹیسٹ",
    testingDownload: "ڈاؤن لوڈ اسپیڈ چیک ہو رہی ہے...",
    testingUpload: "اپ لوڈ اسپیڈ چیک ہو رہی ہے...",
    testingPing: "پنگ ناپی جا رہی ہے...",
    testComplete: "ٹیسٹ مکمل ہو گیا!",
    recommendation: "سفارشات",

    // AI
    aiTitle: "اے آئی وائی فائی اسسٹنٹ",
    aiSubtitle: "انٹرنیٹ کے مسائل اور سیٹنگز کے لیے سمارٹ اے آئی کی مدد حاصل کریں۔",
    typeMessage: "اپنا سوال لکھیں یا مسئلہ بیان کریں...",
    quickQuestions: "عام سوالات",

    // Bills
    billingHistory: "بل اور ہسٹری",
    invoiceNo: "انائس نمبر",
    dueDate: "آخری تاریخ",
    amount: "رقم",
    status: "حالت",
    downloadInvoice: "رسید ڈاؤن لوڈ کریں",
    paymentMethods: "ادائیگی کا طریقہ منتخب کریں",
    jazzcash: "جاز کیش کیش والٹ",
    easypaisa: "ایزی پیسہ والٹ",
    creditCard: "ڈیبٹ / کریڈٹ کارڈ",
    bankTransfer: "بینک ٹرانسفر",

    // Support
    supportCenterTitle: "کسٹمر سپورٹ اور رہنمائی",
    faqSection: "عام وائی فائی حل",
    myTickets: "میری شکایتیں",
    createNewTicket: "نئی شکایت درج کریں",

    // Offers
    promotionsTitle: "خاص ڈسکاؤنٹ اور انعامات",
    referralTitle: "دوستوں کو دعوت دیں اور PKR 1,000 پائیں",
    yourReferralCode: "آپ کا ریفرل کوڈ",

    // Settings
    settingsTitle: "اکاؤنٹ اور سیٹنگز",
    notifications: "نوٹیفکیشن کی سیٹنگز",
    smsAlerts: "ایس ایم ایس الرٹس",
    emailAlerts: "ای میل انوائسز",
    pushAlerts: "پش نوٹیفکیشنز",
    themeMode: "ڈسپلے موڈ",
  }
};
