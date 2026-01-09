
import React, { useState, useEffect } from 'react';
import { useFile } from '../context/FileContext';
import { Copy, Check, X, Share2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const TransferStatus: React.FC = () => {
  const { activeFile, transferId, resetTransfer } = useFile();
  const [copied, setCopied] = useState(false);
  const [gangstaMessage, setGangstaMessage] = useState("The goods are ready for pickup. Don't let the snitches see.");
  const [isGenerating, setIsGenerating] = useState(false);

  const shareUrl = `${window.location.origin}/#/receive/${transferId}`;

  useEffect(() => {
    const fetchGangstaMessage = async () => {
      if (!activeFile) return;
      setIsGenerating(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Create a very short (max 15 words) "gangsta" flavored message for a file transfer called "${activeFile.name}". Use slang like 'loot', 'stash', 'goods', 'snitches', 'streets'.`,
          config: { temperature: 0.9 }
        });
        setGangstaMessage(response.text.trim() || gangstaMessage);
      } catch (err) {
        console.error("Gemini failed, using default message.");
      } finally {
        setIsGenerating(false);
      }
    };

    fetchGangstaMessage();
  }, [activeFile]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeFile) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white px-2 py-0.5 text-[10px] font-black uppercase rounded-sm">Live Feed</span>
            <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping"></div>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">DEAL IN PROGRESS</h2>
        </div>
        <button 
          onClick={resetTransfer}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Share2 className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg inline-block">
                <Share2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-1">Secret Location</h3>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5">
                  <code className="text-red-500 font-mono text-sm truncate flex-grow">
                    {shareUrl}
                  </code>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-zinc-500 text-[10px] leading-tight flex items-center gap-2 uppercase font-black">
                <AlertCircle className="w-3 h-3 text-red-600" />
                Keep this tab open or the deal is off.
              </p>
            </div>
          </div>

          <div className="p-6 border border-white/5 bg-zinc-900 rounded-2xl space-y-4">
            <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">The Messenger Says</h3>
            <p className={`gangsta-font text-xl md:text-2xl text-white/90 leading-tight italic transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
              "{gangstaMessage}"
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Cargo manifest</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-zinc-800 rounded flex items-center justify-center flex-shrink-0 border border-white/5">
                <div className="text-red-600 font-black text-xs uppercase">{activeFile.name.split('.').pop()}</div>
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold truncate text-lg">{activeFile.name}</div>
                <div className="text-zinc-500 text-sm">{(activeFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                <div className="mt-2 inline-flex items-center gap-2 text-xs font-black uppercase text-red-600">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                  Waiting for Connection...
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border border-red-600/20 bg-red-600/5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-red-600 border-t-transparent animate-spin flex-shrink-0"></div>
            <div>
              <h4 className="text-white font-bold uppercase text-sm">Scanning Streets</h4>
              <p className="text-zinc-500 text-xs">Awaiting a recipient to open the link...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferStatus;
