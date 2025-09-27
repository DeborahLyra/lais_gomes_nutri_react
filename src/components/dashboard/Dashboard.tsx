import { CookingPot, Newspaper, ArrowRight, Clock, } from "@phosphor-icons/react";
import { NavabarDashboard } from "./NavabarDashboard";
import { Link } from "react-router-dom";
//import { ArrowArcRightIcon } from "@phosphor-icons/react/dist/ssr";

export function Dashboard() {
  const news = [
    {
      title: "Nova pesquisa mostra benefícios da alimentação balanceada",
      date: "15 Mar 2024",
      readTime: "3 min",
      category: "Pesquisa"
    },
    {
      title: "Guia prático: como planejar refeições da semana",
      date: "12 Mar 2024",
      readTime: "5 min",
      category: "Dicas"
    },
    {
      title: "O impacto do sono na sua saúde nutricional",
      date: "10 Mar 2024",
      readTime: "4 min",
      category: "Saúde"
    }
  ];

  const recipes = [
    {
      title: "Smoothie energético de frutas vermelhas",
      time: "10 min",
      difficulty: "Fácil",
      calories: "180 kcal"
    },
    {
      title: "Bowl nutritivo com quinoa e legumes",
      time: "25 min",
      difficulty: "Médio",
      calories: "320 kcal"
    },
    {
      title: "Muffin integral de banana e aveia",
      time: "35 min",
      difficulty: "Fácil",
      calories: "210 kcal"
    }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <NavabarDashboard />
      
      <main className="mt-24 flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-muted-pink">Dashboard</h1>
          <p className="text-slate-700 mt-2">Bem-vindo de volta! Aqui estão as últimas atualizações.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* noticias */}
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
              <Link to="/all-news-page" className="flex items-center gap-2 text-muted-pink hover:text-pink-800 text-sm font-medium">
                Ver todas <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {news.map((item, index) => (
                <div key={index} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 bg-pink-50 text-muted-pink text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <Link to="#" className="block text-gray-900 font-medium hover:text-muted-pink transition-colors mb-2">
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {item.readTime} leitura
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* receitas */}
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
              <button className="flex items-center gap-2 text-muted-pink hover:text-pink-800 text-sm font-medium">
                Ver todas <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {recipes.map((recipe, index) => (
                <div key={index} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                  <a href="#" className="block text-gray-900 font-medium hover:text-green-600 transition-colors mb-3">
                    {recipe.title}
                  </a>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {recipe.time}
                    </div>
                    <span className={`px-2 py-1 rounded-full ${
                      recipe.difficulty === "Fácil" 
                        ? "bg-primary text-green-100" 
                        : "bg-pale-peach text-yellow-800"
                    }`}>
                      {recipe.difficulty}
                    </span>
                    <span className="text-gray-900 font-medium">{recipe.calories}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* STATS CARD (Nova seção)
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <ArrowArcRightIcon size={24} weight="bold" />
              <h2 className="text-xl font-semibold">Seu Progresso</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-blue-200 text-sm">Refeições esta semana</p>
                <p className="text-2xl font-bold">12/21</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Meta de água</p>
                <p className="text-2xl font-bold">75%</p>
              </div>
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors mt-4">
                Ver detalhes
              </button>
            </div>
          </section> */}

          {/* CALENDÁRIO (Nova seção) */}
          {/* <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Calendar size={24} weight="bold" className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Agenda</h2>
                <p className="text-sm text-gray-500">Próximos compromissos</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="text-purple-600 text-sm font-medium">18</div>
                <div>
                  <p className="font-medium text-gray-900">Consulta nutricional</p>
                  <p className="text-xs text-gray-600">10:00 - 11:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600 text-sm font-medium">20</div>
                <div>
                  <p className="font-medium text-gray-900">Avaliação física</p>
                  <p className="text-xs text-gray-600">14:00 - 15:00</p>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
}