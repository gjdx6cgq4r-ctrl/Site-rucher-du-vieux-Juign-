
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import RequireAuth from './components/RequireAuth';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContent from './pages/admin/AdminContent';
import AdminProducts from './pages/admin/AdminProducts';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSettings from './pages/admin/AdminSettings';
import AdminMedia from './pages/admin/AdminMedia';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;