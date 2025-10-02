import { useState } from 'react';
import { Plus, Pencil, Trash, Eye, Star, FileSearchIcon } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

export function RecipesManagement() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const recipes = [
        {
            id: 1,
            title: "Smoothie energético de frutas vermelhas",
            category: "Café da Manhã",
            difficulty: "Fácil",
            time: "10 min",
            status: "Publicado",
            calories: "180 kcal",
            image: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        },
        {
            id: 2,
            title: "Bowl nutritivo com quinoa e legumes",
            category: "Almoço",
            difficulty: "Médio",
            time: "25 min",
            status: "Publicado",
            calories: "320 kcal",
            image: "https://images.unsplash.com/photo-1602881917445-0b1ba001addf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        },
        {
            id: 3,
            title: "Muffin integral de banana e aveia",
            category: "Lanche",
            difficulty: "Fácil",
            time: "35 min",
            status: "Rascunho",
            calories: "210 kcal",
            image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        }
    ];
    
    const getDifficultyColor = (difficulty: string) => {
        return difficulty === 'Fácil'
            ? 'bg-green-100 text-green-700'
            : difficulty === 'Médio'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700';
    };

    return (
        <div className="space-y-6 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-b-dusty-red p-2">
                <div>
                    <h1 className="text-2xl font-bold text-dusty-red">Gerenciar Receitas</h1>
                </div>
                <button
                    onClick={() => navigate('/admin/recipes/new')}
                    className="flex items-center gap-2 px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors"
                >
                    <Plus size={20} />
                    Nova Receita
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-dusty-red p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FileSearchIcon size={20} className="absolute left-3 top-3 text-slate-700" />
                        <input
                            type="text"
                            placeholder="Buscar receitas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
                        />
                    </div>
                    <select className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent">
                        <option>Todas as categorias</option>
                        <option>Café da Manhã</option>
                        <option>Almoço</option>
                        <option>Jantar</option>
                        <option>Lanche</option>
                    </select>
                    <select className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent">
                        <option>Todas as dificuldades</option>
                        <option>Fácil</option>
                        <option>Médio</option>
                        <option>Difícil</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-xl shadow-sm border border-dusty-red overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-video bg-gray-200 relative">
                            <img src={recipe.image} className="absolute inset-0 h-64 w-full"/>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 shadow-2xs">
                                    {recipe.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
                                        {recipe.difficulty}
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-slate-700">{recipe.category}</span>
                                <span className="text-sm font-medium text-gray-900">{recipe.calories}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-slate-700 mb-4">
                                <span>{recipe.time}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                                    <Eye size={16} />
                                    Visualizar
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                                    <Pencil size={16} />
                                    Editar
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                    <Trash size={16} />
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}