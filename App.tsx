
import React, { useState, useCallback } from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SenderSection from './components/SenderSection';
import ReceiverSection from './components/ReceiverSection';
import { FileContext } from './context/FileContext';

const App: React.FC = () => {
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [transferId, setTransferId] = useState<string | null>(null);

  const startTransfer = useCallback((file: File) => {
    setActiveFile(file);
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTransferId(id);
  }, []);

  const resetTransfer = useCallback(() => {
    setActiveFile(null);
    setTransferId(null);
  }, []);

  return (
    <FileContext.Provider value={{ activeFile, transferId, startTransfer, resetTransfer }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white">
          <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
          </div>
          
          <Navbar />
          
          <main className="flex-grow relative z-10 container mx-auto px-6 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Left Side: Sender */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <span className="text-red-600">01</span>
                    DISPATCH
                  </h2>
                  <p className="text-zinc-500 text-sm max-w-sm font-medium tracking-tight">
                    Secure your files in the underground vault. Direct P2P transfer only.
                  </p>
                </div>
                <SenderSection />
              </div>

              {/* Right Side: Receiver */}
              <div className="space-y-8 lg:pt-0">
                <div className="space-y-2">
                  <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <span className="text-zinc-700">02</span>
                    ACQUIRE
                  </h2>
                  <p className="text-zinc-500 text-sm max-w-sm font-medium tracking-tight">
                    Enter the burner code to retrieve the stash from the sender.
                  </p>
                </div>
                <ReceiverSection />
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </HashRouter>
    </FileContext.Provider>
  );
};

export default App;
