import { X } from "@phosphor-icons/react";
import type { Recipe } from "../../types/supabase";

interface RecipeViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

export function RecipeViewModal({ isOpen, onClose, recipe }: RecipeViewModalProps) {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-[2px] flex justify-center overflow-y-auto py-10">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-dusty-red mb-4">
          {recipe.title}
        </h2>

        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <div className="space-y-2 text-gray-700">
          <p><strong>Categoria:</strong> {recipe.category}</p>
          <p><strong>Dificuldade:</strong> {recipe.difficulty}</p>
          <p><strong>Tempo de preparo:</strong> {recipe.preparation_time}</p>
          <p><strong>Calorias:</strong> {recipe.calories}</p>
          <p><strong>Status:</strong> {recipe.status}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-dusty-red mb-2">Descrição</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-dusty-red mb-2">Ingredientes</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {recipe.ingredients?.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-dusty-red mb-2">Modo de Preparo</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {recipe.instructions?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
