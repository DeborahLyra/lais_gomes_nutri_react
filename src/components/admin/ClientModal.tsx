import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import type { Client } from "../../types/supabase";

type ClientPayload = Omit<Client, "id" | "created_at" | "updated_at">;

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: ClientPayload, id?: string) => Promise<void>;
  initialData?: Client | null;
}

const initialFormState: ClientPayload = {
    name: "",
    email: "",
    phone: "",
    plan: "basic", 
    status: "active", 
    address: "",
    birth_date: "",
};

export function ClientModal({ isOpen, onClose, onSave, initialData }: ClientModalProps) {
  const [formData, setFormData] = useState<ClientPayload>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        plan: initialData.plan as "basic" | "premium", 
        status: initialData.status as "active" | "inactive", 
        address: initialData.address || "",
        birth_date: initialData.birth_date ? new Date(initialData.birth_date).toISOString().split('T')[0] : "", 
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
        await onSave(formData, initialData?.id);
        
        setFormData(initialFormState);
        
        onClose(); 
    } catch (error) {
        console.error("Erro ao salvar cliente no modal:", error);
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-[2px] flex justify-center overflow-y-auto py-10">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative my-10 max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 transition-colors"
          disabled={isSaving}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-dusty-red mb-6">
          {initialData ? "Editar Cliente" : "Novo Cliente"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone (Ex: (XX) XXXXX-XXXX)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço Completo"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />
          <div className="relative">
              <label htmlFor="birth_date" className="absolute -top-3 left-3 bg-white px-1 text-xs text-gray-500">
                  Data de Nascimento
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
              />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition bg-white"
            >
              <option value="basic">Plano Básico</option>
              <option value="premium">Plano Premium</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition bg-white"
            >
              <option value="active">Status Ativo</option>
              <option value="inactive">Status Inativo</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSaving ? (initialData ? "Salvando..." : "Adicionando...") : (initialData ? "Salvar Alterações" : "Adicionar Cliente")}
          </button>
        </div>
      </div>
    </div>
  );
}
