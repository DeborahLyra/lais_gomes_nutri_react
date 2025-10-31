import { ArrowLeft, ClockIcon, FileSearchIcon, Newspaper } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import type { News } from "../../types/supabase";
import { supabase } from "../../lib/supabase";


export function AllNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>(['Todas']);
    newsList.forEach(news => uniqueCategories.add(news.category));
    return Array.from(uniqueCategories);
  }, [newsList]); 

  
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('news')
        .select('*') 
        .eq('status', 'published') 
        .order('created_at', { ascending: false }); 

      if (error) {
        console.error("Erro ao buscar notícias:", error);
        setError("Não foi possível carregar as notícias. Tente novamente.");
        setLoading(false);
        return;
      }

      setNewsList(data as News[]);
      setLoading(false);
    }

    fetchNews();
  }, []); 

  const filteredNews = newsList.filter(news => {
    const categoryMatch = activeCategory === 'Todas' || news.category === activeCategory;
    
    const searchMatch = 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  let content;
  if (loading) {
    content = <p className="text-center text-xl text-slate-500 col-span-full">Carregando notícias...</p>;
  } else if (error) {
    content = <p className="text-center text-xl text-red-600 col-span-full">{error}</p>;
  } else if (filteredNews.length === 0) {
    content = <p className="text-center text-xl text-slate-500 col-span-full">Nenhuma notícia encontrada.</p>;
  } else {
    content = filteredNews.map((news) => (
      <article 
        key={news.id} 
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="aspect-video overflow-hidden">
          <img 
            src={news.image_url} // Use image_url da sua interface
            alt={news.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="inline-block px-2 py-1 bg-pink-100 text-muted-pink text-xs font-medium rounded-full">
              {news.category}
            </span>
            {/* Você pode formatar a data 'created_at' aqui */}
            <span className="text-xs text-gray-500">
              {new Date(news.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <h3 className="font-semibold text-slate-700 mb-2 line-clamp-2">
            <Link to={`/news/${news.id}`} className="hover:text-muted-pink transition-colors">
              {news.title}
            </Link>
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{news.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <ClockIcon size={12} />
              ~{(news.content.split(' ').length / 200).toFixed(0) || 1} min leitura
            </div>
            <Link to={`/news-detail/${news.id}`} className="text-muted-pink hover:text-pink-800 font-medium">
              Ler mais →
            </Link>
          </div>
        </div>
      </article>
    ));
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-muted-pink" />
            </Link>
            <div className="flex items-center gap-3">
              <Newspaper size={32} weight="bold" className="text-muted-pink" />
              <div>
                <h1 className="text-2xl font-bold text-muted-pink">Todas as Notícias</h1>
                <p className="text-slate-700">Fique por dentro das últimas novidades</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FileSearchIcon size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg transition-colors cursor-pointer ${
                    activeCategory === category
                      ? 'bg-muted-pink text-white border-muted-pink'
                      : 'bg-white text-muted-pink border border-muted-pink hover:bg-pink-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content}
        </div>
      </main>
    </div>
  );
}