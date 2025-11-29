import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Upload, Plus, Image as ImageIcon } from 'lucide-react';
import { MediaItem } from '../../types';

const AdminMedia = () => {
  const { mediaLibrary, addMedia, deleteMedia } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Check file size (limit to 500KB to avoid filling localStorage too fast)
    if (file.size > 500 * 1024) {
      alert("L'image est trop volumineuse (> 500Ko). Pour cette démo, merci d'utiliser des images plus légères.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newItem: MediaItem = {
        id: Date.now().toString(),
        name: file.name,
        type: 'image',
        url: reader.result as string
      };
      addMedia(newItem);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette image de la médiathèque ?')) {
      deleteMedia(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl border-2 border-dashed transition-colors text-center cursor-pointer hover:bg-slate-50"
           style={{ borderColor: isDragging ? '#f59e0b' : '#e2e8f0' }}
           onDragOver={handleDragOver}
           onDragLeave={handleDragLeave}
           onDrop={handleDrop}
           onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <div className="bg-honey-100 p-4 rounded-full text-honey-600">
            <Upload size={32} />
          </div>
          <div>
            <p className="font-bold text-slate-700 text-lg">Cliquez ou glissez une image ici</p>
            <p className="text-sm">JPG, PNG supportés (Max 500Ko)</p>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
        <ImageIcon size={20} /> Vos Images ({mediaLibrary.length})
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {mediaLibrary.map((item) => (
          <div key={item.id} className="group relative bg-white p-2 rounded-lg shadow-sm border border-slate-200 aspect-square flex flex-col">
            <div className="relative flex-grow overflow-hidden rounded bg-slate-100">
              <img src={item.url} alt={item.name} className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-sm"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-500 truncate text-center font-medium">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMedia;