import { X, User } from "@phosphor-icons/react";
import type { Client } from "../../types/supabase";

interface ClientViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function ClientViewModal({ isOpen, onClose, client }: ClientViewModalProps) {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-[2px] flex justify-center overflow-y-auto py-10">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <User size={32} className="text-dusty-red" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dusty-red">{client.name}</h2>
            <p className="text-sm text-gray-500">Plano: {client.plan}</p>
          </div>
        </div>

        <div className="space-y-2 text-gray-700">
          <p><strong>E-mail:</strong> {client.email}</p>
          <p><strong>Telefone:</strong> {client.phone}</p>
          <p><strong>Status:</strong> {client.status}</p>
          <p><strong>Endereço:</strong> {client.address}</p>
          <p><strong>Data de nascimento:</strong> {client.birth_date}</p>
          <p><strong>Cliente desde:</strong> {client.created_at}</p>
        </div>
      </div>
    </div>
  );
}
