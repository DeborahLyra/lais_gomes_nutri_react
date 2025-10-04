import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import type { News } from "../../types/supabase";


interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newsData: Omit<News, 'id' | 'created_at' | 'updated_at'>) => void;
  initialData?: News | null;
}

export function NewsModal({ isOpen, onClose, onSave, initialData }: NewsModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    image_url: "",
    status: "draft" as "draft" | "published",
  });

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
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "",
        image_url: "",
        status: "draft",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-dusty-red mb-4">
          {initialData ? "Editar Notícia" : "Nova Notícia"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />

          <textarea
            name="excerpt"
            placeholder="Resumo"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2 h-20"
          />

          <textarea
            name="content"
            placeholder="Conteúdo"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2 h-32"
          />

          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="image_url"
            placeholder="URL da imagem"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-dusty-red rounded-lg px-3 py-2"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
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
            {initialData ? "Salvar Alterações" : "Adicionar Notícia"}
          </button>
        </div>
      </div>
    </div>
  );
}
