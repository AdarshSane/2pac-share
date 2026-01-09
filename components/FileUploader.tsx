
import React, { useState, useRef } from 'react';
import { useFile } from '../context/FileContext';
import { Briefcase, Skull } from 'lucide-react';

const FileUploader: React.FC = () => {
  const { startTransfer } = useFile();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      startTransfer(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      startTransfer(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isDragging ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div 
        onClick={openFileDialog}
        className={`w-full h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all duration-500 overflow-hidden ${
          isDragging 
            ? 'border-red-600 bg-red-600/10 shadow-[0_0_30px_rgba(220,38,38,0.2)]' 
            : 'border-white/10 bg-zinc-900/40 hover:border-red-600/50 hover:bg-zinc-900/60'
        }`}
      >
        <div className="relative z-10 flex flex-col items-center gap-6 text-center p-8">
          <div className={`p-8 rounded-full transition-all duration-300 ${
            isDragging ? 'bg-red-600 rotate-12 scale-110 shadow-lg shadow-red-900/50' : 'bg-zinc-800 group-hover:bg-zinc-700'
          }`}>
            {isDragging ? (
              <Skull className="w-16 h-16 text-white" />
            ) : (
              <Briefcase className="w-16 h-16 text-zinc-400 group-hover:text-red-500" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-3xl font-black uppercase tracking-tight group-hover:text-red-500 transition-colors">
              Load the Stash
            </h3>
            <p className="text-zinc-500 text-sm font-medium max-w-[200px] mx-auto">
              Drop your cargo here or click to browse the vault
            </p>
          </div>
        </div>
        
        <div className="absolute top-4 left-4 opacity-5 pointer-events-none">
          <span className="gangsta-font text-5xl">THUG</span>
        </div>
        <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
          <span className="gangsta-font text-5xl">LIFE</span>
        </div>
      </div>
      
      <div className={`absolute -inset-1 rounded-2xl bg-red-600 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}></div>
    </div>
  );
};

export default FileUploader;
