/**
 * Android App Templates - 30+ Templates
 */

export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  screens: string[];
  permissions: string[];
  dependencies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const ANDROID_TEMPLATES: AppTemplate[] = [
  // Productivity
  {
    id: 'todo-app',
    name: 'Todo List',
    description: 'Task management app with CRUD operations',
    category: 'productivity',
    features: ['add-task', 'delete-task', 'mark-complete', 'categories', 'local-storage'],
    screens: ['Home', 'AddTask', 'Settings'],
    permissions: [],
    dependencies: ['room', 'hilt'],
    difficulty: 'beginner'
  },
  {
    id: 'note-app',
    name: 'Notes',
    description: 'Notes and memo app with rich text',
    category: 'productivity',
    features: ['create-note', 'rich-text', 'categories', 'search', 'backup'],
    screens: ['Home', 'NoteEditor', 'Categories'],
    permissions: [],
    dependencies: ['room', 'hilt'],
    difficulty: 'beginner'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Event calendar with reminders',
    category: 'productivity',
    features: ['events', 'reminders', 'recurring', 'notifications'],
    screens: ['Calendar', 'EventDetail', 'AddEvent'],
    permissions: ['READ_CALENDAR', 'WRITE_CALENDAR'],
    dependencies: ['room', 'calendar-view'],
    difficulty: 'intermediate'
  },
  {
    id: 'bookmarks',
    name: 'Bookmarks',
    description: 'Save and organize bookmarks',
    category: 'productivity',
    features: ['save-bookmark', 'folders', 'sync', 'import-export'],
    screens: ['Home', 'AddBookmark', 'Folders'],
    permissions: ['INTERNET'],
    dependencies: ['room', 'retrofit'],
    difficulty: 'beginner'
  },

  // Utilities
  {
    id: 'weather-app',
    name: 'Weather',
    description: 'Weather forecast app with location',
    category: 'utilities',
    features: ['current-weather', 'forecast', 'location', 'search', 'widgets'],
    screens: ['Home', 'Search', 'Details', 'Settings'],
    permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION'],
    dependencies: ['retrofit', 'coil', 'widget'],
    difficulty: 'intermediate'
  },
  {
    id: 'flashlight',
    name: 'Flashlight',
    description: 'Flashlight with strobe and SOS modes',
    category: 'utilities',
    features: ['flashlight', 'strobe', 'sos', 'brightness'],
    screens: ['Home', 'Settings'],
    permissions: ['CAMERA', 'FLASHLIGHT'],
    dependencies: [],
    difficulty: 'beginner'
  },
  {
    id: 'qr-scanner',
    name: 'QR Scanner',
    description: 'Scan QR codes and barcodes',
    category: 'utilities',
    features: ['scan-qr', 'scan-barcode', 'history', 'create-qr'],
    screens: ['Scanner', 'History', 'Create'],
    permissions: ['CAMERA'],
    dependencies: ['mlkit-barcode'],
    difficulty: 'intermediate'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between units',
    category: 'utilities',
    features: ['convert', 'categories', 'favorites'],
    screens: ['Home', 'Favorites'],
    permissions: [],
    dependencies: [],
    difficulty: 'beginner'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Scientific calculator',
    category: 'utilities',
    features: ['basic-calc', 'scientific', 'history'],
    screens: ['Calculator', 'History'],
    permissions: [],
    dependencies: [],
    difficulty: 'beginner'
  },

  // Health & Fitness
  {
    id: 'fitness-tracker',
    name: 'Fitness Tracker',
    description: 'Track workouts and health data',
    category: 'health',
    features: ['workouts', 'steps', 'calories', 'charts', 'goals'],
    screens: ['Home', 'Workouts', 'Progress', 'Profile'],
    permissions: ['ACTIVITY_RECOGNITION', 'BODY_SENSORS'],
    dependencies: ['room', 'mpchart', 'health-connect'],
    difficulty: 'intermediate'
  },
  {
    id: 'meditation',
    name: 'Meditation',
    description: 'Meditation and sleep sounds',
    category: 'health',
    features: ['meditations', 'sleep-sounds', 'timer', 'progress'],
    screens: ['Home', 'Meditate', 'Sleep', 'Profile'],
    permissions: ['INTERNET'],
    dependencies: ['media-player', 'exoplayer'],
    difficulty: 'intermediate'
  },
  {
    id: 'water-tracker',
    name: 'Water Tracker',
    description: 'Track daily water intake',
    category: 'health',
    features: ['track-water', 'reminders', 'goals', 'history'],
    screens: ['Home', 'History', 'Settings'],
    permissions: [],
    dependencies: ['room', 'widget'],
    difficulty: 'beginner'
  },
  {
    id: 'weight-tracker',
    name: 'Weight Tracker',
    description: 'Track weight and BMI',
    category: 'health',
    features: ['log-weight', 'charts', 'goals', 'bmi'],
    screens: ['Home', 'History', 'Goals'],
    permissions: [],
    dependencies: ['room', 'mpchart'],
    difficulty: 'beginner'
  },
  {
    id: 'sleep-tracker',
    name: 'Sleep Tracker',
    description: 'Monitor sleep patterns',
    category: 'health',
    features: ['track-sleep', 'alarm', 'analysis', 'reports'],
    screens: ['Home', 'SleepAnalysis', 'Alarms'],
    permissions: ['ACTIVITY_RECOGNITION'],
    dependencies: ['room', 'health-connect'],
    difficulty: 'advanced'
  },

  // Social
  {
    id: 'social-feed',
    name: 'Social Feed',
    description: 'Social media feed with posts and likes',
    category: 'social',
    features: ['posts', 'likes', 'comments', 'user-profiles', 'image-upload'],
    screens: ['Feed', 'Post', 'Profile', 'CreatePost'],
    permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'INTERNET'],
    dependencies: ['coil', 'retrofit', 'socket-io'],
    difficulty: 'advanced'
  },
  {
    id: 'chat-app',
    name: 'Messaging',
    description: 'Real-time messaging app',
    category: 'social',
    features: ['messages', 'contacts', 'media', 'notifications', 'encryption'],
    screens: ['Chats', 'Conversation', 'Contacts', 'Settings'],
    permissions: ['INTERNET', 'NOTIFICATIONS', 'CAMERA'],
    dependencies: ['retrofit', 'socket-io', 'encryption'],
    difficulty: 'advanced'
  },
  {
    id: 'dating-app',
    name: 'Dating',
    description: 'Dating app with profiles and matching',
    category: 'social',
    features: ['profiles', 'matching', 'chat', 'location'],
    screens: ['Discover', 'Matches', 'Chat', 'Profile'],
    permissions: ['CAMERA', 'LOCATION', 'INTERNET'],
    dependencies: ['retrofit', 'socket-io'],
    difficulty: 'advanced'
  },

  // E-commerce
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online shopping app with cart',
    category: 'shopping',
    features: ['products', 'categories', 'cart', 'checkout', 'orders', 'payments'],
    screens: ['Home', 'ProductList', 'ProductDetail', 'Cart', 'Checkout', 'Orders'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'room', 'payments'],
    difficulty: 'advanced'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Buy and sell items',
    category: 'shopping',
    features: ['list-item', 'browse', 'search', 'messaging', 'favorites'],
    screens: ['Home', 'Listing', 'ItemDetail', 'Messages'],
    permissions: ['CAMERA', 'LOCATION', 'INTERNET'],
    dependencies: ['retrofit', 'coil'],
    difficulty: 'intermediate'
  },
  {
    id: 'price-tracker',
    name: 'Price Tracker',
    description: 'Track product prices',
    category: 'shopping',
    features: ['track-price', 'alerts', 'history', 'browse'],
    screens: ['Home', 'AddProduct', 'Alerts'],
    permissions: ['INTERNET', 'NOTIFICATIONS'],
    dependencies: ['retrofit', 'room'],
    difficulty: 'intermediate'
  },

  // Food & Drink
  {
    id: 'food-delivery',
    name: 'Food Delivery',
    description: 'Order food from restaurants',
    category: 'food',
    features: ['restaurants', 'menu', 'cart', 'order-tracking', 'location'],
    screens: ['Home', 'Restaurant', 'Menu', 'Cart', 'Tracking'],
    permissions: ['ACCESS_FINE_LOCATION', 'INTERNET'],
    dependencies: ['retrofit', 'google-maps'],
    difficulty: 'advanced'
  },
  {
    id: 'recipe-app',
    name: 'Recipe Book',
    description: 'Search and save recipes',
    category: 'food',
    features: ['recipes', 'search', 'favorites', 'shopping-list'],
    screens: ['Home', 'RecipeDetail', 'Search', 'Favorites'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'room'],
    difficulty: 'beginner'
  },
  {
    id: 'meal-planner',
    name: 'Meal Planner',
    description: 'Plan weekly meals',
    category: 'food',
    features: ['meal-plan', 'recipes', 'shopping-list', 'calories'],
    screens: ['Home', 'WeeklyPlan', 'ShoppingList'],
    permissions: ['INTERNET'],
    dependencies: ['room', 'mpchart'],
    difficulty: 'intermediate'
  },
  {
    id: 'restaurant-finder',
    name: 'Restaurant Finder',
    description: 'Find nearby restaurants',
    category: 'food',
    features: ['nearby', 'reviews', 'maps', 'reservations'],
    screens: ['Home', 'RestaurantDetail', 'Map'],
    permissions: ['LOCATION', 'INTERNET'],
    dependencies: ['retrofit', 'google-maps'],
    difficulty: 'intermediate'
  },

  // Finance
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Track income and expenses',
    category: 'finance',
    features: ['transactions', 'categories', 'charts', 'budgets'],
    screens: ['Home', 'AddTransaction', 'Reports', 'Budgets'],
    permissions: [],
    dependencies: ['room', 'mpchart'],
    difficulty: 'intermediate'
  },
  {
    id: 'crypto-tracker',
    name: 'Crypto Tracker',
    description: 'Cryptocurrency prices and portfolio',
    category: 'finance',
    features: ['prices', 'portfolio', 'charts', 'alerts'],
    screens: ['Home', 'Detail', 'Portfolio', 'Alerts'],
    permissions: ['INTERNET', 'NOTIFICATIONS'],
    dependencies: ['retrofit', 'mpchart'],
    difficulty: 'intermediate'
  },
  {
    id: 'budget-app',
    name: 'Budget Manager',
    description: 'Manage budgets and savings goals',
    category: 'finance',
    features: ['budgets', 'goals', 'savings', 'reports'],
    screens: ['Home', 'Budgets', 'Goals', 'Reports'],
    permissions: [],
    dependencies: ['room'],
    difficulty: 'intermediate'
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Create and send invoices',
    category: 'finance',
    features: ['create-invoice', 'clients', 'pdf-export', 'history'],
    screens: ['Home', 'CreateInvoice', 'Clients'],
    permissions: [],
    dependencies: ['room', 'pdf-generator'],
    difficulty: 'advanced'
  },

  // Education
  {
    id: 'language-learning',
    name: 'Language Learning',
    description: 'Learn new languages with lessons',
    category: 'education',
    features: ['lessons', 'quizzes', 'progress', 'audio', 'flashcards'],
    screens: ['Home', 'Lesson', 'Quiz', 'Progress'],
    permissions: ['INTERNET'],
    dependencies: ['room', 'media-player'],
    difficulty: 'intermediate'
  },
  {
    id: 'flashcards',
    name: 'Flashcards',
    description: 'Study with flashcards',
    category: 'education',
    features: ['decks', 'flashcards', 'study-mode', 'spaced-repetition'],
    screens: ['Home', 'Deck', 'Study', 'Stats'],
    permissions: [],
    dependencies: ['room'],
    difficulty: 'beginner'
  },
  {
    id: 'online-course',
    name: 'Online Course',
    description: 'Watch educational courses',
    category: 'education',
    features: ['courses', 'videos', 'progress', 'certificates'],
    screens: ['Home', 'Course', 'Video', 'Profile'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'exoplayer'],
    difficulty: 'intermediate'
  },

  // Entertainment
  {
    id: 'video-player',
    name: 'Video Player',
    description: 'Video streaming and playback',
    category: 'entertainment',
    features: ['streaming', 'playback', 'subtitles', 'playlists'],
    screens: ['Home', 'Player', 'Library', 'Settings'],
    permissions: ['INTERNET', 'READ_EXTERNAL_STORAGE'],
    dependencies: ['exoplayer'],
    difficulty: 'intermediate'
  },
  {
    id: 'music-player',
    name: 'Music Player',
    description: 'Music streaming app',
    category: 'entertainment',
    features: ['streaming', 'playlists', 'library', 'equalizer'],
    screens: ['Home', 'Player', 'Library', 'Search'],
    permissions: ['INTERNET', 'READ_EXTERNAL_STORAGE', 'FOREGROUND_SERVICE'],
    dependencies: ['media-player', 'exoplayer'],
    difficulty: 'intermediate'
  },
  {
    id: 'podcast-app',
    name: 'Podcasts',
    description: 'Podcast player and discovery',
    category: 'entertainment',
    features: ['podcasts', 'episodes', 'downloads', 'subscriptions'],
    screens: ['Home', 'Podcast', 'Episode', 'Downloads'],
    permissions: ['INTERNET', 'FOREGROUND_SERVICE'],
    dependencies: ['retrofit', 'media-player'],
    difficulty: 'advanced'
  },
  {
    id: 'movie-guide',
    name: 'Movie Guide',
    description: 'Browse movies and showtimes',
    category: 'entertainment',
    features: ['movies', 'showtimes', 'reviews', 'favorites'],
    screens: ['Home', 'MovieDetail', 'Search', 'Favorites'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'coil'],
    difficulty: 'intermediate'
  },

  // Travel
  {
    id: 'travel-planner',
    name: 'Travel Planner',
    description: 'Plan trips and itineraries',
    category: 'travel',
    features: ['trips', 'itinerary', 'bookings', 'maps'],
    screens: ['Home', 'TripDetail', 'AddTrip'],
    permissions: ['LOCATION', 'INTERNET'],
    dependencies: ['room', 'google-maps'],
    difficulty: 'intermediate'
  },
  {
    id: 'hotel-booking',
    name: 'Hotel Booking',
    description: 'Find and book hotels',
    category: 'travel',
    features: ['hotels', 'search', 'filters', 'bookings'],
    screens: ['Home', 'HotelDetail', 'Booking', 'MyBookings'],
    permissions: ['INTERNET', 'LOCATION'],
    dependencies: ['retrofit'],
    difficulty: 'advanced'
  },
  {
    id: 'flight-tracker',
    name: 'Flight Tracker',
    description: 'Track flights in real-time',
    category: 'travel',
    features: ['track-flights', 'airports', 'arrivals', 'notifications'],
    screens: ['Home', 'FlightDetail', 'Search'],
    permissions: ['INTERNET', 'NOTIFICATIONS'],
    dependencies: ['retrofit'],
    difficulty: 'intermediate'
  },

  // AR & Advanced
  {
    id: 'ar-furniture',
    name: 'AR Furniture',
    description: 'View furniture in AR',
    category: 'shopping',
    features: ['ar-view', 'product-catalog', 'favorites', 'measure'],
    screens: ['Catalog', 'ProductDetail', 'ARView'],
    permissions: ['CAMERA', 'INTERNET'],
    dependencies: ['arcore', 'sceneform'],
    difficulty: 'advanced'
  },
  {
    id: 'ar-measure',
    name: 'AR Measure',
    description: 'Measure objects with AR',
    category: 'utilities',
    features: ['ar-measure', 'history', 'export'],
    screens: ['Measure', 'History', 'Settings'],
    permissions: ['CAMERA'],
    dependencies: ['arcore'],
    difficulty: 'advanced'
  },

  // Business
  {
    id: 'crm-app',
    name: 'CRM',
    description: 'Customer relationship management',
    category: 'business',
    features: ['contacts', 'deals', 'tasks', 'pipeline'],
    screens: ['Home', 'Contacts', 'Deals', 'Tasks'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'room'],
    difficulty: 'advanced'
  },
  {
    id: 'inventory-manager',
    name: 'Inventory',
    description: 'Manage inventory and stock',
    category: 'business',
    features: ['products', 'stock', 'orders', 'reports'],
    screens: ['Home', 'Products', 'AddProduct', 'Reports'],
    permissions: ['CAMERA', 'INTERNET'],
    dependencies: ['room', 'retrofit'],
    difficulty: 'advanced'
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    description: 'Manage projects and tasks',
    category: 'business',
    features: ['projects', 'tasks', 'team', 'gantt-chart'],
    screens: ['Home', 'ProjectDetail', 'Tasks', 'Team'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'mpchart'],
    difficulty: 'advanced'
  },

  // News
  {
    id: 'news-reader',
    name: 'News Reader',
    description: 'News articles and RSS',
    category: 'news',
    features: ['articles', 'categories', 'bookmarks', 'offline-reading', 'rss'],
    screens: ['Home', 'Article', 'Categories', 'Bookmarks', 'RSS'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'room'],
    difficulty: 'intermediate'
  },
  {
    id: 'blog-reader',
    name: 'Blog Reader',
    description: 'Follow your favorite blogs',
    category: 'news',
    features: ['blogs', 'rss', 'read-later', 'dark-mode'],
    screens: ['Home', 'Feed', 'ReadLater'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'room'],
    difficulty: 'beginner'
  }
];

export { ANDROID_TEMPLATES as default };
