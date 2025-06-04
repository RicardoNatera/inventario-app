"use client";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

type ConfirmModalProps = {
  title?: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
};

export function showConfirmModal({
  title = "¿Estás seguro?",
  message,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmModalProps) {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="bg-white p-6 rounded shadow-xl max-w-sm mx-auto mt-40 text-center border border-gray-300">
          <h2 className="text-lg font-bold mb-2 text-red-600">{title}</h2>
          <p className="text-gray-700 mb-4">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={async () => {
                await onConfirm();
                onClose();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              {cancelText}
            </button>
          </div>
        </div>
      );
    },
  });
}
