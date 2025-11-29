
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Plus, Trash2, Edit2, X, Check, Image as ImageIcon, Search } from 'lucide-react';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, mediaLibrary } = useApp();
  
  // State for Product Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  
  // State for Media Selector Modal
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);

  const handleCreateNew = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      unit: '1 kg',
      image: 'https://picsum.photos/seed/new/400/300',
      category: 'miel',
      tags: [],
      metaTitle: '',
      metaDescription: ''
    };
    setEditingProduct(newProduct);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProduct && editingProduct.name) {
      if (products.find(p => p.id === editingProduct.id)) {
        updateProduct(editingProduct as Product);
      } else {
        addProduct(editingProduct as Product);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    } else {
      alert("Veuillez au moins renseigner le nom du produit.");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.')) {
      deleteProduct(id);
    }
  };

  const handleSelectImage = (url: string) => {
    setEditingProduct(prev => prev ? ({ ...prev, image: url }) : null);
    setIsMediaSelectorOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-xl">Gestion des Produits</h3>
        <button 
          onClick={handleCreateNew}
          className="bg-honey-600 hover:bg-honey-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> Ajouter un produit
        </button>
      </div>

      {/* Main List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase w-24">Image</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Produit</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Catégorie</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Prix</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{product.name}</div>
                    <div className="text-xs text-slate-500 truncate max-w-xs">{product.description}</div>
                    {product.metaTitle && (
                      <div className="mt-1 inline-block">
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium border border-green-200">SEO OK</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      product.category === 'miel' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{product.price.toFixed(2)} €</span> 
                    <span className="text-slate-400 text-xs"> / {product.unit}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-slate-500 hover:text-honey-600 hover:bg-honey-50 rounded transition-colors"
                        title="Éditer"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Aucun produit pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-800">
                {products.find(p => p.id === editingProduct.id) ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Image & Basic Info Section */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3 space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Image du produit</label>
                  <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative group">
                    <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                      <button 
                         onClick={() => setIsMediaSelectorOpen(true)}
                         className="bg-white text-slate-800 px-4 py-2 rounded-full font-bold shadow-lg text-sm"
                      >
                        Changer
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMediaSelectorOpen(true)}
                    className="w-full py-2 border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
                  >
                    <ImageIcon size={16} /> Choisir une image
                  </button>
                </div>

                <div className="w-full md:w-2/3 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom du produit</label>
                    <input 
                      type="text"
                      value={editingProduct.name}
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-honey-500 focus:border-honey-500 outline-none"
                      placeholder="Ex: Miel de Printemps"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Prix (€)</label>
                      <input 
                        type="number"
                        step="0.10"
                        value={editingProduct.price}
                        onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                        className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-honey-500 focus:border-honey-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Unité</label>
                      <input 
                        type="text"
                        value={editingProduct.unit}
                        onChange={e => setEditingProduct({...editingProduct, unit: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-honey-500 focus:border-honey-500 outline-none"
                        placeholder="Ex: 1 kg, 500g..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                    <select 
                      value={editingProduct.category}
                      onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-honey-500 focus:border-honey-500 outline-none"
                    >
                      <option value="miel">Miel</option>
                      <option value="essaim">Essaim</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tags (séparés par des virgules)</label>
                    <input 
                      type="text"
                      value={editingProduct.tags?.join(', ')}
                      onChange={e => setEditingProduct({...editingProduct, tags: e.target.value.split(',').map(t => t.trim())})}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-honey-500 focus:border-honey-500 outline-none"
                      placeholder="Doux, Crémeux, Bio..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={4}
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-honey-500 focus:border-honey-500 outline-none"
                  placeholder="Décrivez le goût, la texture, l'origine..."
                />
              </div>

              {/* SEO Section */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Search size={18} /> Optimisation SEO (Référencement)
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Méta Titre (Title Tag)
                                <span className="float-right text-xs text-slate-400">{(editingProduct.metaTitle || '').length}/60</span>
                            </label>
                            <input 
                                value={editingProduct.metaTitle || ''} 
                                onChange={e => setEditingProduct({...editingProduct, metaTitle: e.target.value})}
                                placeholder="Titre optimisé pour Google"
                                className="w-full border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Méta Description
                                <span className="float-right text-xs text-slate-400">{(editingProduct.metaDescription || '').length}/160</span>
                            </label>
                            <textarea 
                                value={editingProduct.metaDescription || ''} 
                                onChange={e => setEditingProduct({...editingProduct, metaDescription: e.target.value})}
                                placeholder="Description accrocheuse pour les résultats de recherche..."
                                rows={3}
                                className="w-full border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Preview Google */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Aperçu Google</label>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-slate-100 rounded-full p-1">
                                    <div className="w-4 h-4 bg-honey-500 rounded-full"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-800">Le Rucher du Vieux Juigné</span>
                                    <span className="text-[10px] text-slate-500">https://rucher-vieux-juigne.fr › produits › ...</span>
                                </div>
                            </div>
                            <h3 className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer truncate">
                                {editingProduct.metaTitle || editingProduct.name || 'Nom du produit'}
                            </h3>
                            <p className="text-sm text-[#4d5156] line-clamp-2">
                                {editingProduct.metaDescription || editingProduct.description || 'La description de votre produit apparaîtra ici...'}
                            </p>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2.5 bg-honey-600 hover:bg-honey-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <Check size={20} /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Selector Modal */}
      {isMediaSelectorOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <ImageIcon size={20} className="text-honey-500" /> Choisir une image
              </h3>
              <button onClick={() => setIsMediaSelectorOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {mediaLibrary.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <ImageIcon size={48} className="mb-4 opacity-50" />
                  <p>Votre médiathèque est vide.</p>
                  <p className="text-sm">Allez dans l'onglet "Médiathèque" pour ajouter des photos.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mediaLibrary.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => handleSelectImage(item.url)}
                      className="cursor-pointer group relative border-2 border-transparent hover:border-honey-500 rounded-lg overflow-hidden transition-all aspect-square"
                    >
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate text-center">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-sm text-slate-500">
              Astuce : Ajoutez vos photos dans la section <span className="font-bold">Médiathèque</span> du menu de gauche.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;