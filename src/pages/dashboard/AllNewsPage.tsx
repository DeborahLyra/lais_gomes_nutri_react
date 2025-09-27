// src/pages/AllNews.tsx

import { ArrowLeft, ClockIcon, FileSearchIcon, Newspaper } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function AllNewsPage() {
  const allNews = [
    {
      id: 1,
      title: "Nova pesquisa mostra benefícios da alimentação balanceada",
      excerpt: "Estudo recente revela como uma dieta equilibrada pode melhorar a qualidade de vida em até 40%",
      date: "15 Mar 2024",
      readTime: "3 min",
      category: "Pesquisa",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400",
      featured: true
    },
    {
      id: 2,
      title: "Guia prático: como planejar refeições da semana",
      excerpt: "Aprenda técnicas simples para organizar sua alimentação semanal e economizar tempo",
      date: "12 Mar 2024",
      readTime: "5 min",
      category: "Dicas",
      image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=400"
    },
    {
      id: 3,
      title: "O impacto do sono na sua saúde nutricional",
      excerpt: "Descubra como as horas de descanso influenciam no seu metabolismo e absorção de nutrientes",
      date: "10 Mar 2024",
      readTime: "4 min",
      category: "Saúde",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400"
    },
    {
      id: 4,
      title: "Superalimentos: mitos e verdades",
      excerpt: "Analisamos os alimentos da moda e seus reais benefícios para a saúde",
      date: "08 Mar 2024",
      readTime: "6 min",
      category: "Análise",
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400"
    },
    {
      id: 5,
      title: "Intolerâncias alimentares: como identificar",
      excerpt: "Guia completo para reconhecer e lidar com restrições alimentares",
      date: "05 Mar 2024",
      readTime: "4 min",
      category: "Saúde",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    },
    {
      id: 6,
      title: "Alimentação saudável no inverno",
      excerpt: "Dicas para manter uma nutrição adequada durante os meses mais frios",
      date: "01 Mar 2024",
      readTime: "3 min",
      category: "Dicas",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400"
    }
  ];

  const categories = ["Todas", "Pesquisa", "Dicas", "Saúde", "Análise"];

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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 whitespace-nowrap bg-white text-muted-pink border border-muted-pink rounded-lg hover:bg-pink-100 transition-colors cursor-pointer"
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
          {allNews.map((news) => (
            <article key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2 py-1 bg-pink-100 text-muted-pink text-xs font-medium rounded-full">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500">{news.date}</span>
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
                    {news.readTime} leitura
                  </div>
                  <Link 
                    to={`/news/${news.id}`}
                    className="text-muted-pink hover:text-pink-800 font-medium"
                  >
                    Ler mais →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}