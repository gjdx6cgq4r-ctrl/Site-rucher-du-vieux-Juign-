
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';

const AdminBlog = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'Nouvel Article',
      excerpt: 'Résumé de l\'article...',
      content: 'Contenu complet...',
      image: 'https://picsum.photos/seed/blognew/800/400',
      date: new Date().toISOString().split('T')[0],
      category: 'Général',
      metaTitle: '',
      metaDescription: ''
    };
    addBlogPost(newPost);
    setEditingId(newPost.id);
    setForm(newPost);
  };

  const handleSave = () => {
    if (editingId && form.title) {
      updateBlogPost(form as BlogPost);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-xl">Gestion du Blog</h3>
        <button 
          onClick={handleCreateNew}
          className="bg-honey-600 hover:bg-honey-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Nouvel Article
        </button>
      </div>

      {editingId && (
        <div className="bg-white p-6 rounded-xl border border-honey-200 shadow-sm mb-6">
          <h4 className="font-bold text-lg mb-4 text-slate-800">Éditer l'article</h4>
          <div className="space-y-6">
            
            {/* Contenu Principal */}
            <div className="space-y-4">
                <input 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})}
                placeholder="Titre de l'article"
                className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none font-bold text-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                <input 
                    value={form.category} 
                    onChange={e => setForm({...form, category: e.target.value})}
                    placeholder="Catégorie"
                    className="w-full border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none"
                />
                <input 
                    value={form.date} 
                    onChange={e => setForm({...form, date: e.target.value})}
                    type="date"
                    className="w-full border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none"
                />
                </div>
                <textarea 
                value={form.excerpt} 
                onChange={e => setForm({...form, excerpt: e.target.value})}
                placeholder="Extrait court (affiché dans la liste des articles)"
                className="w-full border border-slate-300 p-3 rounded-lg h-20 focus:ring-2 focus:ring-honey-500 outline-none"
                />
                <textarea 
                value={form.content} 
                onChange={e => setForm({...form, content: e.target.value})}
                placeholder="Contenu complet de l'article..."
                className="w-full border border-slate-300 p-3 rounded-lg h-60 focus:ring-2 focus:ring-honey-500 outline-none font-serif"
                />
            </div>

            {/* Section SEO */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Search size={18} /> Optimisation SEO
                </h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Méta Titre (Title Tag)
                                <span className="float-right text-xs text-slate-400">{(form.metaTitle || '').length}/60</span>
                            </label>
                            <input 
                                value={form.metaTitle || ''} 
                                onChange={e => setForm({...form, metaTitle: e.target.value})}
                                placeholder="Titre affiché dans Google"
                                className="w-full border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Méta Description
                                <span className="float-right text-xs text-slate-400">{(form.metaDescription || '').length}/160</span>
                            </label>
                            <textarea 
                                value={form.metaDescription || ''} 
                                onChange={e => setForm({...form, metaDescription: e.target.value})}
                                placeholder="Description affichée sous le titre dans Google..."
                                rows={3}
                                className="w-full border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Preview Google */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Aperçu Google</label>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 max-w-lg">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-slate-100 rounded-full p-1">
                                    <div className="w-4 h-4 bg-honey-500 rounded-full"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-800">Le Rucher du Vieux Juigné</span>
                                    <span className="text-[10px] text-slate-500">https://rucher-vieux-juigne.fr › blog › ...</span>
                                </div>
                            </div>
                            <h3 className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer truncate">
                                {form.metaTitle || form.title || 'Titre de votre article'}
                            </h3>
                            <p className="text-sm text-[#4d5156] line-clamp-2">
                                {form.metaDescription || form.excerpt || 'La description de votre article apparaîtra ici...'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
               <button 
                onClick={() => setEditingId(null)} 
                className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
               >
                Annuler
               </button>
               <button 
                onClick={handleSave} 
                className="px-6 py-2.5 bg-honey-600 hover:bg-honey-700 text-white font-bold rounded-lg shadow-sm transition-colors"
               >
                Enregistrer
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">{post.title}</h4>
              <p className="text-sm text-slate-500 mb-2">{post.date} • {post.category}</p>
              <p className="text-sm text-slate-600 line-clamp-2 max-w-2xl">{post.excerpt}</p>
              
              {/* Indicateur SEO */}
              <div className="mt-2 flex gap-2">
                 {post.metaTitle ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        SEO Configuré
                    </span>
                 ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                        SEO par défaut
                    </span>
                 )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => { setEditingId(post.id); setForm(post); }}
                className="p-2 text-slate-500 hover:text-honey-600 hover:bg-honey-50 rounded-lg transition-colors"
                title="Éditer"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => { if(window.confirm('Supprimer ?')) deleteBlogPost(post.id); }}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;