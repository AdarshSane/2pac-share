
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="p-6 md:px-12 flex justify-between items-center border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-red-600 p-1.5 rounded-sm transform -rotate-3 group-hover:rotate-0 transition-transform">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <span className="gangsta-font text-2xl tracking-tighter text-white">2PAC-SHARE</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <span className="hidden md:inline text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          Peer-to-Peer Underground
        </span>
        <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
      </div>
    </nav>
  );
};

export default Navbar;
