import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "@phosphor-icons/react";
import type { News } from "../../types/supabase";
import { supabase } from "../../lib/supabase";

export function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setError("Não foi possível carregar a notícia.");
      } else {
        setNews(data);
      }
      setLoading(false);
    }

    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center py-10">Carregando notícia...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
  if (!news) return <p className="text-center py-10">Notícia não encontrada.</p>;

  const readTime = Math.max(1, Math.round((news.content?.split(" ").length || 0) / 200));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className=" shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/all-news-page"
              className="flex items-center gap-2 text-muted-pink hover:text-pink-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Voltar para notícias
            </Link>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-pink-100 text-muted-pink text-sm font-medium rounded-full">
              {news.category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={16} />
              {new Date(news.created_at).toLocaleDateString("pt-BR")}
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock size={16} />
              {readTime} min de leitura
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={news.image_url || "/placeholder-news.jpg"}
            alt={news.title}
            className="w-full h-64 lg:h-96 object-cover"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </article>
    </div>
  );
}
