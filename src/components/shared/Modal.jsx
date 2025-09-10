import { Fragment } from 'react';

export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative h-full w-full grid place-items-center p-4">
        <div className="bg-white rounded-xl shadow-card-lg w-full max-w-lg overflow-hidden transform transition-all">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="font-semibold">{title}</h3>
            <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="p-5">
            {children}
          </div>
          {actions && (
            <div className="px-5 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
