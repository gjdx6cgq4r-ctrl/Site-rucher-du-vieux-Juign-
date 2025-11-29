
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart, triggerAddAnimation } = useApp();
  const product = products.find(p => p.id === id);

  // Gestion du SEO
  useEffect(() => {
    if (product) {
      // Mise à jour du titre du document
      const previousTitle = document.title;
      document.title = product.metaTitle || `${product.name} | Le Rucher Du Vieux Juigné`;

      // Mise à jour de la meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      const previousDescription = metaDescription.getAttribute('content');
      metaDescription.setAttribute('content', product.metaDescription || product.description);

      // Cleanup function pour remettre le titre par défaut quand on quitte la page
      return () => {
        document.title = previousTitle;
        if (previousDescription) {
            metaDescription.setAttribute('content', previousDescription);
        }
      };
    }
  }, [product]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!product) return;
    const rect = e.currentTarget.getBoundingClientRect();
    triggerAddAnimation(rect, product.image);
    addToCart(product);
  };

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">Produit non trouvé</h2>
        <Link to="/products" className="text-honey-600 hover:underline">Retourner à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center text-neutral-500 hover:text-honey-600 mb-8 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Retour aux produits
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-neutral-100 bg-neutral-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Infos */}
          <div className="lg:w-1/2 flex flex-col justify-center">
             <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    product.category === 'miel' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                    {product.category}
                </span>
             </div>
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">{product.name}</h1>
             
             <div className="text-3xl font-bold text-honey-600 mb-2">
                {product.price.toFixed(2)} €
                <span className="text-lg text-neutral-400 font-normal ml-2">/ {product.unit}</span>
             </div>
             
             <p className="text-neutral-600 leading-relaxed text-lg mb-8">
                {product.description}
             </p>

             <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map(tag => (
                    <span key={tag} className="border border-neutral-200 text-neutral-600 text-sm px-3 py-1 rounded-full">
                        #{tag}
                    </span>
                ))}
             </div>

             <div className="border-t border-neutral-100 pt-8 mt-auto">
                <button 
                  onClick={handleAddToCart}
                  className="w-full md:w-auto bg-neutral-900 hover:bg-honey-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 transform active:scale-95"
                >
                  <ShoppingCart size={24} /> Ajouter au panier
                </button>
             </div>

             {/* Reassurance */}
             <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <Truck className="text-honey-500" size={20} />
                    <span>Retrait gratuit au rucher</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <ShieldCheck className="text-honey-500" size={20} />
                    <span>Production artisanale</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
