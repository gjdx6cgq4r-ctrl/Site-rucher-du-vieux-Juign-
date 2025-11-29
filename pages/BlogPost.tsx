
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const { blogPosts } = useApp();
  const post = blogPosts.find(p => p.id === id);

  // Gestion du SEO
  useEffect(() => {
    if (post) {
      // Mise à jour du titre du document
      const previousTitle = document.title;
      document.title = post.metaTitle || `${post.title} | Le Rucher Du Vieux Juigné`;

      // Mise à jour de la meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      const previousDescription = metaDescription.getAttribute('content');
      metaDescription.setAttribute('content', post.metaDescription || post.excerpt);

      // Cleanup function pour remettre le titre par défaut quand on quitte la page
      return () => {
        document.title = previousTitle;
        if (previousDescription) {
            metaDescription.setAttribute('content', previousDescription);
        }
      };
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">Article non trouvé</h2>
        <Link to="/blog" className="text-honey-600 hover:underline">Retourner au blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-20">
      {/* Header Image */}
      <div className="h-[40vh] w-full relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Retour
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span className="bg-honey-500 px-3 py-1 rounded-full text-xs font-bold uppercase">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg prose-neutral first-letter:text-5xl first-letter:font-serif first-letter:text-honey-500 first-letter:mr-2 first-letter:float-left">
          <p className="whitespace-pre-wrap leading-loose text-neutral-700">
            {post.content}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100">
          <h3 className="text-sm font-bold uppercase text-neutral-400 mb-4">Partager cet article</h3>
          <div className="flex gap-4">
            <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;