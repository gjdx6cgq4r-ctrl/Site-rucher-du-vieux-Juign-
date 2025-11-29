
import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

const Products = () => {
  const { products, addToCart, triggerAddAnimation } = useApp();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerAddAnimation(rect, product.image);
    addToCart(product);
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <div className="bg-white shadow-sm py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-neutral-800 mb-4">Notre Production</h1>
          <p className="text-neutral-600">Du rucher à votre table, sans intermédiaire.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row group">
              <Link to={`/products/${product.id}`} className="md:w-1/2 h-64 md:h-auto relative overflow-hidden block">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map(tag => (
                      <span key={tag} className="bg-honey-50 text-honey-700 text-xs font-semibold px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-3 hover:text-honey-600 transition-colors">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-neutral-600 mb-6 text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-4 pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <div className="text-2xl font-bold text-honey-600">
                    {product.price.toFixed(2)} €
                    <span className="text-sm text-neutral-400 font-normal ml-1">
                      / {product.unit}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-neutral-900 hover:bg-neutral-800 active:bg-honey-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart size={16} /> Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-honey-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-honey-800 mb-2">Vous êtes professionnel ou revendeur ?</h3>
          <p className="text-honey-700 mb-6">Nous proposons des tarifs préférentiels pour les commandes en gros volume.</p>
          <Link to="/contact" className="text-honey-900 font-semibold underline decoration-honey-400 hover:decoration-honey-900">
            Demander un devis pro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;