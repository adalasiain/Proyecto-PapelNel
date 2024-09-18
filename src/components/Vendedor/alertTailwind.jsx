import { CloseRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

const SweetAlert = ({ isOpen, onClose, content,  }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  
  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
      <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} onClick={e => e.stopPropagation()}>
        <div className="mt-3 text-center">
        <button
            onClick={onClose}
            className="absolute top-2 right-2 text-black hover:text-red-600"
          >
            <CloseRounded />
          </button>
          <div className="mt-2 px-7 py-3">
            {typeof content === 'string' ? (
              <p className="text-sm text-gray-500">{content}</p>
            ) : (
               content
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SweetAlert;