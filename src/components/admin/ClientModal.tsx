import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import type { Client } from "../../types/supabase";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: Omit<Client, "id" | "created_at" | "updated_at">) => void;
  initialData?: Client | null;
}

export function ClientModal({ isOpen, onClose, onSave, initialData }: ClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "basic" as "basic" | "premium",
    status: "active" as "active" | "inactive",
    address: "",
    birth_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        plan: initialData.plan,
        status: initialData.status,
        address: initialData.address || "",
        birth_date: initialData.birth_date || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        plan: "basic",
        status: "active",
        address: "",
        birth_date: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex justify-center z-50 overflow-y-auto py-10">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-dusty-red mb-4">
          {initialData ? "Editar Cliente" : "Novo Cliente"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="border border-dusty-red rounded-lg px-3 py-2"
            >
              <option value="basic">Básico</option>
              <option value="premium">Premium</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-dusty-red rounded-lg px-3 py-2"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors"
          >
            {initialData ? "Salvar Alterações" : "Adicionar Cliente"}
          </button>
        </div>
      </div>
    </div>
  );
}
