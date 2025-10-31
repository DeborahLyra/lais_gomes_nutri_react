import { useEffect, useState, useMemo } from "react";
import { ArrowLeft, Clock, CookingPot, FileSearchIcon, Flame, Star } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { Recipe } from "../../types/supabase"; // sua interface Recipe

export function AllRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeDifficulty, setActiveDifficulty] = useState("Todas");

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar receitas:", error);
        setError("Não foi possível carregar as receitas. Tente novamente.");
      } else {
        setRecipes(data as Recipe[]);
      }
      setLoading(false);
    }

    fetchRecipes();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(["Todas"]);
    recipes.forEach(r => unique.add(r.category));
    return Array.from(unique);
  }, [recipes]);

  const difficulties = ["Todas", "easy", "medium", "hard"];

  // 🔹 Filtragem por busca, categoria e dificuldade
  const filteredRecipes = recipes.filter(recipe => {
    const searchMatch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch =
      activeCategory === "Todas" || recipe.category === activeCategory;

    const difficultyMatch =
      activeDifficulty === "Todas" || recipe.difficulty === activeDifficulty;

    return searchMatch && categoryMatch && difficultyMatch;
  });

  // 🔹 Renderização condicional
  let content;
  if (loading) {
    content = <p className="text-center text-xl text-slate-500 col-span-full">Carregando receitas...</p>;
  } else if (error) {
    content = <p className="text-center text-xl text-red-600 col-span-full">{error}</p>;
  } else if (filteredRecipes.length === 0) {
    content = <p className="text-center text-xl text-slate-500 col-span-full">Nenhuma receita encontrada.</p>;
  } else {
    content = filteredRecipes.map(recipe => (
      <div
        key={recipe.id}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="aspect-video overflow-hidden relative">
          <img
            src={recipe.image_url || "/placeholder-food.jpg"}
            alt={recipe.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <span className="inline-block px-2 py-1 bg-pink-50 text-muted-pink text-xs font-medium rounded-full">
              {recipe.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-600">
              <Star size={14} weight="fill" />
              <span className="text-xs font-medium">
                {(Math.random() * (5 - 4.3) + 4.3).toFixed(1)}
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            <Link to={`/recipes/${recipe.id}`} className="hover:text-muted-pink transition-colors">
              {recipe.title}
            </Link>
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {recipe.preparation_time}
              </div>
              <span
                className={`px-2 py-1 rounded-full ${
                  recipe.difficulty === "easy"
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
            </div>
            <div className="flex items-center gap-1 text-gray-900 font-medium">
              <Flame size={12} />
              {recipe.calories}
            </div>
          </div>

          <Link
            to={`/recipe-detail/${recipe.id}`}
            className="block w-full text-center py-2 bg-muted-pink text-white rounded-lg hover:bg-pink-800 transition-colors text-sm font-medium"
          >
            Ver Receita
          </Link>
        </div>
      </div>
    ));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/dashboard" className="p-2 hover:bg-pink-800 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-muted-pink" />
            </Link>
            <div className="flex items-center gap-3">
              <CookingPot size={32} weight="bold" className="text-muted-pink" />
              <div>
                <h1 className="text-2xl font-bold text-muted-pink">Todas as Receitas</h1>
                <p className="text-slate-700">Descubra novas delícias saudáveis</p>
              </div>
            </div>
          </div>

          {/* Search e Filtros */}
          <div className="space-y-4">
            <div className="relative">
              <FileSearchIcon size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar receitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 whitespace-nowrap rounded-lg border transition-colors cursor-pointer ${
                      activeCategory === category
                        ? "bg-muted-pink text-white border-muted-pink"
                        : "bg-white text-muted-pink border border-muted-pink hover:bg-pink-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setActiveDifficulty(difficulty)}
                    className={`px-4 py-2 whitespace-nowrap rounded-lg border transition-colors cursor-pointer ${
                      activeDifficulty === difficulty
                        ? "bg-muted-pink text-white border-muted-pink"
                        : "bg-white text-muted-pink border border-muted-pink hover:bg-pink-50"
                    }`}
                  >
                    {difficulty === "easy"
                      ? "Fácil"
                      : difficulty === "medium"
                      ? "Médio"
                      : difficulty === "hard"
                      ? "Difícil"
                      : "Todas"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content}
        </div>
      </main>
    </div>
  );
}
