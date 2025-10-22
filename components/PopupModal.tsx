"use client";

import React, { useEffect, useState } from "react";

interface PopupModalProps {
  message: string;
  subText?: string;
  show: boolean;
  type?: "success" | "error" | "info";
  onClose?: () => void;
  autoHide?: boolean; // default: true
}

export default function PopupModal({
  message,
  subText,
  show,
  type = "success",
  onClose,
  autoHide = true,
}: PopupModalProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      if (autoHide) {
        const timer = setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [show, autoHide, onClose]);

  if (!visible) return null;

  // 🎨 Type based color styling
  const colors =
    type === "success"
      ? "border-green-500 text-green-600"
      : type === "error"
      ? "border-red-500 text-red-600"
      : "border-blue-500 text-blue-600";

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
        <div
          className={`relative bg-white p-10 rounded-3xl shadow-2xl w-[90%] md:w-[500px] text-center border-t-8 ${colors} animate-fadeInZoom`}
        >
          <h2 className="text-3xl font-bold mb-3">{message}</h2>
          {subText && <p className="text-gray-700 text-lg">{subText}</p>}

          {/* Close button */}
          <button
            onClick={() => {
              setVisible(false);
              if (onClose) onClose();
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ✖
          </button>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeInZoom {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInZoom {
          animation: fadeInZoom 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
