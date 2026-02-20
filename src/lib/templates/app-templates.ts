/**
 * Android App Templates
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
    id: 'weather-app',
    name: 'Weather',
    description: 'Weather forecast app with location',
    category: 'utilities',
    features: ['current-weather', 'forecast', 'location', 'search'],
    screens: ['Home', 'Search', 'Details'],
    permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION'],
    dependencies: ['retrofit', 'coil'],
    difficulty: 'intermediate'
  },
  {
    id: 'fitness-tracker',
    name: 'Fitness Tracker',
    description: 'Track workouts and health data',
    category: 'health',
    features: ['workouts', 'steps', 'calories', 'charts', 'health-connect'],
    screens: ['Home', 'Workouts', 'Progress', 'Profile'],
    permissions: ['ACTIVITY_RECOGNITION', 'BODY_SENSORS'],
    dependencies: ['room', 'mpchart'],
    difficulty: 'intermediate'
  },
  {
    id: 'social-feed',
    name: 'Social Feed',
    description: 'Social media feed with posts and likes',
    category: 'social',
    features: ['posts', 'likes', 'comments', 'user-profiles', 'image-upload'],
    screens: ['Feed', 'Post', 'Profile', 'CreatePost'],
    permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'INTERNET'],
    dependencies: ['coil', 'retrofit'],
    difficulty: 'advanced'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online shopping app with cart',
    category: 'shopping',
    features: ['products', 'categories', 'cart', 'checkout', 'orders', 'payments'],
    screens: ['Home', 'ProductList', 'ProductDetail', 'Cart', 'Checkout', 'Orders'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'room'],
    difficulty: 'advanced'
  },
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
    id: 'chat-app',
    name: 'Messaging',
    description: 'Real-time messaging app',
    category: 'social',
    features: ['messages', 'contacts', 'media', 'notifications', 'encryption'],
    screens: ['Chats', 'Conversation', 'Contacts', 'Settings'],
    permissions: ['INTERNET', 'NOTIFICATIONS', 'CAMERA'],
    dependencies: ['retrofit', 'socket-io'],
    difficulty: 'advanced'
  },
  {
    id: 'news-reader',
    name: 'News Reader',
    description: 'News articles and RSS',
    category: 'news',
    features: ['articles', 'categories', 'bookmarks', 'offline-reading'],
    screens: ['Home', 'Article', 'Categories', 'Bookmarks'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'room'],
    difficulty: 'beginner'
  },
  {
    id: 'crypto-tracker',
    name: 'Crypto Tracker',
    description: 'Cryptocurrency prices and portfolio',
    category: 'finance',
    features: ['prices', 'portfolio', 'charts', 'alerts'],
    screens: ['Home', 'Detail', 'Portfolio', 'Alerts'],
    permissions: ['INTERNET'],
    dependencies: ['retrofit', 'mpchart'],
    difficulty: 'intermediate'
  },
  {
    id: 'language-learning',
    name: 'Language Learning',
    description: 'Learn new languages with lessons',
    category: 'education',
    features: ['lessons', 'quizzes', 'progress', 'audio'],
    screens: ['Home', 'Lesson', 'Quiz', 'Progress'],
    permissions: ['INTERNET'],
    dependencies: ['room', 'media-player'],
    difficulty: 'intermediate'
  },
  {
    id: 'ar-furniture',
    name: 'AR Furniture',
    description: 'View furniture in AR',
    category: 'shopping',
    features: ['ar-view', 'product-catalog', 'favorites'],
    screens: ['Catalog', 'ProductDetail', 'ARView'],
    permissions: ['CAMERA', 'INTERNET'],
    dependencies: ['arcore', 'sceneform'],
    difficulty: 'advanced'
  },
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
  }
];

export { ANDROID_TEMPLATES as default };
