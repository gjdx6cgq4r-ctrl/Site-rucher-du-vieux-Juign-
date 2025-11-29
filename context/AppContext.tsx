
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AppState, AppContextType, Product, BlogPost, SiteContent, MediaItem, FlyingItem, FAQItem } from '../types';
import { INITIAL_STATE } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('rucher');

  // Persistence for App State
  useEffect(() => {
    const saved = localStorage.getItem('rucher_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.content.socialLinks) {
            parsed.content.socialLinks = INITIAL_STATE.content.socialLinks;
        }
        // Migration: add faqItems if missing
        if (!parsed.faqItems) {
            parsed.faqItems = INITIAL_STATE.faqItems;
        }
        setState({ ...parsed, flyingItems: [] });
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  useEffect(() => {
    try {
      const { flyingItems, ...toSave } = state;
      localStorage.setItem('rucher_state', JSON.stringify(toSave));
    } catch (e) {
      console.warn("LocalStorage limit reached.", e);
    }
  }, [state]);

  // Auth Persistence (Session Storage) & Password Persistence (Local Storage)
  useEffect(() => {
    const auth = sessionStorage.getItem('rucher_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    const savedPwd = localStorage.getItem('rucher_pwd');
    if (savedPwd) {
      setAdminPassword(savedPwd);
    }
  }, []);

  const login = (password: string) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('rucher_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rucher_auth');
  };

  const changePassword = (current: string, newPwd: string) => {
    if (current === adminPassword) {
      setAdminPassword(newPwd);
      localStorage.setItem('rucher_pwd', newPwd);
      return true;
    }
    return false;
  };

  const updateContent = (key: keyof SiteContent, value: any) => {
    setState(prev => ({
      ...prev,
      content: { ...prev.content, [key]: value }
    }));
  };

  const updateProduct = (updatedProduct: Product) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    }));
  };

  const addProduct = (product: Product) => {
    setState(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
  };

  const deleteProduct = (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setState(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
    }));
  };

  const addBlogPost = (post: BlogPost) => {
    setState(prev => ({
      ...prev,
      blogPosts: [...prev.blogPosts, post]
    }));
  };

  const deleteBlogPost = (id: string) => {
    setState(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(p => p.id !== id)
    }));
  };

  const addMedia = (item: MediaItem) => {
    setState(prev => ({
      ...prev,
      mediaLibrary: [item, ...prev.mediaLibrary]
    }));
  };

  const deleteMedia = (id: string) => {
    setState(prev => ({
      ...prev,
      mediaLibrary: prev.mediaLibrary.filter(m => m.id !== id)
    }));
  };

  // FAQ CRUD
  const addFAQ = (item: FAQItem) => {
    setState(prev => ({
      ...prev,
      faqItems: [...prev.faqItems, item]
    }));
  };

  const deleteFAQ = (id: string) => {
    setState(prev => ({
      ...prev,
      faqItems: prev.faqItems.filter(item => item.id !== id)
    }));
  };

  const updateFAQ = (updatedItem: FAQItem) => {
    setState(prev => ({
      ...prev,
      faqItems: prev.faqItems.map(item => item.id === updatedItem.id ? updatedItem : item)
    }));
  };

  const setThemeColor = (color: string) => {
    setState(prev => ({ ...prev, themeColor: color }));
  };

  // Cart Functions
  const addToCart = (product: Product) => {
    setState(prev => {
      const existingItem = prev.cart.find(item => item.id === product.id);
      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...product, quantity: 1 }]
      };
    });
  };

  const removeFromCart = (id: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== id)
    }));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    }));
  };

  const clearCart = () => {
    setState(prev => ({
      ...prev,
      cart: []
    }));
  };

  // Animation Functions
  const triggerAddAnimation = (rect: DOMRect, image: string) => {
    const newItem: FlyingItem = {
      id: Date.now(),
      image,
      startRect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }
    };

    setState(prev => ({
      ...prev,
      flyingItems: [...prev.flyingItems, newItem]
    }));
  };

  const removeFlyingItem = (id: number) => {
    setState(prev => ({
      ...prev,
      flyingItems: prev.flyingItems.filter(item => item.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      updateContent,
      updateProduct,
      addProduct,
      deleteProduct,
      updateBlogPost,
      addBlogPost,
      deleteBlogPost,
      addMedia,
      deleteMedia,
      addFAQ,
      deleteFAQ,
      updateFAQ,
      setThemeColor,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      triggerAddAnimation,
      removeFlyingItem,
      isAuthenticated,
      login,
      logout,
      changePassword
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
