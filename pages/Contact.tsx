import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const { content, cart } = useApp();
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Renseignement Miel');

  useEffect(() => {
    if (cart.length > 0) {
      setSubject("Commande de produits");
      const itemsList = cart.map(item => `- ${item.quantity}x ${item.name} (${(item.price * item.quantity).toFixed(2)} €)`).join('\n');
      const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
      
      const orderMessage = `Bonjour,\n\nJe souhaite passer commande pour les produits suivants :\n${itemsList}\n\nTotal estimé : ${total} €\n\nMerci de me recontacter pour convenir du paiement et de la récupération.\n\nCordialement.`;
      
      setMessage(orderMessage);
    }
  }, [cart]);

  return (
    <div className="bg-honey-50/50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-neutral-800 mb-4">Contactez-nous</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Une question sur nos produits ? Envie de commander un essaim ? 
            Remplissez le formulaire ci-dessous, nous vous répondrons sous 48h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">Nos Coordonnées</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-honey-100 p-3 rounded-full text-honey-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Adresse</h3>
                  <p className="text-neutral-600">{content.contactAddress}</p>
                  <p className="text-sm text-neutral-400 mt-1">Visite sur rendez-vous uniquement</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-honey-100 p-3 rounded-full text-honey-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Téléphone</h3>
                  <p className="text-neutral-600">{content.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-honey-100 p-3 rounded-full text-honey-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Email</h3>
                  <a href={`mailto:${content.contactEmail}`} className="text-neutral-600 hover:text-honey-600 transition-colors">
                    {content.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-bold text-neutral-900 mb-4">FAQ Rapide</h3>
              <div className="space-y-4">
                <details className="group bg-neutral-50 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-neutral-900">
                    Expédiez-vous le miel ?
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-2 p-4 text-neutral-600 pt-0">
                    Pour garantir la qualité et éviter la casse, nous privilégions le retrait sur place. Envoi possible pour grosses commandes.
                  </p>
                </details>
                <details className="group bg-neutral-50 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-neutral-900">
                    Quand réserver les essaims ?
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-2 p-4 text-neutral-600 pt-0">
                    Les réservations ouvrent dès janvier pour un retrait entre avril et juin selon la météo.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Envoyer un message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message envoyé (simulation) !"); }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Nom complet</label>
                <input type="text" id="name" className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-honey-500 focus:ring-honey-500 p-3 border" placeholder="Votre nom" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <input type="email" id="email" className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-honey-500 focus:ring-honey-500 p-3 border" placeholder="vous@exemple.com" required />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">Sujet</label>
                <select 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-honey-500 focus:ring-honey-500 p-3 border"
                >
                  <option>Renseignement Miel</option>
                  <option>Commande de produits</option>
                  <option>Achat d'Essaims</option>
                  <option>Visite du Rucher</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={8} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-honey-500 focus:ring-honey-500 p-3 border" 
                  placeholder="Votre message..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-honey-500 hover:bg-honey-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Send size={18} /> Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;