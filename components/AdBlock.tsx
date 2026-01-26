
import React, { useEffect, useRef } from 'react';

interface AdBlockProps {
  code: string;
  className?: string;
}

const AdBlock: React.FC<AdBlockProps> = ({ code, className }) => {
  const adRef = useRef<HTMLDivElement>(null);

  // Check if code is a real script or just a placeholder comment
  const isPlaceholder = !code || 
                        code.trim().startsWith('<!--') || 
                        code.trim() === '' || 
                        code.includes('AdSense Header Placeholder');

  useEffect(() => {
    if (adRef.current && !isPlaceholder) {
      adRef.current.innerHTML = '';
      const range = document.createRange();
      const fragment = range.createContextualFragment(code);
      adRef.current.appendChild(fragment);
      
      // Re-run scripts if any (important for AdSense/AdX)
      const scripts = adRef.current.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement('script');
        if (scripts[i].src) {
          script.src = scripts[i].src;
        } else {
          script.innerHTML = scripts[i].innerHTML;
        }
        document.body.appendChild(script);
      }
    }
  }, [code, isPlaceholder]);

  if (isPlaceholder) return null;

  return (
    <div 
      ref={adRef} 
      className={`ad-container flex justify-center items-center bg-transparent min-h-[50px] overflow-hidden rounded-xl ${className}`}
    />
  );
};

export default AdBlock;
