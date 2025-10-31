import { useEffect, useState } from "react";
import { CookingPot, Newspaper, ArrowRight, Clock } from "@phosphor-icons/react";
import { NavabarDashboard } from "./NavabarDashboard";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export function Dashboard() {
  const [news, setNews] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: newsData, error: newsError } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (newsError) console.error("Erro ao carregar notícias:", newsError);
      else setNews(newsData || []);

      const { data: recipesData, error: recipesError } = await supabase
        .from("recipes")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);

      if (recipesError) console.error("Erro ao carregar receitas:", recipesError);
      else setRecipes(recipesData || []);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <NavabarDashboard />

      <main className="mt-24 flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-muted-pink">Dashboard</h1>
          <p className="text-slate-700 mt-2">
            Bem-vindo de volta! Aqui estão as últimas atualizações.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Notícias */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-1 xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-50 rounded-lg">
                  <Newspaper size={24} weight="bold" className="text-muted-pink" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-muted-pink">Notícias</h2>
                  <p className="text-sm text-gray-500">Últimas atualizações</p>
                </div>
              </div>
              <Link
                to="/all-news-page"
                className="flex items-center gap-2 text-muted-pink hover:text-pink-800 text-sm font-medium"
              >
                Ver todas <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {news.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 bg-pink-50 text-muted-pink text-xs font-medium rounded-full">
                      {item.category || "Sem categoria"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <Link
                    to="#"
                    className="block text-gray-900 font-medium hover:text-muted-pink transition-colors mb-2"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {item.readTime || "3 min"} leitura
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Receitas */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-50 rounded-lg">
                  <CookingPot size={24} weight="bold" className="text-muted-pink" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-muted-pink">Receitas</h2>
                  <p className="text-sm text-gray-500">Populares esta semana</p>
                </div>
              </div>
              <Link
                to="/all-recipes-page"
                className="flex items-center gap-2 text-muted-pink hover:text-pink-800 text-sm font-medium"
              >
                Ver todas <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <a
                    href="#"
                    className="block text-gray-900 font-medium hover:text-green-600 transition-colors mb-3"
                  >
                    {recipe.title}
                  </a>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {recipe.time || "—"}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        recipe.difficulty === "Fácil"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {recipe.difficulty || "Nível desconhecido"}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {recipe.calories || ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
