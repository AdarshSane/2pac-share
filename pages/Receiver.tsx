
import React from 'react';
import ReceiverSection from '../components/ReceiverSection';
import { useParams } from 'react-router-dom';

const ReceiverPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">
          SECURE <span className="text-red-600">UPLINK</span>
        </h2>
        <p className="text-zinc-500 text-sm font-medium tracking-tight">
          Retrieving payload from stash: <span className="text-zinc-300 font-mono">{id || 'UNKNOWN'}</span>
        </p>
      </div>
      <ReceiverSection />
    </div>
  );
};

export default ReceiverPage;
