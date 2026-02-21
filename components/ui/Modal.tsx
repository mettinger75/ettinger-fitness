'use client';

import { useEffect, useCallback, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Content rendered sticky at the bottom (e.g. a Save button). Always visible even when form scrolls. */
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const preventScroll = (e: TouchEvent) => {
        if (dialogRef.current?.contains(e.target as Node)) return;
        e.preventDefault();
      };
      document.addEventListener('touchmove', preventScroll, { passive: false });
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', preventScroll);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  // Dynamically cap modal height to the visual viewport (handles iOS keyboard)
  useEffect(() => {
    if (!open) return;
    const handleResize = () => {
      if (dialogRef.current) {
        const vv = window.visualViewport;
        if (vv) {
          dialogRef.current.style.maxHeight = `${vv.height - 20}px`;
        }
      }
    };
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', handleResize);
      handleResize();
      return () => vv.removeEventListener('resize', handleResize);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl glass shadow-2xl animate-slide-up flex flex-col"
        style={{ maxHeight: '90dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — always visible */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-4 shrink-0">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-bg-card-hover transition-colors text-text-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto overscroll-contain flex-1 min-h-0 px-5 sm:px-6">
          {children}
        </div>

        {/* Sticky footer — always visible at bottom */}
        {footer && (
          <div className="shrink-0 px-5 sm:px-6 pt-4 pb-5 sm:pb-6 border-t border-glass-border/50">
            {footer}
          </div>
        )}

        {/* Bottom padding when no footer */}
        {!footer && <div className="h-5 sm:h-6 shrink-0" />}
      </div>
    </div>
  );
}
