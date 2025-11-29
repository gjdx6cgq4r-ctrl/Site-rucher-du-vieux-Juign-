import React from 'react';
import { useApp } from '../context/AppContext';

const About = () => {
  const { content } = useApp();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-honey-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-neutral-800 mb-4">Notre Histoire</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Une passion familiale enracinée dans le terroir du Vieux Juigné.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-honey-600 mb-6">Depuis 3 Générations</h2>
            <div className="prose prose-neutral text-neutral-600">
              <p className="mb-4 whitespace-pre-wrap leading-relaxed">
                {content.aboutHistory}
              </p>
              <p className="mb-4 whitespace-pre-wrap leading-relaxed">
                {content.aboutText}
              </p>
              <p>
                Aujourd'hui, nous gérons environ 200 ruches réparties sur plusieurs ruchers sédentaires, afin d'offrir à nos abeilles une diversité florale tout au long de la saison.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-honey-100 rounded-2xl transform rotate-2"></div>
              <img 
                src="https://picsum.photos/seed/beekeeper/600/600" 
                alt="L'apiculteur" 
                className="relative rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-neutral-800">Notre Philosophie</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-xl border-l-4 border-honey-500">
              <h3 className="text-xl font-bold mb-3">Respect de l'abeille</h3>
              <p className="text-neutral-600 text-sm">Nous ne prélevons que le surplus de miel. L'essentiel est laissé à la colonie pour qu'elle passe l'hiver dans les meilleures conditions.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl border-l-4 border-honey-500">
              <h3 className="text-xl font-bold mb-3">Production Locale</h3>
              <p className="text-neutral-600 text-sm">Toutes nos ruches sont situées dans un rayon de 15km autour du Vieux Juigné, limitant notre empreinte carbone.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-xl border-l-4 border-honey-500">
              <h3 className="text-xl font-bold mb-3">Transparence</h3>
              <p className="text-neutral-600 text-sm">Nous accueillons nos clients pour expliquer notre travail. Savoir ce que l'on mange est primordial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
