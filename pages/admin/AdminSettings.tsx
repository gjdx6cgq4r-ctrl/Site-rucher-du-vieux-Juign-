
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Key, Check, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const { themeColor, setThemeColor, changePassword } = useApp();
  
  // Password Change State
  const [pwdData, setPwdData] = useState({ current: '', new: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const colors = [
    { name: 'Miel (Défaut)', value: '#f59e0b', bg: 'bg-amber-500' },
    { name: 'Forêt', value: '#166534', bg: 'bg-green-700' },
    { name: 'Lavande', value: '#7c3aed', bg: 'bg-violet-600' },
    { name: 'Terre', value: '#78350f', bg: 'bg-amber-900' },
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);

    if (pwdData.new.length < 4) {
      setPwdMsg({ type: 'error', text: 'Le nouveau mot de passe est trop court (min 4 caractères).' });
      return;
    }

    if (pwdData.new !== pwdData.confirm) {
      setPwdMsg({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }

    const success = changePassword(pwdData.current, pwdData.new);
    if (success) {
      setPwdMsg({ type: 'success', text: 'Mot de passe modifié avec succès !' });
      setPwdData({ current: '', new: '', confirm: '' });
    } else {
      setPwdMsg({ type: 'error', text: 'Le mot de passe actuel est incorrect.' });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-slate-800 text-xl">Paramètres du Site</h3>

      {/* Theme Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h4 className="font-bold text-slate-700 mb-4">Personnalisation du Thème</h4>
        <p className="text-sm text-slate-500 mb-4">Choisissez la couleur dominante de votre site.</p>
        
        <div className="flex gap-4">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setThemeColor(c.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                themeColor === c.value ? 'border-slate-800 bg-slate-50' : 'border-transparent hover:bg-slate-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full shadow-sm ${c.bg}`}></div>
              <span className="text-xs font-medium text-slate-700">{c.name}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200">
          Note: Dans cette version de démonstration, le changement de couleur est simulé par l'état (State), mais nécessite une recompilation CSS ou des variables CSS dynamiques pour s'appliquer partout instantanément. Le thème par défaut "Miel" est optimisé.
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h4 className="font-bold text-slate-700 mb-4">SEO & Métadonnées</h4>
        <div className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Titre du site (Meta Title)</label>
            <input className="w-full border p-2 rounded" defaultValue="Le Rucher Du Vieux Juigné - Miel & Essaims" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Meta Description)</label>
            <textarea className="w-full border p-2 rounded" rows={3} defaultValue="Vente directe de miel de printemps et d'été, essaims d'abeilles. Apiculture locale et respectueuse." />
          </div>
          <button className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700">Enregistrer SEO</button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-honey-600" /> Sécurité
        </h4>
        
        <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4">
            
            {pwdMsg && (
                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                    pwdMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {pwdMsg.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                    {pwdMsg.text}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe actuel</label>
                <div className="relative">
                    <input 
                        type="password" 
                        value={pwdData.current}
                        onChange={(e) => setPwdData({...pwdData, current: e.target.value})}
                        className="w-full border border-slate-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none"
                        placeholder="••••••"
                        required
                    />
                    <Key size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nouveau mot de passe</label>
                    <input 
                        type="password" 
                        value={pwdData.new}
                        onChange={(e) => setPwdData({...pwdData, new: e.target.value})}
                        className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirmer</label>
                    <input 
                        type="password" 
                        value={pwdData.confirm}
                        onChange={(e) => setPwdData({...pwdData, confirm: e.target.value})}
                        className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none"
                        required
                    />
                </div>
            </div>

            <div className="pt-2">
                <button type="submit" className="bg-honey-600 hover:bg-honey-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
                    Modifier le mot de passe
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;