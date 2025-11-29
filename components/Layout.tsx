
import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Facebook, Instagram, Linkedin, Twitter, Video, Hexagon, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Youtube } from 'lucide-react';

// Composant interne pour gérer l'animation d'un seul item volant
const FlyingProduct = ({ item, cartBtnRef, onComplete }: { item: any, cartBtnRef: React.RefObject<HTMLButtonElement>, onComplete: (id: number) => void }) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: item.startRect.top,
    left: item.startRect.left,
    width: 50,
    height: 50,
    zIndex: 9999,
    opacity: 1,
    transform: 'scale(1)',
    transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    pointerEvents: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
  });

  useEffect(() => {
    if (cartBtnRef.current) {
      const destRect = cartBtnRef.current.getBoundingClientRect();
      
      // Petit délai pour permettre au navigateur de rendre la position initiale avant de changer
      const timer = setTimeout(() => {
        setStyle(prev => ({
          ...prev,
          top: destRect.top + (destRect.height / 2) - 25, // Centre verticalement (50/2)
          left: destRect.left + (destRect.width / 2) - 25, // Centre horizontalement
          transform: 'scale(0.2)',
          opacity: 0.5
        }));
      }, 50);

      const cleanupTimer = setTimeout(() => {
        onComplete(item.id);
      }, 850); // Un peu plus que la transition pour être sûr

      return () => { clearTimeout(timer); clearTimeout(cleanupTimer); };
    }
  }, [cartBtnRef, item, onComplete]);

  return (
    <img 
      src={item.image} 
      alt="" 
      style={style} 
      className="object-cover border-2 border-white bg-white"
    />
  );
};

const Layout = () => {
  const { content, cart, removeFromCart, updateCartQuantity, flyingItems, removeFlyingItem } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  
  const cartBtnRef = useRef<HTMLButtonElement>(null);
  const mobileCartBtnRef = useRef<HTMLButtonElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À Propos' },
    { path: '/products', label: 'Nos Miels' },
    { path: '/blog', label: 'Le Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Effet de "bump" sur le panier quand un item arrive
  useEffect(() => {
    if (flyingItems.length > 0) {
      const timer = setTimeout(() => {
        setCartBump(true);
        setTimeout(() => setCartBump(false), 200);
      }, 700); // Synchro avec l'arrivée de l'animation
      return () => clearTimeout(timer);
    }
  }, [flyingItems]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/contact');
  };

  const getSocialIcon = (platform: string, size: number = 20) => {
    switch(platform) {
      case 'facebook': return <Facebook size={size} />;
      case 'instagram': return <Instagram size={size} />;
      case 'linkedin': return <Linkedin size={size} />;
      case 'twitter': return <Twitter size={size} />;
      case 'tiktok': return <Video size={size} />; 
      case 'youtube': return <Youtube size={size} />;
      default: return <Facebook size={size} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Flying Items Layer */}
      {flyingItems.map(item => (
        <FlyingProduct 
          key={item.id} 
          item={item} 
          cartBtnRef={window.innerWidth >= 768 ? cartBtnRef : mobileCartBtnRef} 
          onComplete={removeFlyingItem} 
        />
      ))}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-honey-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              {content.logoUrl ? (
                <img 
                  src={content.logoUrl} 
                  alt="Logo" 
                  className="h-10 w-auto object-contain max-w-[150px]"
                />
              ) : (
                <Hexagon className="h-8 w-8 text-honey-500 fill-honey-100 group-hover:rotate-12 transition-transform" />
              )}
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-neutral-900 leading-none">Le Rucher</span>
                <span className="text-xs text-honey-600 uppercase tracking-widest">Du Vieux Juigné</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path) 
                      ? 'text-honey-600' 
                      : 'text-neutral-600 hover:text-honey-500'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-honey-500 rounded-full" />
                  )}
                </Link>
              ))}
              
              {/* Cart Button (Desktop) */}
              <button 
                ref={cartBtnRef}
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 text-neutral-600 hover:text-honey-600 transition-transform duration-200 ${cartBump ? 'scale-125 text-honey-600' : ''}`}
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-honey-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                ref={mobileCartBtnRef}
                onClick={() => setIsCartOpen(true)}
                className={`relative text-neutral-600 hover:text-honey-600 focus:outline-none transition-transform duration-200 ${cartBump ? 'scale-125 text-honey-600' : ''}`}
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-honey-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-neutral-600 hover:text-honey-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-honey-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-honey-50 text-honey-700'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-honey-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer / Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-slideInRight">
            <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-honey-50">
              <h2 className="text-xl font-serif font-bold text-neutral-800 flex items-center gap-2">
                <ShoppingCart className="text-honey-600" /> Mon Panier
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-neutral-500 hover:text-neutral-800">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 space-y-4">
                  <ShoppingCart size={64} className="opacity-20" />
                  <p className="text-lg">Votre panier est vide pour le moment.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); navigate('/products'); }}
                    className="mt-4 text-honey-600 font-medium hover:underline"
                  >
                    Découvrir nos miels
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white border border-neutral-100 p-3 rounded-xl shadow-sm">
                      <div className="w-20 h-20 shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        {/* Header: Name & Trash */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-neutral-800 text-sm">{item.name}</h3>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-wide">{item.unit}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-300 hover:text-red-500 p-1"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        {/* Footer: Price | Qty | Total */}
                        <div className="flex items-center justify-between mt-auto bg-neutral-50 rounded-lg p-2">
                          {/* Left: Unit Price */}
                          <div className="text-xs font-medium text-neutral-500">
                            {item.price.toFixed(2)}€
                          </div>
                          
                          {/* Middle: Quantity */}
                          <div className="flex items-center gap-2 bg-white rounded shadow-sm border border-neutral-100 px-1">
                            <button 
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="text-neutral-400 hover:text-honey-600 disabled:opacity-30 w-5 h-5 flex items-center justify-center"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="text-neutral-400 hover:text-honey-600 w-5 h-5 flex items-center justify-center"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          
                          {/* Right: Total Line */}
                          <div className="font-bold text-honey-600 text-sm">
                            {(item.price * item.quantity).toFixed(2)}€
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-neutral-600">Total estimé</span>
                  <span className="text-2xl font-bold text-neutral-900">{totalPrice.toFixed(2)} €</span>
                </div>
                <p className="text-xs text-neutral-500 mb-4 text-center">
                  Le paiement et la livraison se règlent directement avec l'apiculteur.
                </p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-honey-500 hover:bg-honey-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-honey-500/20 transition-all flex items-center justify-center gap-2"
                >
                  Valider ma commande <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Column 1 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {content.logoUrl ? (
                  <img src={content.logoUrl} alt="Logo" className="h-8 w-auto object-contain brightness-0 invert" />
                ) : (
                  <Hexagon className="h-6 w-6 text-honey-500" />
                )}
                <span className="font-serif font-bold text-lg">Le Rucher Du Vieux Juigné</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Une production locale et artisanale, respectueuse de l'environnement et de nos abeilles. Retrouvez le goût authentique de la nature.
              </p>
              <div className="flex space-x-4 flex-wrap gap-y-2">
                {(content.socialLinks || []).map((link) => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-neutral-400 hover:text-honey-400 transition-colors"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-honey-400 font-bold mb-4 uppercase text-sm tracking-wider">Navigation</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li><Link to="/products" className="hover:text-white transition-colors">Nos Miels</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Notre Histoire</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog Apicole</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
                <li><Link to="/admin" className="text-honey-500 hover:text-honey-400 font-semibold transition-colors">Accès Admin</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-honey-400 font-bold mb-4 uppercase text-sm tracking-wider">Contact</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>{content.contactAddress}</li>
                <li><a href={`mailto:${content.contactEmail}`} className="hover:text-white">{content.contactEmail}</a></li>
                <li>{content.contactPhone}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Le Rucher Du Vieux Juigné. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
