import { ArrowLeft, Clock, CookingPot, FileSearchIcon, Flame, Star } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function AllRecipesPage() {
  const allRecipes = [
    {
      id: 1,
      title: "Smoothie energético de frutas vermelhas",
      description: "Perfeito para começar o dia com energia e antioxidantes",
      time: "10 min",
      difficulty: "Fácil",
      calories: "180 kcal",
      rating: 4.8,
      category: "Café da Manhã",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
      featured: true
    },
    {
      id: 2,
      title: "Bowl nutritivo com quinoa e legumes",
      description: "Refeição completa e balanceada para o almoço",
      time: "25 min",
      difficulty: "Médio",
      calories: "320 kcal",
      rating: 4.6,
      category: "Almoço",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
    },
    {
      id: 3,
      title: "Muffin integral de banana e aveia",
      description: "Lanche saudável e sem açúcar refinado",
      time: "35 min",
      difficulty: "Fácil",
      calories: "210 kcal",
      rating: 4.9,
      category: "Lanche",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400"
    },
    {
      id: 4,
      title: "Salmão grelhado com aspargos",
      description: "Jantar sofisticado e rico em ômega-3",
      time: "20 min",
      difficulty: "Médio",
      calories: "280 kcal",
      rating: 4.7,
      category: "Jantar",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400"
    },
    {
      id: 5,
      title: "Pasta de grão-de-bico com vegetais",
      description: "Opção vegetariana proteica e saborosa",
      time: "15 min",
      difficulty: "Fácil",
      calories: "190 kcal",
      rating: 4.5,
      category: "Jantar",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
    },
    {
      id: 6,
      title: "Pudim de chia com frutas",
      description: "Sobremesa leve e nutritiva para qualquer hora",
      time: "5 min + gelar",
      difficulty: "Fácil",
      calories: "150 kcal",
      rating: 4.8,
      category: "Sobremesa",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400"
    }
  ];

  const categories = ["Todas", "Café da Manhã", "Almoço", "Jantar", "Lanche", "Sobremesa"];
  const difficulties = ["Todas", "Fácil", "Médio", "Difícil"];

  return (
    <div className="min-h-screen bg-gray-50">
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

          <div className="space-y-4">
            <div className="relative">
              <FileSearchIcon size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar receitas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 whitespace-nowrap bg-white border text-muted-pink border-muted-pink rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    className="px-4 py-2 whitespace-nowrap bg-muted-pink border text-white border-muted-pink rounded-lg hover:bg-pink-800 transition-colors cursor-pointer"
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                {recipe.featured && (
                  <div className="absolute top-3 left-3 bg-muted-pink text-white px-2 py-1 rounded-full text-xs font-medium">
                    Destaque
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-2 py-1 bg-pink-50 text-muted-pink text-xs font-medium rounded-full">
                    {recipe.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star size={14} weight="fill" />
                    <span className="text-xs font-medium">{recipe.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link to={`/recipes/${recipe.id}`} className="hover:text-muted-pink transition-colors">
                    {recipe.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {recipe.time}
                    </div>
                    <span className={`px-2 py-1 rounded-full ${
                      recipe.difficulty === "Fácil" 
                        ? "bg-green-100 text-green-700" 
                        : recipe.difficulty === "Médio"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-900 font-medium">
                    <Flame size={12} />
                    {recipe.calories}
                  </div>
                </div>
                
                <Link 
                  to={`/recipes/${recipe.id}`}
                  className="block w-full text-center py-2 bg-muted-pink text-white rounded-lg hover:bg-pink-800 transition-colors text-sm font-medium"
                >
                  Ver Receita
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}