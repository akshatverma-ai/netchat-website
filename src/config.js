export const appConfig = {
  appName: "Netchat",
  tagline: "Messaging beyond ordinary connectivity.",
  subtitle: "Decentralized Peer-to-Peer & Mesh Messenger for Android",
  version: "1.0.2",
  versionCode: 3,
  releaseDate: "November 3, 2026",
  apkSizeFormatted: "14.6 MB",
  apkSizeBytes: 15319704,
  minAndroid: "Android 8.0+ (API 26)",
  targetAndroid: "Android 15 (API 35)",
  packageName: "com.netchat.app",
  architecture: "Universal (arm64-v8a, armeabi-v7a, x86_64)",

  download: {
    // Configurable official release download
    isReleaseReady: true,
    apkUrl: "https://github.com/akshatverma-ai/netchat-website/releases/download/v1.0.2/Netchat.apk",
    filename: "Netchat.apk",
    notReadyMessage: "The official release APK is currently being prepared. Check back shortly."
  },

  screens: [
    {
      id: "splash",
      num: "01",
      title: "Splash & Init",
      badge: "Splash",
      caption: "Cold-start initialization with Curve25519 keystore and local SQLite database readiness.",
      src: "/screenshots/phone_splash.png",
      statusText: "Fully Implemented in Source"
    },
    {
      id: "chats",
      num: "02",
      title: "Chats & Contacts",
      badge: "Chats Hub",
      caption: "Contact list, conversation search, unread message indicators, and peer filtering.",
      src: "/screenshots/phone_chats.png",
      statusText: "Fully Implemented in Source"
    },
    {
      id: "conversation",
      num: "03",
      title: "End-to-End Encrypted Chat",
      badge: "Conversation",
      caption: "Vibrant purple-pink-cyan chat bubbles with zero-server peer messaging.",
      src: "/screenshots/phone_conversation.png",
      statusText: "Fully Implemented in Source"
    },
    {
      id: "groups",
      num: "04",
      title: "Mesh Community & Channels",
      badge: "Mesh Groups",
      caption: "Multi-peer channels and group discussions organized by topic.",
      src: "/screenshots/phone_groups.png",
      statusText: "Fully Implemented in Source"
    },
    {
      id: "calls",
      num: "05",
      title: "Calls & Direct Signaling",
      badge: "Mesh Calls",
      caption: "P2P voice and video call signaling logged directly to local SQLite storage.",
      src: "/screenshots/phone_calls.png",
      statusText: "Signaling Implemented (Codec Phase 2)"
    },
    {
      id: "nearby",
      num: "06",
      title: "Nearby Internet Sharing",
      badge: "Internet Sharing",
      caption: "Peer-to-peer hotspot internet sharing using dynamic password authentication between verified phone numbers.",
      src: "/screenshots/phone_nearby.png",
      statusText: "Fully Implemented in Source"
    },
    {
      id: "outbox",
      num: "07",
      title: "Offline Outbox Queue",
      badge: "Offline Outbox",
      caption: "Encrypted envelopes staged in local SQLite with hop TTL and manual queue flushing.",
      src: "/screenshots/phone_outbox.png",
      statusText: "Fully Implemented in Source"
    },
    {
      id: "settings",
      num: "08",
      title: "Settings & Privacy",
      badge: "Settings",
      caption: "Verified Firebase Phone OTP identity, Curve25519 keys, and SQLite database storage.",
      src: "/screenshots/phone_settings.png",
      statusText: "Fully Implemented in Source"
    }
  ],

  features: [
    {
      title: "Zero-Server Direct Messaging",
      description: "Direct peer-to-peer messaging without centralized servers. Messages and threads persist securely in local SQLite.",
      statusText: "Implemented",
      badge: "SQLite Stored"
    },
    {
      title: "Nearby Internet Sharing",
      description: "Secure P2P hotspot internet sharing between verified phone numbers authenticated via dynamic passwords.",
      statusText: "Implemented",
      badge: "Hotspot Sharing"
    },
    {
      title: "Offline Outbox Queue",
      description: "Store-and-forward queue staged in local SQLite that holds envelopes until an internet bridge or peer is reachable.",
      statusText: "Implemented",
      badge: "Store-and-Forward"
    },
    {
      title: "Verified Phone Authentication",
      description: "Authentic phone-number-based login and OTP verification powered by Firebase Authentication.",
      statusText: "Implemented",
      badge: "Firebase Phone OTP"
    },
    {
      title: "P2P Call Signaling",
      description: "Local call session logging and Wi-Fi Aware Direct signaling in SQLite. Hardware Opus codec active in Phase 2.",
      statusText: "Signaling Active (Phase 2 Codec)",
      badge: "Local Signaling"
    },
    {
      title: "Decentralized Group Channels",
      description: "Topic-based community mesh channels and multi-peer group discussions with local persistence.",
      statusText: "Implemented",
      badge: "Group Routing"
    }
  ],

  faqs: [
    {
      question: "How does Netchat communicate without cellular data or internet?",
      answer: "Netchat utilizes direct device-to-device radio protocols (Bluetooth Low Energy and Wi-Fi Aware Direct) alongside local SQLite persistence. Messages are sealed into authenticated binary envelopes and can be forwarded peer-to-peer or staged in the offline outbox until connectivity is established."
    },
    {
      question: "What is the Nearby Internet Sharing feature?",
      answer: "Nearby Internet Sharing allows a user with cellular data or internet to act as a hotspot provider for nearby Netchat peers. Connections are authenticated using dynamic one-time passwords shared directly between verified phone numbers."
    },
    {
      question: "Why is Netchat distributed directly as an APK?",
      answer: "Direct distribution ensures censorship resistance, direct peer-to-peer sharing in remote areas, and complete privacy without requiring a Google Play account."
    },
    {
      question: "What are the minimum Android OS requirements?",
      answer: "Netchat requires Android 8.0 (Oreo, API level 26) or higher and supports Android 14 and Android 15 (targetSdk 35)."
    }
  ],

  contactEmail: "support@netchat.mesh"
};
