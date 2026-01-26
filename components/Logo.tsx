
import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false, light = false }) => {
  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Icon Graphic */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transform transition-transform duration-500 group-hover:rotate-[10deg]"
        >
          <rect width="48" height="48" rx="14" fill="url(#logo_grad)" />
          <path d="M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C27.1449 14 29.932 15.4466 31.7607 17.7083L27.6009 20.8407C26.702 19.6644 25.4101 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29C26.0463 29 27.8182 27.769 28.6019 26H24V22H33.5C33.8241 22.637 34 23.3033 34 24Z" fill="white" />
          <circle cx="38" cy="10" r="3" fill="#60A5FA" className="animate-pulse" />
          <defs>
            <linearGradient id="logo_grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text Branding */}
      {!iconOnly && (
        <span className={`text-2xl font-black tracking-tighter transition-colors ${light ? 'text-white' : 'text-slate-900'}`}>
          GENMOZ<span className="text-blue-600">PRO</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
