
import React, { useState } from 'react';
import { Download, Search, AlertCircle, ShieldCheck, User, Skull } from 'lucide-react';

const ReceiverSection: React.FC = () => {
  const [code, setCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [fileFound, setFileFound] = useState<{ name: string; size: string } | null>(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    if (!code.trim()) return;
    
    setIsSearching(true);
    setError(false);
    setFileFound(null);

    // Simulate underground P2P lookup
    setTimeout(() => {
      setIsSearching(false);
      if (code.toUpperCase().length >= 4) {
        setFileFound({
          name: "Vault_Asset_" + code + ".zip",
          size: (Math.random() * 50 + 10).toFixed(1) + " MB"
        });
      } else {
        setError(true);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {!fileFound ? (
        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8 lg:p-10 space-y-8 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 opacity-[0.02] rotate-12 pointer-events-none">
            <Skull className="w-64 h-64" />
          </div>

          <div className="space-y-4 relative z-10">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 block">Burner Code Required</label>
            <div className="relative group">
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="STASH-ID"
                className="w-full bg-black border-2 border-white/10 rounded-2xl px-8 py-6 text-4xl gangsta-font tracking-[0.2em] text-white focus:border-red-600 focus:outline-none transition-all placeholder:text-zinc-900 shadow-inner"
              />
              <div className="absolute inset-0 rounded-2xl bg-red-600 opacity-0 group-focus-within:opacity-10 blur-2xl -z-10 transition-opacity"></div>
            </div>
          </div>

          <button 
            onClick={handleSearch}
            disabled={isSearching || !code}
            className="w-full bg-zinc-100 hover:bg-red-600 hover:text-white text-black font-black uppercase py-6 rounded-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed group shadow-xl"
          >
            {isSearching ? (
              <>
                <div className="w-6 h-6 border-4 border-black border-t-transparent animate-spin rounded-full"></div>
                <span className="tracking-widest">Scanning Streets...</span>
              </>
            ) : (
              <>
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-xl tracking-widest">Locate the Stash</span>
              </>
            )}
          </button>

          {error && (
            <div className="flex items-center gap-4 p-5 bg-red-600/10 border border-red-600/20 rounded-xl animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-xs text-red-500 font-bold uppercase tracking-widest leading-relaxed">
                Uplink failed. The code is dead or the stash was dumped.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-green-600/30 rounded-2xl p-10 space-y-10 animate-in zoom-in-95 duration-500 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck className="w-40 h-40 text-green-600" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-500">Secure Uplink Verified</span>
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-green-600/10 rounded-2xl flex items-center justify-center border border-green-600/30 shadow-inner">
                <Download className="w-10 h-10 text-green-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-black text-3xl truncate tracking-tighter">{fileFound.name}</h3>
                <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">{fileFound.size} • PAYLOAD</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-black/50 rounded-2xl border border-white/5 flex gap-5 items-start">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
              <User className="w-6 h-6 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-400 italic leading-relaxed pt-2">
              "The goods are yours. Take 'em and hit the shadows. Don't look back."
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => alert("Downloading via Peer-to-Peer...")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase py-6 rounded-2xl shadow-[0_15px_30px_-10px_rgba(22,163,74,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 text-xl tracking-widest"
            >
              <Download className="w-7 h-7" />
              Snatched
            </button>
            <button 
              onClick={() => { setFileFound(null); setCode(''); }}
              className="text-[10px] text-zinc-600 hover:text-red-500 uppercase font-black tracking-[0.3em] transition-colors py-2 text-center"
            >
              Abort Mission
            </button>
          </div>
        </div>
      )}

      {/* Gritty footer note */}
      <div className="flex items-center gap-3 px-2 justify-center lg:justify-start">
        <div className="h-1 w-1 rounded-full bg-zinc-800"></div>
        <p className="text-[8px] text-zinc-800 font-black uppercase tracking-[0.5em]">
          End-to-End Underground Encryption
        </p>
      </div>
    </div>
  );
};

export default ReceiverSection;
