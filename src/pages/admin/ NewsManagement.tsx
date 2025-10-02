import { useState } from 'react';
import { Plus, Pencil, Trash, Eye, FileSearchIcon } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

export function NewsManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const news = [
    {
      id: 1,
      title: "Nova pesquisa mostra benefícios da alimentação balanceada",
      category: "Pesquisa",
      status: "Publicado",
      date: "15 Mar 2024",
      views: 1247
    },
    {
      id: 2,
      title: "Guia prático: como planejar refeições da semana",
      category: "Dicas",
      status: "Publicado",
      date: "12 Mar 2024",
      views: 892
    },
    {
      id: 3,
      title: "O impacto do sono na sua saúde nutricional",
      category: "Saúde",
      status: "Rascunho",
      date: "10 Mar 2024",
      views: 0
    }
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-b-dusty-red p-2">
        <div>
          <h1 className="text-2xl font-bold text-dusty-red">Gerenciar Notícias</h1>
        </div>
        <button 
          onClick={() => navigate('/admin/news/new')}
          className="flex items-center gap-2 px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors"
        >
          <Plus size={20} />
          Nova Notícia
        </button>
      </div>

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
          <select className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Todas as categorias</option>
            <option>Pesquisa</option>
            <option>Dicas</option>
            <option>Saúde</option>
          </select>
          <select className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Todos os status</option>
            <option>Publicado</option>
            <option>Rascunho</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dusty-red overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dusty-red border-b border-dusty-red">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-dusty-red0 uppercase tracking-wider">
                  Notícia
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-dusty-red0 uppercase tracking-wider">
                  Categoria
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-bold text-dusty-red0 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-dusty-red0 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-red-100 text-dusty-red text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-dusty-red0">
                    {item.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}