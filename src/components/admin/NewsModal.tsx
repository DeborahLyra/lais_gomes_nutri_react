import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import type { News } from "../../types/supabase";

type NewsPayload = Omit<News, 'id' | 'created_at' | 'updated_at'>;

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newsData: NewsPayload, id?: string) => Promise<void>; 
  initialData?: News | null;
}

const initialFormState: NewsPayload = {
  title: "",
  content: "",
  excerpt: "",
  category: "",
  image_url: "",
  status: "draft",
};

export function NewsModal({ isOpen, onClose, onSave, initialData }: NewsModalProps) {
  const [formData, setFormData] = useState<NewsPayload>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        excerpt: initialData.excerpt,
        category: initialData.category,
        image_url: initialData.image_url,
        status: initialData.status,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData, initialData?.id); 
      
      setFormData(initialFormState); 
      
      onClose(); 
    } catch (error) {
      console.error("Erro ao salvar notícia no modal:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 transition-colors"
          disabled={isSaving}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-dusty-red mb-6">
          {initialData ? "Editar Notícia" : "Nova Notícia"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />

          <textarea
            name="excerpt"
            placeholder="Resumo (Máximo 2 linhas)"
            value={formData.excerpt}
            onChange={handleChange}
            maxLength={255}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-20 resize-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />

          <textarea
            name="content"
            placeholder="Conteúdo completo da notícia"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="category"
              placeholder="Categoria (Ex: Pesquisa, Dicas)"
              value={formData.category}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
            />
             <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition bg-white"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          <input
            type="text"
            name="image_url"
            placeholder="URL da imagem principal (Ex: https://...)"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">
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
            {isSaving ? (initialData ? "Salvando..." : "Adicionando...") : (initialData ? "Salvar Alterações" : "Adicionar Notícia")}
          </button>
        </div>
      </div>
    </div>
  );
}
