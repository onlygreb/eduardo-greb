import { useEffect } from "react";

type GameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  gameUrl: string;
};

export default function GameModal({
  isOpen,
  onClose,
  gameUrl,
}: GameModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 w-full max-w-5xl h-[90vh] rounded-lg shadow-2xl p-2 md:p-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-green-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold z-10 hover:bg-green-300 transition-colors"
          aria-label="Close"
        >
          ×
        </button>
        <iframe
          src={gameUrl}
          title="Eduardo's Quest"
          className="w-full h-full border-0 rounded-md bg-gray-900"
        />
      </div>
    </div>
  );
}
