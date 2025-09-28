import { Clock, ArrowLeft, User, Flame, Star} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function RecipeDetail() {
  //const { id } = useParams();

  const recipe = {
    id: 1,
    title: "Smoothie energético de frutas vermelhas",
    description: "Comece seu dia com esta explosão de energia e antioxidantes. Perfeito para um café da manhã rápido e nutritivo.",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800",
    time: "10 min",
    difficulty: "Fácil",
    calories: "180 kcal",
    rating: 4.8,
    reviews: 127,
    category: "Café da Manhã",
    author: "Chef Maria Santos",
    
    ingredients: [
      "1 xícara de frutas vermelhas congeladas (morango, framboesa, mirtilo)",
      "1 banana madura",
      "1/2 xícara de iogurte grego natural",
      "1/2 xícara de leite de amêndoas",
      "1 colher de sopa de sementes de chia",
      "1 colher de chá de mel (opcional)",
      "Gelo a gosto"
    ],
    
    instructions: [
      "Lave bem as frutas vermelhas se estiver usando frescas",
      "Descasque a banana e corte em pedaços",
      "Adicione todos os ingredientes no liquidificador",
      "Bata em velocidade alta até obter uma mistura homogênea",
      "Se necessário, adicione mais leite para atingir a consistência desejada",
      "Sirva imediatamente e aproveite!"
    ],
    
    nutrition: {
      calories: 180,
      protein: "8g",
      carbs: "32g",
      fat: "3g",
      fiber: "5g"
    },
    
    tips: [
      "Use frutas congeladas para um smoothie mais cremoso",
      "Adicione uma colher de proteína em pó para mais nutrientes",
      "Para versão vegana, substitua o iogurte grego por iogurte de coco"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/all-recipes-page" className="flex items-center gap-2 text-muted-pink hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} />
              Voltar para receitas
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={20} />
                  <span className="font-medium">{recipe.time}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  recipe.difficulty === "Fácil" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {recipe.difficulty}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Flame size={20} />
                  <span className="font-medium">{recipe.calories}</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <Star size={20} weight="fill" />
                  <span className="font-medium">{recipe.rating} ({recipe.reviews})</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-muted-pink mb-3">{recipe.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center">
                  <User size={20} className="text-muted-pink" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{recipe.author}</p>
                  <p className="text-sm text-gray-600">{recipe.category}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-muted-pink mb-6">Modo de Preparo</h2>
              <div className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-pink-50 text-muted-pink rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-muted-pink mb-4">Ingredientes</h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-muted-pink rounded-full"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-muted-pink mb-4">Informação Nutricional</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calorias</span>
                  <span className="font-semibold">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Proteínas</span>
                  <span className="font-semibold">{recipe.nutrition.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carboidratos</span>
                  <span className="font-semibold">{recipe.nutrition.carbs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gorduras</span>
                  <span className="font-semibold">{recipe.nutrition.fat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fibras</span>
                  <span className="font-semibold">{recipe.nutrition.fiber}</span>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-muted-pink mb-3">💡 Dicas</h3>
              <ul className="space-y-2">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="text-muted-pink text-sm">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}