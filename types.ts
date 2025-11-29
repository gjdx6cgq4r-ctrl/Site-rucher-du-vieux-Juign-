
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: 'miel' | 'essaim' | 'autre';
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  metaTitle?: string;
  metaDescription?: string;
}

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ValueItem {
  id: string;
  icon: string; // 'Leaf', 'Heart', 'Star', etc.
  title: string;
  text: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  aboutText: string;
  aboutHistory: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: SocialLink[];
  logoUrl?: string;
  values: ValueItem[];
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: 'image';
}

export interface FlyingItem {
  id: number;
  image: string;
  startRect: { top: number; left: number; width: number; height: number };
}

export interface AppState {
  products: Product[];
  blogPosts: BlogPost[];
  content: SiteContent;
  faqItems: FAQItem[];
  mediaLibrary: MediaItem[];
  themeColor: string;
  cart: CartItem[];
  flyingItems: FlyingItem[];
}

export interface AppContextType extends AppState {
  updateContent: (key: keyof SiteContent, value: any) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateBlogPost: (post: BlogPost) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addMedia: (item: MediaItem) => void;
  deleteMedia: (id: string) => void;
  
  // FAQ CRUD
  addFAQ: (item: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  updateFAQ: (item: FAQItem) => void;

  setThemeColor: (color: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  triggerAddAnimation: (rect: DOMRect, image: string) => void;
  removeFlyingItem: (id: number) => void;
  // Auth
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}