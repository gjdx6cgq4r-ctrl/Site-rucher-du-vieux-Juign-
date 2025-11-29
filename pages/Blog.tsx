import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { blogPosts } = useApp();

  return (
    <div className="bg-white min-h-screen">
      <div className="py-16 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-neutral-800 mb-4">Le Journal du Rucher</h1>
          <p className="text-neutral-600">Conseils apicoles, vie du rucher et actualités.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3 w-full shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="rounded-xl shadow-sm w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3 uppercase tracking-wide">
                  <span className="text-honey-600 font-bold">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-3 group-hover:text-honey-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-honey-600 font-medium hover:text-honey-700">
                  Lire l'article <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
