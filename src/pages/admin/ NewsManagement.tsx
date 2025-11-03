import { useEffect, useState, useMemo } from 'react';
import { Plus, Pencil, Trash, Eye, FileSearchIcon } from "@phosphor-icons/react";
//import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { News } from '../../types/supabase';
import { NewsModal } from '../../components/admin/NewsModal';
import { NewsViewModal } from '../../components/admin/NewsViewModal';


export function NewsManagement() {
  //const navigate = useNavigate();
  const [newsList, setNewsList] = useState<News[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isNewsViewOpen, setIsNewsViewOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  
  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Erro ao carregar notícias:", error);
      setError("Falha ao carregar as notícias. Tente recarregar a página.");
      setNewsList([]);
    } else {
      setNewsList(data as News[]);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  

  const handleSaveNews = async (
    newsData: Omit<News, 'id' | 'created_at' | 'updated_at'>,
    id?: string 
  ) => {
    if (id) {
      const { error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id);

      if (error) {
        console.error("Erro ao atualizar notícia:", error);
        throw new Error("Não foi possível salvar as alterações.");
      }
    } else {
      const { error } = await supabase
        .from('news')
        .insert(newsData);

      if (error) {
        console.error("Erro ao adicionar notícia:", error);
        throw new Error("Não foi possível criar a nova notícia.");
      }
    }
    
    await fetchNews(); 
  };
  
  const handleDeleteNews = async (id: string, title: string) => {
    if (!window.confirm(`Tem certeza que deseja deletar a notícia "${title}"? Esta ação é irreversível.`)) {
      return;
    }
    
    setLoading(true);
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id); 

    if (error) {
      console.error("Erro ao deletar notícia:", error);
      alert("Falha ao deletar a notícia.");
    } else {
      await fetchNews(); 
    }
    setLoading(false);
  };

  const filteredNews = useMemo(() => {
    let list = newsList;

    if (filterCategory !== 'Todas') {
      list = list.filter(news => news.category === filterCategory);
    }
    
    if (filterStatus !== 'Todos') {
      list = list.filter(news => news.status === filterStatus.toLowerCase()); 
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      list = list.filter(news => 
        news.title.toLowerCase().includes(searchLower) ||
        news.excerpt.toLowerCase().includes(searchLower)
      );
    }

    return list;
  }, [newsList, searchTerm, filterCategory, filterStatus]);
  
  const categories = useMemo(() => {
    const unique = new Set<string>();
    newsList.forEach(news => unique.add(news.category));
    return ['Todas', ...Array.from(unique)];
  }, [newsList]);
  
  const handleEditClick = (item: News) => {
    setEditingNews(item);
    setIsModalOpen(true);
  };
  
  const handleViewClick = (item: News) => {
    setSelectedNews(item);
    setIsNewsViewOpen(true);
  };

  let tableContent;
  if (loading && newsList.length === 0) {
    tableContent = (
      <tr><td colSpan={4} className="text-center py-8 text-gray-500">Carregando notícias...</td></tr>
    );
  } else if (error) {
     tableContent = (
      <tr><td colSpan={4} className="text-center py-8 text-red-600 font-medium">{error}</td></tr>
    );
  } else if (filteredNews.length === 0) {
    tableContent = (
      <tr><td colSpan={4} className="text-center py-8 text-gray-500">Nenhuma notícia encontrada com os filtros atuais.</td></tr>
    );
  } else {
    tableContent = filteredNews.map((item) => (
      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <div>
            <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="inline-block px-2 py-1 bg-red-100 text-dusty-red text-xs font-medium rounded-full">
            {item.category}
          </span>
        </td>
        <td className="px-6 py-4 text-gray-600 text-sm">
          {new Date(item.created_at).toLocaleDateString('pt-BR')}
          <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
              item.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {item.status === 'published' ? 'Publicado' : 'Rascunho'}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewClick(item)}
              className="flex items-center justify-center gap-1 py-2 px-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              <Eye size={16} />
              Visualizar
            </button>
            <button
              onClick={() => handleEditClick(item)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
            >
              <Pencil size={16} />
            </button>
            <button 
              onClick={()=>handleDeleteNews(item.id, item.title)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <Trash size={16} />
            </button>
          </div>
        </td>
      </tr>
    ));
  }


  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-b-dusty-red p-2">
        <div>
          <h1 className="text-2xl font-bold text-dusty-red">Gerenciar Notícias</h1>
          <p className="text-gray-600">Total de Notícias Carregadas: {newsList.length}</p>
        </div>
        <button
          onClick={() => {
            setEditingNews(null);
            setIsModalOpen(true);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors disabled:bg-gray-400 mt-4 sm:mt-0"
        >
          <Plus size={20} />
          Nova Notícia
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-dusty-red p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FileSearchIcon size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Todos">Todos os status</option>
            <option value="Published">Publicado</option>
            <option value="Draft">Rascunho</option>
          </select>
        </div>
      </div>

      {/* Tabela de Notícias */}
      <div className="bg-white rounded-xl shadow-sm border border-dusty-red overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-dusty-red text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Notícia
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Categoria
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Status e Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableContent}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modais */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNews(null); 
        }}
        initialData={editingNews}
        onSave={handleSaveNews}
      />
      <NewsViewModal
        isOpen={isNewsViewOpen}
        onClose={() => setIsNewsViewOpen(false)}
        news={selectedNews}
      />
    </div>
  );
}
