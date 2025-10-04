import { X, NewspaperClipping } from "@phosphor-icons/react";
import type { News } from "../../types/supabase";

interface NewsViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: News | null;
}

export function NewsViewModal({ isOpen, onClose, news }: NewsViewModalProps) {
  if (!isOpen || !news) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
            <NewspaperClipping size={28} className="text-dusty-red" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dusty-red">{news.title}</h2>
            <p className="text-sm text-gray-500">
              Publicado em {new Date(news.created_at).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        {/* Imagem */}
        {news.image_url && (
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Informações básicas */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Categoria:</strong> {news.category}</p>
          <p><strong>Status:</strong> {news.status === 'published' ? 'Publicado' : 'Rascunho'}</p>
        </div>

        {/* Conteúdo */}
        <div className="mt-6">
          <h3 className="font-semibold text-dusty-red mb-2">Conteúdo</h3>
          <p className="text-gray-700 whitespace-pre-line">{news.content}</p>
        </div>
      </div>
    </div>
  );
}
