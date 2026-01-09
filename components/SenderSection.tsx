
import React, { useState, useEffect } from 'react';
import { useFile } from '../context/FileContext';
import FileUploader from './FileUploader';
import { Copy, Check, X, Share2, ShieldCheck, FileText, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SenderSection: React.FC = () => {
  const { activeFile, transferId, resetTransfer } = useFile();
  const [copied, setCopied] = useState(false);
  const [gangstaMessage, setGangstaMessage] = useState("The goods are ready. Keep this tab open.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const shareUrl = `${window.location.origin}/#/receive/${transferId}`;

  useEffect(() => {
    if (!activeFile) {
      setFilePreview(null);
      return;
    }

    if (activeFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(activeFile);
    }

    const fetchGangstaMessage = async () => {
      setIsGenerating(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Create a one-sentence, super gritty gangsta-style message (max 12 words) about sharing a stash called "${activeFile.name}". Use heavy slang. No emojis.`,
          config: { temperature: 1.0 }
        });
        setGangstaMessage(response.text.trim().replace(/"/g, '') || gangstaMessage);
      } catch (err) {
        console.error("Gemini failed, using default message.");
      } finally {
        setIsGenerating(false);
      }
    };

    fetchGangstaMessage();
  }, [activeFile]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeFile) {
    return <FileUploader />;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="bg-zinc-900/80 border border-red-600/20 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm red-glow">
        <button 
          onClick={resetTransfer}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-red-500 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/30 overflow-hidden flex-shrink-0">
              {filePreview ? (
                <img src={filePreview} alt="preview" className="w-full h-full object-cover opacity-80" />
              ) : activeFile.type.startsWith('image/') ? (
                <ImageIcon className="w-8 h-8 text-red-600" />
              ) : (
                <FileText className="w-8 h-8 text-red-600" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-black text-xl truncate tracking-tight">{activeFile.name}</h3>
              <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                {(activeFile.size / (1024 * 1024)).toFixed(2)} MB • READY
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 block">Stash Access Code</label>
              <div className="flex items-center gap-3 bg-black/60 p-5 rounded-xl border border-white/5 ring-1 ring-white/5">
                <span className="gangsta-font text-5xl text-red-600 tracking-widest flex-grow">{transferId}</span>
                <button 
                  onClick={() => copyToClipboard(transferId || '')}
                  className="p-4 bg-zinc-800 hover:bg-red-600 transition-all rounded-lg text-zinc-400 hover:text-white"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 block">Direct Burner Link</label>
              <div className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                <code className="text-zinc-500 text-[10px] truncate flex-grow font-mono italic">{shareUrl}</code>
                <button 
                  onClick={() => copyToClipboard(shareUrl)}
                  className="p-2 hover:text-red-500 transition-colors text-zinc-700"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
               <ShieldCheck className="w-4 h-4 text-red-600" />
            </div>
            <p className={`text-sm text-zinc-400 font-medium italic transition-opacity ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
              "{gangstaMessage}"
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-3 px-6 py-4 bg-red-600/5 rounded-xl border border-red-600/10">
        <div className="w-2 h-2 rounded-full bg-red-600 animate-ping"></div>
        <p className="text-[10px] font-black uppercase text-red-600 tracking-[0.3em]">
          Uplink Active • Keep Window Open
        </p>
      </div>
    </div>
  );
};

export default SenderSection;
