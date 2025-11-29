
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteContent, SocialLink, FAQItem, ValueItem } from '../../types';
import { Save, Image as ImageIcon, X, Plus, Trash2, HelpCircle, Star, Heart, Leaf, Shield, Award, Sun, Droplets, Hexagon } from 'lucide-react';

const AdminContent = () => {
  const { content, updateContent, mediaLibrary, faqItems, addFAQ, deleteFAQ, updateFAQ } = useApp();
  const [formData, setFormData] = useState<SiteContent>(content);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Gestion générique du sélecteur d'image (pour logo ou hero)
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
  const [mediaSelectorTarget, setMediaSelectorTarget] = useState<'logo' | 'hero' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    Object.keys(formData).forEach((key) => {
      updateContent(key as keyof SiteContent, formData[key as keyof SiteContent]);
    });
    setSuccessMsg('Contenu mis à jour avec succès !');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openMediaSelector = (target: 'logo' | 'hero') => {
    setMediaSelectorTarget(target);
    setIsMediaSelectorOpen(true);
  };

  const handleSelectMedia = (url: string) => {
    if (mediaSelectorTarget === 'logo') {
        setFormData(prev => ({ ...prev, logoUrl: url }));
    } else if (mediaSelectorTarget === 'hero') {
        setFormData(prev => ({ ...prev, heroImage: url }));
    }
    setIsMediaSelectorOpen(false);
    setMediaSelectorTarget(null);
  };

  // Social Media Handlers
  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'facebook',
      url: ''
    };
    setFormData(prev => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), newLink]
    }));
  };

  const removeSocialLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => 
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  // Values (Engagements) Handlers
  const addValue = () => {
    const newValue: ValueItem = {
      id: Date.now().toString(),
      icon: 'Leaf',
      title: 'Nouvel Engagement',
      text: 'Description de votre valeur...'
    };
    setFormData(prev => ({
      ...prev,
      values: [...(prev.values || []), newValue]
    }));
  };

  const removeValue = (id: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter(v => v.id !== id)
    }));
  };

  const updateValue = (id: string, field: keyof ValueItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.map(v => 
        v.id === id ? { ...v, [field]: value } : v
      )
    }));
  };

  // FAQ Handlers
  const handleAddFAQ = () => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: "Nouvelle question ?",
      answer: "Réponse à rédiger ici..."
    };
    addFAQ(newFAQ);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Édition des Textes</h3>
        <button 
          onClick={handleSave}
          className="bg-honey-600 hover:bg-honey-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save size={18} /> Enregistrer
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-100 text-green-700 px-6 py-3 text-sm">
          {successMsg}
        </div>
      )}

      <div className="p-6 space-y-8">
        {/* Identité Visuelle */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
           <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">Identité Visuelle</h4>
           <div className="flex items-center gap-6">
             <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 bg-white rounded-lg border border-slate-200 flex items-center justify-center p-2 overflow-hidden relative group">
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-slate-400 text-xs text-center">Aucun logo (défaut)</span>
                  )}
                  {formData.logoUrl && (
                    <button 
                      onClick={() => setFormData(prev => ({...prev, logoUrl: ""}))}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Supprimer le logo"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => openMediaSelector('logo')}
                  className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center gap-1"
                >
                  <ImageIcon size={14} /> Choisir logo
                </button>
             </div>
             <div className="flex-1 text-sm text-slate-600">
               <p className="mb-2">Le logo remplacera l'icône hexagonale par défaut dans l'en-tête du site.</p>
               <p className="text-xs text-slate-400">Format recommandé : PNG avec fond transparent, ou JPG. Hauteur max affichée : 40px.</p>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-600 text-sm uppercase tracking-wider border-b pb-2">Page d'Accueil (Hero Section)</h4>
            
            {/* Gestion Image Hero */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Image d'arrière-plan (Bannière)</label>
                <div className="relative h-48 w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-300 group">
                    <img 
                        src={formData.heroImage || "https://picsum.photos/seed/apiary/1920/1080"} 
                        alt="Hero Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                           onClick={() => openMediaSelector('hero')}
                           className="bg-white text-slate-800 px-4 py-2 rounded-full font-bold shadow-lg text-sm flex items-center gap-2"
                        >
                            <ImageIcon size={16} /> Changer l'image
                        </button>
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">Recommandé : 1920x1080px ou plus large.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Titre principal</label>
              <input 
                name="heroTitle" 
                value={formData.heroTitle} 
                onChange={handleChange}
                className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sous-titre</label>
              <textarea 
                name="heroSubtitle" 
                value={formData.heroSubtitle} 
                onChange={handleChange}
                rows={2}
                className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border" 
              />
            </div>
          </div>

          {/* Gestion des Valeurs / Engagements */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 mt-4">
              <h4 className="font-bold text-slate-600 text-sm uppercase tracking-wider">Nos Engagements (Page d'accueil)</h4>
              <button 
                onClick={addValue}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Ajouter un engagement
              </button>
            </div>
            
            <div className="space-y-4">
              {(formData.values || []).length === 0 && (
                 <p className="text-sm text-slate-400 italic">Aucun engagement configuré.</p>
              )}

              {(formData.values || []).map((val) => (
                <div key={val.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Icon Select */}
                    <div className="w-full md:w-32">
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Icône</label>
                        <select 
                            value={val.icon} 
                            onChange={(e) => updateValue(val.id, 'icon', e.target.value)}
                            className="w-full border-slate-300 rounded-lg p-2 border text-sm focus:ring-honey-500 focus:border-honey-500"
                        >
                            <option value="Leaf">Feuille</option>
                            <option value="Heart">Cœur</option>
                            <option value="Star">Étoile</option>
                            <option value="Shield">Bouclier</option>
                            <option value="Award">Trophée</option>
                            <option value="Sun">Soleil</option>
                            <option value="Droplets">Gouttes</option>
                            <option value="Hexagon">Hexagone</option>
                        </select>
                        <div className="mt-2 flex justify-center text-honey-500 bg-white p-2 rounded border border-slate-200">
                             {val.icon === 'Leaf' && <Leaf size={24} />}
                             {val.icon === 'Heart' && <Heart size={24} />}
                             {val.icon === 'Star' && <Star size={24} />}
                             {val.icon === 'Shield' && <Shield size={24} />}
                             {val.icon === 'Award' && <Award size={24} />}
                             {val.icon === 'Sun' && <Sun size={24} />}
                             {val.icon === 'Droplets' && <Droplets size={24} />}
                             {val.icon === 'Hexagon' && <Hexagon size={24} />}
                        </div>
                    </div>

                    {/* Content Inputs */}
                    <div className="flex-1 space-y-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Titre</label>
                            <input 
                                value={val.title}
                                onChange={(e) => updateValue(val.id, 'title', e.target.value)}
                                className="w-full border-slate-300 rounded-lg p-2 border text-sm focus:ring-honey-500 focus:border-honey-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Description</label>
                            <textarea 
                                value={val.text}
                                onChange={(e) => updateValue(val.id, 'text', e.target.value)}
                                rows={2}
                                className="w-full border-slate-300 rounded-lg p-2 border text-sm focus:ring-honey-500 focus:border-honey-500"
                            />
                        </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeValue(val.id)}
                    className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 bg-white rounded-full shadow-sm"
                    title="Supprimer l'engagement"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-600 text-sm uppercase tracking-wider border-b pb-2 mt-4">Page À Propos</h4>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Histoire</label>
              <textarea 
                name="aboutHistory" 
                value={formData.aboutHistory} 
                onChange={handleChange}
                rows={4}
                className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Texte de présentation</label>
              <textarea 
                name="aboutText" 
                value={formData.aboutText} 
                onChange={handleChange}
                rows={4}
                className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-600 text-sm uppercase tracking-wider border-b pb-2 mt-4">Coordonnées</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  name="contactEmail" 
                  value={formData.contactEmail} 
                  onChange={handleChange}
                  className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                <input 
                  name="contactPhone" 
                  value={formData.contactPhone} 
                  onChange={handleChange}
                  className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Adresse</label>
                <input 
                  name="contactAddress" 
                  value={formData.contactAddress} 
                  onChange={handleChange}
                  className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border" 
                />
              </div>
            </div>
          </div>

          {/* Réseaux Sociaux Dynamiques */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 mt-4">
              <h4 className="font-bold text-slate-600 text-sm uppercase tracking-wider">Réseaux Sociaux</h4>
              <button 
                onClick={addSocialLink}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Ajouter un réseau
              </button>
            </div>
            
            <div className="space-y-3">
              {(formData.socialLinks || []).length === 0 && (
                 <p className="text-sm text-slate-400 italic">Aucun réseau social configuré.</p>
              )}

              {(formData.socialLinks || []).map((link) => (
                <div key={link.id} className="flex gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 items-start">
                  <div className="w-1/3">
                    <select 
                      value={link.platform} 
                      onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                      className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border text-sm"
                    >
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">X / Twitter</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input 
                      value={link.url} 
                      onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                      className="w-full border-slate-300 rounded-lg shadow-sm focus:border-honey-500 focus:ring-honey-500 p-2 border text-sm"
                    />
                  </div>
                  <button 
                    onClick={() => removeSocialLink(link.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Gestion FAQ */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 mt-4">
              <h4 className="font-bold text-slate-600 text-sm uppercase tracking-wider flex items-center gap-2">
                 <HelpCircle size={16} /> FAQ (Page d'accueil)
              </h4>
              <button 
                onClick={handleAddFAQ}
                className="text-xs bg-honey-100 hover:bg-honey-200 text-honey-700 font-medium px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Ajouter une question
              </button>
            </div>
            
            <div className="space-y-4">
              {faqItems.length === 0 && (
                 <p className="text-sm text-slate-400 italic">Aucune question dans la FAQ.</p>
              )}

              {faqItems.map((item) => (
                <div key={item.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Question</label>
                    <input 
                      value={item.question}
                      onChange={(e) => updateFAQ({...item, question: e.target.value})}
                      className="w-full border-slate-300 rounded-lg p-2 border text-sm focus:ring-honey-500 focus:border-honey-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Réponse</label>
                    <textarea 
                      value={item.answer}
                      onChange={(e) => updateFAQ({...item, answer: e.target.value})}
                      rows={2}
                      className="w-full border-slate-300 rounded-lg p-2 border text-sm focus:ring-honey-500 focus:border-honey-500"
                    />
                  </div>
                  <button 
                    onClick={() => deleteFAQ(item.id)}
                    className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Supprimer la question"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Media Selector Modal */}
      {isMediaSelectorOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <ImageIcon size={20} className="text-honey-500" /> 
                {mediaSelectorTarget === 'logo' ? 'Choisir votre logo' : "Choisir l'image d'arrière-plan"}
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
                  <p className="text-sm">Allez dans l'onglet "Médiathèque" pour ajouter des images.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mediaLibrary.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => handleSelectMedia(item.url)}
                      className="cursor-pointer group relative border-2 border-transparent hover:border-honey-500 rounded-lg overflow-hidden transition-all aspect-square bg-slate-100"
                    >
                      <img src={item.url} alt={item.name} className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate text-center">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;