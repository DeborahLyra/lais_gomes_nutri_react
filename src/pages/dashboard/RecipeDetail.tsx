import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, User, Flame, Star } from "@phosphor-icons/react";
import { supabase } from "../../lib/supabase";

interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  preparation_time: string;
  calories: string;
  rating?: number;
  reviews?: number;
  image_url: string;
  ingredients: string[];
  instructions: string[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  tips?: string[];
  author?: string;
}

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔧 função segura para converter string JSON em array
  const safeParseArray = (value: any): string[] => {
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [String(parsed)];
    } catch {
      return typeof value === "string" ? [value] : [];
    }
  };

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        console.log("🔍 Buscando receita com ID:", id);

        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();

        console.log("📦 Dados retornados:", data);
        console.log("⚠️ Erro Supabase:", error);

        if (error) throw error;

        // ✅ Corrigir os campos que vierem como string
        const fixedData = {
          ...data,
          ingredients: safeParseArray(data.ingredients),
          instructions: safeParseArray(data.instructions),
        };

        setRecipe(fixedData);
      } catch (err) {
        console.error("❌ Erro ao buscar receita:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchRecipe();
  }, [id]);

  // Estado de carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-pink">
        Carregando receita...
      </div>
    );
  }

  // Caso não encontre receita
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-lg font-medium mb-2">Receita não encontrada 😢</p>
        <Link
          to="/all-recipes-page"
          className="text-muted-pink hover:underline"
        >
          Voltar para receitas
        </Link>
      </div>
    );
  }

  // Renderização da página
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/all-recipes-page"
            className="flex items-center gap-2 text-muted-pink hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar para receitas
          </Link>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2">
            {/* Imagem */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>

            {/* Detalhes */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={20} />
                  <span className="font-medium">{recipe.preparation_time}</span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${recipe.difficulty === "easy"
                      ? "bg-green-100 text-green-700"
                      : recipe.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {recipe.difficulty === "easy"
                    ? "Fácil"
                    : recipe.difficulty === "medium"
                      ? "Médio"
                      : "Difícil"}
                </span>

                <div className="flex items-center gap-2 text-gray-600">
                  <Flame size={20} />
                  <span className="font-medium">{recipe.calories}</span>
                </div>

                {recipe.rating && (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <Star size={20} weight="fill" />
                    <span className="font-medium">
                      {recipe.rating} ({recipe.reviews ?? 0})
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-muted-pink mb-3">
                {recipe.title}
              </h1>
              <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center">
                  <User size={20} className="text-muted-pink" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {recipe.author ?? "Equipe Nutri+"}
                  </p>
                  <p className="text-sm text-gray-600">{recipe.category}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-muted-pink mb-6">
                  Modo de Preparo
                </h2>
                <div className="space-y-2">
                  {recipe.instructions?.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <p className="text-gray-700">
                        {step.replace(/"/g, "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-muted-pink mb-4">
                    Ingredientes
                  </h3>

                  <div className="space-y-2">
                    {recipe.ingredients && recipe.ingredients.length > 0 ? (
                      recipe.ingredients.map((ingredient, index) => (
                        <p key={index} className="text-gray-700">
                          {ingredient.replace(/"/g, "")}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">Nenhum ingrediente listado.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Informação Nutricional */}
            {recipe.nutrition && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-muted-pink mb-4">
                  Informação Nutricional
                </h3>
                <div className="space-y-3">
                  {Object.entries(recipe.nutrition).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">
                        {key.replace("_", " ")}
                      </span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dicas */}
            {recipe.tips && (
              <div className="bg-pink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-muted-pink mb-3">
                  💡 Dicas
                </h3>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="text-muted-pink text-sm">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
