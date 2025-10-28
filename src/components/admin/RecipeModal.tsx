import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import type { Recipe } from "../../types/supabase";

// Definimos o tipo de dado manipulado (sem os campos de BD gerados)
type RecipePayload = Omit<Recipe, "id" | "created_at" | "updated_at">;

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSave agora deve retornar uma Promise, pois chamará o Supabase (async)
  onSave: (recipeData: RecipePayload, id?: string) => Promise<void>;
  initialData?: Recipe | null;
}

// Estado inicial padrão para limpar o formulário
const initialFormState: RecipePayload = {
    title: "",
    description: "",
    category: "",
    difficulty: "easy",
    preparation_time: "",
    calories: "",
    ingredients: [""], // Inicializa com um item vazio
    instructions: [""], // Inicializa com um item vazio
    image_url: "",
    status: "draft",
};

export function RecipeModal({ isOpen, onClose, onSave, initialData }: RecipeModalProps) {
  const [formData, setFormData] = useState<RecipePayload>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        difficulty: initialData.difficulty,
        preparation_time: initialData.preparation_time,
        calories: initialData.calories,
        // Garante que sejam arrays, mesmo que vazios
        ingredients: initialData.ingredients || [""], 
        instructions: initialData.instructions || [""],
        image_url: initialData.image_url,
        status: initialData.status,
      });
    } else {
      // Limpa o formulário para "Nova Receita"
      setFormData(initialFormState);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleArrayChange = (
    index: number,
    field: "ingredients" | "instructions",
    value: string
  ) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field: "ingredients" | "instructions") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };
  
  const removeArrayItem = (field: "ingredients" | "instructions", indexToRemove: number) => {
    // Garante que sempre haja pelo menos um input, se for o último item
    if (formData[field].length === 1) return;

    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    
    // Limpa strings vazias dos arrays antes de salvar
    const cleanedFormData = {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.trim() !== ""),
        instructions: formData.instructions.filter(i => i.trim() !== ""),
    } as RecipePayload;

    try {
        await onSave(cleanedFormData, initialData?.id);
        
        // Limpa o formulário após o save bem-sucedido
        setFormData(initialFormState);
        
        onClose(); 
    } catch (error) {
        console.error("Erro ao salvar receita no modal:", error);
        // Implementar feedback de erro aqui
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 relative my-10 max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 transition-colors"
          disabled={isSaving}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-dusty-red mb-6">
          {initialData ? "Editar Receita" : "Nova Receita"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />
          <input
            type="text"
            name="category"
            placeholder="Categoria (Ex: Almoço, Vegano)"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition bg-white"
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>

          <input
            type="text"
            name="preparation_time"
            placeholder="Tempo de preparo (ex: 30 min)"
            value={formData.preparation_time}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />

          <input
            type="text"
            name="calories"
            placeholder="Calorias (ex: 250 kcal)"
            value={formData.calories}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />
          
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition bg-white"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>


          <input
            type="text"
            name="image_url"
            placeholder="URL da imagem principal"
            value={formData.image_url}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 col-span-2 focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
          />
        </div>

        <textarea
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4 h-24 resize-none focus:ring-1 focus:ring-dusty-red focus:border-dusty-red transition"
        />

        {/* Ingredientes */}
        <div className="mt-6 border p-4 rounded-lg border-gray-200">
          <h3 className="font-semibold text-dusty-red mb-3">Ingredientes</h3>
          {formData.ingredients.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(index, "ingredients", e.target.value)}
                    placeholder={`Ingrediente ${index + 1}`}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("ingredients", index)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("ingredients")}
            className="text-sm text-dusty-red hover:text-muted-pink mt-1 transition-colors"
          >
            + Adicionar ingrediente
          </button>
        </div>

        {/* Instruções */}
        <div className="mt-6 border p-4 rounded-lg border-gray-200">
          <h3 className="font-semibold text-dusty-red mb-3">Modo de Preparo</h3>
          {formData.instructions.map((step, index) => (
            <div key={index} className="flex gap-2 mb-2 items-start">
                <textarea
                    value={step}
                    onChange={(e) => handleArrayChange(index, "instructions", e.target.value)}
                    placeholder={`Passo ${index + 1}`}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("instructions", index)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors mt-2"
                  >
                    <X size={18} />
                  </button>
                )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("instructions")}
            className="text-sm text-dusty-red hover:text-muted-pink mt-1 transition-colors"
          >
            + Adicionar passo
          </button>
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
            {isSaving ? (initialData ? "Salvando..." : "Adicionando...") : (initialData ? "Salvar Alterações" : "Adicionar Receita")}
          </button>
        </div>
      </div>
    </div>
  );
}
