import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash, Eye, FileSearchIcon } from "@phosphor-icons/react";
//import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Recipe } from '../../types/supabase';
// O import recipes de '../../types/examples' foi removido
import { RecipeModal } from '../../components/admin/RecipeModal';
import { RecipeViewModal } from '../../components/admin/RecipeViewModal';

export function RecipesManagement() {
    //const navigate = useNavigate();
    const [recipesList, setRecipesList] = useState<Recipe[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('Todas');
    const [filterDifficulty, setFilterDifficulty] = useState('Todas');
    const [filterStatus, setFilterStatus] = useState('Todos');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isRecipeViewOpen, setIsRecipeViewOpen] = useState(false);
 

    const fetchRecipes = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Erro ao carregar receitas:", error);
            setError("Falha ao carregar as receitas. Tente recarregar a página.");
            setRecipesList([]);
        } else {
            setRecipesList(data as Recipe[]);
            setError(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleSaveRecipe = async (
        recipeData: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>,
        id?: string
    ) => {
        if (id) {
            const { error } = await supabase
                .from('recipes')
                .update(recipeData)
                .eq('id', id);

            if (error) {
                console.error("Erro ao atualizar receita:", error);
                throw new Error("Não foi possível salvar as alterações.");
            }
        } else {
            const { error } = await supabase
                .from('recipes')
                .insert(recipeData);

            if (error) {
                console.error("Erro ao adicionar receita:", error);
                throw new Error("Não foi possível criar a nova receita.");
            }
        }

        await fetchRecipes();
    };

    const handleDeleteRecipe = async (id: string, title: string) => {
        if (!window.confirm(`Tem certeza que deseja deletar a receita "${title}"? Esta ação é irreversível.`)) {
            return;
        }

        setLoading(true);
        const { error } = await supabase
            .from('recipes')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Erro ao deletar receita:", error);
            alert("Falha ao deletar a receita.");
        } else {
            await fetchRecipes();
        }
        setLoading(false);
    };

    const filteredRecipes = useMemo(() => {
        let list = recipesList;

        if (filterCategory !== 'Todas') {
            list = list.filter(recipe => recipe.category === filterCategory);
        }

        if (filterDifficulty !== 'Todas') {
             const difficultyMap: { [key: string]: string } = { 'Fácil': 'easy', 'Médio': 'medium', 'Difícil': 'hard' };
             const difficultyFilter = difficultyMap[filterDifficulty];

             if (difficultyFilter) {
                 list = list.filter(recipe => recipe.difficulty === difficultyFilter);
             }
        }
        
        if (filterStatus !== 'Todos') {
             list = list.filter(recipe => recipe.status === filterStatus.toLowerCase());
        }

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            list = list.filter(recipe =>
                recipe.title.toLowerCase().includes(searchLower) ||
                recipe.description.toLowerCase().includes(searchLower)
            );
        }

        return list;
    }, [recipesList, searchTerm, filterCategory, filterDifficulty, filterStatus]);
    
    const categories = useMemo(() => {
        const unique = new Set<string>();
        recipesList.forEach(recipe => unique.add(recipe.category));
        return ['Todas', ...Array.from(unique)];
    }, [recipesList]);

    const getDifficultyColor = (difficulty: string) => {
        const difficultyMap: { [key: string]: string } = {
            'easy': 'bg-green-100 text-green-700',
            'medium': 'bg-yellow-100 text-yellow-700',
            'hard': 'bg-red-100 text-red-700',
        };
        return difficultyMap[difficulty] || 'bg-gray-100 text-gray-700';
    };
    
    const getDifficultyLabel = (difficulty: string) => {
         const labelMap: { [key: string]: string } = {
            'easy': 'Fácil',
            'medium': 'Médio',
            'hard': 'Difícil',
        };
        return labelMap[difficulty] || 'N/A';
    }

    let gridContent;
    
    if (loading && recipesList.length === 0) {
        gridContent = <div className="col-span-full text-center py-10 text-gray-500">Carregando receitas...</div>;
    } else if (error) {
        gridContent = <div className="col-span-full text-center py-10 text-red-600 font-medium">{error}</div>;
    } else if (filteredRecipes.length === 0) {
        gridContent = <div className="col-span-full text-center py-10 text-gray-500">Nenhuma receita encontrada com os filtros atuais.</div>;
    } else {
        gridContent = filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                    <img 
                        src={recipe.image_url || 'https://placehold.co/600x400/CCCCCC/333333?text=Sem+Imagem'} 
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Sem+Imagem'; }}
                        alt={`Imagem da receita ${recipe.title}`}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-opacity-30 p-2 rounded-lg backdrop-blur-[1px]">
                        <h3 className="text-white font-semibold text-lg line-clamp-2">
                            {recipe.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
                                {getDifficultyLabel(recipe.difficulty)}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                recipe.status === 'published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                                {recipe.status === 'published' ? 'Publicado' : 'Rascunho'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-dusty-red font-medium">{recipe.category}</span>
                        <span className="text-sm font-medium text-gray-900">{recipe.calories}</span>
                    </div>

                    <p className="text-xs text-slate-700 line-clamp-2 mb-4">{recipe.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                        <span>Preparo: {recipe.preparation_time}</span>
                        <span>{new Date(recipe.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => {
                                setSelectedRecipe(recipe);
                                setIsRecipeViewOpen(true);
                            }}
                            className="flex-1 flex items-center justify-center gap-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer text-sm"
                        >
                            <Eye size={16} />
                            Visualizar
                        </button>
                        <button
                            onClick={() => {
                                setEditingRecipe(recipe);
                                setIsModalOpen(true);
                            }}
                            className="flex-1 flex items-center justify-center gap-1 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer text-sm"
                        >
                            <Pencil size={16} />
                            Editar
                        </button>

                        <button 
                            onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                            className="flex-1 flex items-center justify-center gap-1 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-sm"
                        >
                            <Trash size={16} />
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className="space-y-6 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-b-dusty-red p-2">
                <div>
                    <h1 className="text-2xl font-bold text-dusty-red">Gerenciar Receitas</h1>
                    <p className="text-gray-600">Total de Receitas: {recipesList.length}</p>
                </div>
                <button
                    onClick={() => {
                        setEditingRecipe(null);
                        setIsModalOpen(true);
                    }}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors disabled:bg-gray-400 mt-4 sm:mt-0"
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
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select 
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
                    >
                        <option value="Todas">Todas as dificuldades</option>
                        <option value="Fácil">Fácil</option>
                        <option value="Médio">Médio</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
                    >
                        <option value="Todos">Todos os status</option>
                        <option value="Published">Publicado</option>
                        <option value="Draft">Rascunho</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridContent}
            </div>

            <RecipeModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingRecipe(null); // Limpa o estado de edição
                }}
                initialData={editingRecipe}
                onSave={handleSaveRecipe}
            />
            <RecipeViewModal
                isOpen={isRecipeViewOpen}
                onClose={() => setIsRecipeViewOpen(false)}
                recipe={selectedRecipe}
            />

        </div>
    );
}
