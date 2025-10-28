import { X } from "@phosphor-icons/react";
import type { Recipe } from "../../types/supabase";

interface RecipeViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

// Mapeamento para exibição amigável
const difficultyMap: { [key: string]: string } = {
    'easy': 'Fácil',
    'medium': 'Médio',
    'hard': 'Difícil',
};

const statusMap: { [key: string]: string } = {
    'draft': 'Rascunho',
    'published': 'Publicado',
};

// Cores para os badges (melhora a visualização do status/dificuldade)
const difficultyColorMap: { [key: string]: string } = {
    'easy': 'bg-green-100 text-green-700',
    'medium': 'bg-yellow-100 text-yellow-700',
    'hard': 'bg-red-100 text-red-700',
};

export function RecipeViewModal({ isOpen, onClose, recipe }: RecipeViewModalProps) {
  if (!isOpen || !recipe) return null;

  // Garante que os arrays de ingredientes e instruções não sejam null/undefined
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];

  // Converte a dificuldade para exibição
  const displayDifficulty = difficultyMap[recipe.difficulty] || recipe.difficulty;
  const difficultyClasses = difficultyColorMap[recipe.difficulty] || 'bg-gray-100 text-gray-700';

  // Converte o status para exibição
  const displayStatus = statusMap[recipe.status] || recipe.status;
  const statusClasses = recipe.status === 'published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';


  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 relative my-10 max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-dusty-red mb-4 border-b pb-2">
          {recipe.title}
        </h2>

        {/* Imagem com Fallback */}
        <img
          src={recipe.image_url || 'https://placehold.co/800x400/CCCCCC/333333?text=Sem+Imagem'}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/800x400/CCCCCC/333333?text=Sem+Imagem'; }}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
        />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pb-4 border-b border-gray-100 mb-6">
            <p className="flex flex-col text-sm">
                <strong className="text-gray-500 font-medium">Categoria</strong>
                <span className="text-gray-800 font-bold">{recipe.category}</span>
            </p>
            <p className="flex flex-col text-sm">
                <strong className="text-gray-500 font-medium">Calorias</strong>
                <span className="text-gray-800 font-bold">{recipe.calories || 'N/A'}</span>
            </p>
            <p className="flex flex-col text-sm">
                <strong className="text-gray-500 font-medium">Dificuldade</strong>
                <span className={`px-2 py-1 text-xs font-bold rounded-full w-fit ${difficultyClasses}`}>
                    {displayDifficulty}
                </span>
            </p>
            <p className="flex flex-col text-sm">
                <strong className="text-gray-500 font-medium">Preparo</strong>
                <span className="text-gray-800 font-bold">{recipe.preparation_time}</span>
            </p>
            <p className="flex flex-col text-sm">
                <strong className="text-gray-500 font-medium">Status</strong>
                <span className={`px-2 py-1 text-xs font-bold rounded-full w-fit ${statusClasses}`}>
                    {displayStatus}
                </span>
            </p>
        </div>

        {/* Descrição */}
        <div className="mt-4">
          <h3 className="text-xl font-bold text-dusty-red mb-2">Descrição</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.description}</p>
        </div>

        {/* Ingredientes */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-dusty-red mb-3">Ingredientes ({ingredients.length})</h3>
          {ingredients.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                {ingredients.map((ing, i) => (
                <li key={i} className="text-base">{ing}</li>
                ))}
            </ul>
          ) : (
             <p className="text-gray-500">Nenhum ingrediente listado.</p>
          )}
        </div>

        {/* Instruções */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-dusty-red mb-3">Modo de Preparo ({instructions.length} Passos)</h3>
          {instructions.length > 0 ? (
            <ol className="list-decimal list-inside text-gray-700 space-y-3 pl-4">
                {instructions.map((step, i) => (
                <li key={i} className="text-base">{step}</li>
                ))}
            </ol>
          ) : (
            <p className="text-gray-500">Nenhuma instrução de preparo listada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
    
