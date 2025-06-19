import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen px-4 pt-8 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-obsidian bg-opacity-75"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block w-full max-w-4xl px-4 pt-5 pb-4 my-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:p-6 relative">
          <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};