import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import type { Recipe } from "../../types/supabase";


interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipeData: Omit<Recipe, "id" | "created_at" | "updated_at">) => void;
  initialData?: Recipe | null;
}

export function RecipeModal({ isOpen, onClose, onSave, initialData }: RecipeModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "easy" as "easy" | "medium" | "hard",
    preparation_time: "",
    calories: "",
    ingredients: [""],
    instructions: [""],
    image_url: "",
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        difficulty: initialData.difficulty,
        preparation_time: initialData.preparation_time,
        calories: initialData.calories,
        ingredients: initialData.ingredients,
        instructions: initialData.instructions,
        image_url: initialData.image_url,
        status: initialData.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "easy",
        preparation_time: "",
        calories: "",
        ingredients: [""],
        instructions: [""],
        image_url: "",
        status: "draft",
      });
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

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative my-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-dusty-red mb-4">
          {initialData ? "Editar Receita" : "Nova Receita"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="border border-dusty-red rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            className="border border-dusty-red rounded-lg px-3 py-2"
          />

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="border border-dusty-red rounded-lg px-3 py-2"
          >
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>

          <input
            type="text"
            name="preparation_time"
            placeholder="Tempo de preparo"
            value={formData.preparation_time}
            onChange={handleChange}
            className="border border-dusty-red rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="calories"
            placeholder="Calorias (ex: 250 kcal)"
            value={formData.calories}
            onChange={handleChange}
            className="border border-dusty-red rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="image_url"
            placeholder="URL da imagem"
            value={formData.image_url}
            onChange={handleChange}
            className="border border-dusty-red rounded-lg px-3 py-2 col-span-2"
          />
        </div>

        <textarea
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-dusty-red rounded-lg px-3 py-2 mt-4 h-24"
        />

        {/* Ingredientes */}
        <div className="mt-6">
          <h3 className="font-semibold text-dusty-red mb-2">Ingredientes</h3>
          {formData.ingredients.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(index, "ingredients", e.target.value)}
              placeholder={`Ingrediente ${index + 1}`}
              className="w-full border border-dusty-red rounded-lg px-3 py-2 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("ingredients")}
            className="text-sm text-dusty-red hover:underline"
          >
            + Adicionar ingrediente
          </button>
        </div>

        {/* Instruções */}
        <div className="mt-6">
          <h3 className="font-semibold text-dusty-red mb-2">Modo de Preparo</h3>
          {formData.instructions.map((step, index) => (
            <textarea
              key={index}
              value={step}
              onChange={(e) => handleArrayChange(index, "instructions", e.target.value)}
              placeholder={`Passo ${index + 1}`}
              className="w-full border border-dusty-red rounded-lg px-3 py-2 mb-2 h-20"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("instructions")}
            className="text-sm text-dusty-red hover:underline"
          >
            + Adicionar passo
          </button>
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
            {initialData ? "Salvar Alterações" : "Adicionar Receita"}
          </button>
        </div>
      </div>
    </div>
  );
}
