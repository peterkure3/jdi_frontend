import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'info', onClose, position = 'top-right', duration = 3000 }) {
  const [open, setOpen] = useState(Boolean(message));
  useEffect(() => {
    if (message) setOpen(true);
  }, [message]);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setOpen(false);
      onClose && onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);
  if (!open || !message) return null;

  const pos = position === 'bottom-right' ? 'bottom-4 right-4' : 'top-4 right-4';
  const color = {
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    error: 'bg-status-error',
    info: 'bg-status-info',
  }[type] || 'bg-status-info';

  return (
    <div className={`fixed ${pos} z-50`}>
      <div className={`text-white shadow-card-lg rounded-lg px-4 py-3 flex items-center gap-3 ${color}`}>
        <span>{message}</span>
        <button onClick={() => { setOpen(false); onClose && onClose(); }} className="ml-2 text-white/90 hover:text-white">
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
}
