
import React from 'react';
import SenderSection from '../components/SenderSection';
import ReceiverSection from '../components/ReceiverSection';

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
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
  );
};

export default Home;
