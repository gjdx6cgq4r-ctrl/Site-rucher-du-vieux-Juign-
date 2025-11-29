import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, FileText, MousePointer, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { products, blogPosts } = useApp();

  const stats = [
    { label: 'Produits en ligne', value: products.length, icon: <ShoppingBag size={24} />, color: 'bg-blue-500' },
    { label: 'Articles de blog', value: blogPosts.length, icon: <FileText size={24} />, color: 'bg-emerald-500' },
    { label: 'Visites ce mois', value: '1,234', icon: <MousePointer size={24} />, color: 'bg-purple-500' },
    { label: 'Conversion', value: '3.2%', icon: <TrendingUp size={24} />, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
            <div className={`${stat.color} p-4 rounded-lg text-white mr-4 shadow-md`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Derniers Produits Ajoutés</h3>
          <div className="space-y-4">
            {products.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-50">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded object-cover mr-4" />
                <div>
                  <p className="font-medium text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.price.toFixed(2)} €</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Derniers Articles</h3>
          <div className="space-y-4">
            {blogPosts.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-50">
                <div className="w-12 h-12 bg-slate-200 rounded mr-4 flex items-center justify-center text-slate-400 font-bold text-xs">IMG</div>
                <div>
                  <p className="font-medium text-slate-800 truncate max-w-xs">{p.title}</p>
                  <p className="text-xs text-slate-500">{p.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
