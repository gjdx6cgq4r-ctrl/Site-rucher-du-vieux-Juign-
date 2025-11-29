
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowRight, Star, Heart, Leaf, ShoppingCart, HelpCircle, Shield, Award, Sun, Droplets, Hexagon } from 'lucide-react';
import { Product } from '../types';

const Home = () => {
  const { content, products, faqItems, addToCart, triggerAddAnimation } = useApp();
  const featuredProducts = products.slice(0, 3);
  const [currentFaqIndex, setCurrentFaqIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerAddAnimation(rect, product.image);
    addToCart(product);
  };

  // Rotation automatique de la FAQ
  useEffect(() => {
    if (faqItems.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFaqIndex((prev) => (prev + 1) % faqItems.length);
    }, 10000); // Change toutes les 10 secondes (plus lent)

    return () => clearInterval(interval);
  }, [faqItems.length]);

  // Helper pour récupérer l'icône Lucide
  const getIcon = (name: string) => {
    switch (name) {
        case 'Leaf': return <Leaf className="w-8 h-8 text-green-600" />;
        case 'Heart': return <Heart className="w-8 h-8 text-red-500" />;
        case 'Star': return <Star className="w-8 h-8 text-honey-500" />;
        case 'Shield': return <Shield className="w-8 h-8 text-blue-600" />;
        case 'Award': return <Award className="w-8 h-8 text-purple-600" />;
        case 'Sun': return <Sun className="w-8 h-8 text-orange-500" />;
        case 'Droplets': return <Droplets className="w-8 h-8 text-sky-500" />;
        case 'Hexagon': return <Hexagon className="w-8 h-8 text-amber-600" />;
        default: return <Leaf className="w-8 h-8 text-honey-500" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url("${content.heroImage || 'https://picsum.photos/seed/apiary/1920/1080'}")` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            {content.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-honey-50 mb-8 max-w-2xl mx-auto drop-shadow">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/products" 
              className="bg-honey-500 hover:bg-honey-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-honey-500/30 flex items-center justify-center gap-2"
            >
              Découvrir nos miels <ArrowRight size={18} />
            </Link>
            <Link 
              to="/contact" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full font-semibold transition-all flex items-center justify-center"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-honey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-honey-600 font-semibold tracking-wider uppercase text-sm">Nos Engagements</span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-neutral-800">Une apiculture raisonnée</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {(content.values || []).map((value) => (
              <div key={value.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
                <div className="bg-honey-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(value.icon)}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-neutral-800">Nos Trésors de la Ruche</h2>
              <p className="text-neutral-500 mt-2">Récoltés cette saison au Vieux Juigné</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-honey-600 hover:text-honey-700 font-medium">
              Voir toute la boutique <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group border border-neutral-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white flex flex-col">
                <div className="h-64 overflow-hidden relative shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-honey-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {product.category === 'essaim' ? 'ESSAIM' : 'MIEL'}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">{product.name}</h3>
                  <p className="text-neutral-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-honey-600">{product.price.toFixed(2)} €</span>
                      <span className="text-xs text-neutral-400">/ {product.unit}</span>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="text-sm font-bold bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-honey-600 transition-colors flex items-center gap-2"
                    >
                      <ShoppingCart size={14} /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center text-honey-600 font-medium">
              Voir toute la boutique <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ / Did You Know Section */}
      <section className="py-24 bg-neutral-900 text-honey-50 relative overflow-hidden transition-colors duration-1000">
        {/* Background Bee Shadow */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
             <svg viewBox="0 0 200 200" className="w-[800px] h-[800px] text-black fill-none stroke-current">
                {/* Wings */}
                <path d="M75 80 C 20 40 10 100 40 120" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M125 80 C 180 40 190 100 160 120" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Body */}
                <path d="M100 45 C 90 45 82 55 82 65 C 82 75 90 85 100 85 C 110 85 118 75 118 65 C 118 55 110 45 100 45 Z" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M100 85 C 80 85 70 100 70 120 C 70 145 100 175 100 175 C 100 175 130 145 130 120 C 130 100 120 85 100 85 Z" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Stripes */}
                <path d="M80 110 H120 M82 125 H118 M88 140 H112" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Antennae */}
                <path d="M90 50 C 80 30 60 30 60 40" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M110 50 C 120 30 140 30 140 40" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="bg-honey-500/20 p-4 rounded-full text-honey-500">
                <HelpCircle size={48} />
            </div>
          </div>
          
          <h2 className="text-honey-500 font-bold uppercase tracking-widest text-sm mb-6">Le Saviez-vous ?</h2>

          {faqItems.length > 0 && (
            <div className="min-h-[200px] flex flex-col justify-center items-center transition-all duration-500">
                <h3 
                  key={`q-${currentFaqIndex}`}
                  className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight animate-fadeIn"
                >
                  "{faqItems[currentFaqIndex].question}"
                </h3>
                <p 
                   key={`a-${currentFaqIndex}`}
                   className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl animate-fadeIn animation-delay-300"
                >
                  {faqItems[currentFaqIndex].answer}
                </p>
                
                {/* Dots indicator */}
                <div className="flex gap-2 mt-12">
                    {faqItems.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentFaqIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                idx === currentFaqIndex ? 'w-8 bg-honey-500' : 'w-2 bg-neutral-700 hover:bg-neutral-600'
                            }`}
                            aria-label={`Voir question ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
          )}

          <div className="mt-16 pt-12 border-t border-neutral-800">
            <p className="text-neutral-400 mb-6">Vous avez d'autres questions sur nos produits ou l'apiculture ?</p>
            <Link 
              to="/contact" 
              className="inline-block bg-honey-500 hover:bg-honey-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
            >
              Posez-nous vos questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;