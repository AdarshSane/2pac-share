
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-8 mt-auto border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
          &copy; {new Date().getFullYear()} 2PAC-SHARE - THE STREETS DON'T FORGET
        </p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
          <a href="#" className="hover:text-red-600 transition-colors">Trust No One</a>
          <a href="#" className="hover:text-red-600 transition-colors">Only God Can Judge</a>
          <a href="#" className="hover:text-red-600 transition-colors">The Lab</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
