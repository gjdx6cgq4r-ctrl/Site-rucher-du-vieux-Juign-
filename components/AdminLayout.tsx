
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, FileText, ShoppingBag, Settings, PenTool, Home, Image as ImageIcon, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Tableau de bord' },
    { path: '/admin/products', icon: <ShoppingBag size={20} />, label: 'Produits' },
    { path: '/admin/media', icon: <ImageIcon size={20} />, label: 'Médiathèque' },
    { path: '/admin/blog', icon: <PenTool size={20} />, label: 'Blog' },
    { path: '/admin/content', icon: <FileText size={20} />, label: 'Contenu du site' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Apparence & SEO' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white">Admin Rucher</h1>
        </div>
        <nav className="mt-6 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 hover:bg-slate-800 transition-colors ${
                location.pathname === item.path ? 'bg-honey-600 text-white' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800 space-y-2">
          <Link to="/" className="flex items-center text-sm hover:text-white transition-colors py-2">
            <Home size={16} className="mr-2" /> Retour au site
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm text-red-400 hover:text-red-300 transition-colors w-full py-2 text-left"
          >
            <LogOut size={16} className="mr-2" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm sticky top-0 z-10 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Administration'}
          </h2>
          <div className="text-sm text-slate-500">
            Connecté en tant qu'administrateur
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;