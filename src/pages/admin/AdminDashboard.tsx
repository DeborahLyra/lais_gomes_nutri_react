import {
  Newspaper,
  CookingPot,
  Users,
  Plus,
  TrendUpIcon
} from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total de Notícias",
      value: "24",
      icon: Newspaper,
      color: "blue",
      link: "/news-management"
    },
    {
      title: "Total de Receitas",
      value: "48",
      icon: CookingPot,
      color: "green",
      link: "/recipes-management"
    },
    {
      title: "Clientes Cadastrados",
      value: "156",
      icon: Users,
      color: "purple",
      link: "/clients-management"
    },
  ];


  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-b-dusty-red p-2">
        <div>
          <h1 className="text-2xl font-bold text-dusty-red">Meu Dashboard</h1>
          <p className="text-slate-700">Visão geral do sistema</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors">
            <Plus size={20} />
            Nova Publicação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              onClick={() => navigate(stat.link)}
              className="group bg-dusty-red rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow hover:bg-muted-pink"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon size={24} weight="bold" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                {stat.value}
              </h3>
              <p className="text-white group-hover:text-white transition-colors">{stat.title}</p>
            </div>
          );
        })}
      </div>



      <div className="bg-white rounded-xl shadow-sm border border-dusty-red p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/admin/news/new')}
            className="group p-4 border-2 border-dashed border-dusty-red rounded-lg hover:border-muted-pink hover:bg-muted-pink transition-colors text-center"
          >
            <Newspaper size={32} className="text-dusty-red mx-auto mb-2 group-hover:text-white" />
            <p className="font-medium text-gray-700 group-hover:text-white">Nova Notícia</p>
          </button>

          <button
            onClick={() => navigate('/admin/recipes/new')}
            className="group p-4 border-2 border-dashed border-dusty-red rounded-lg hover:border-muted-pink hover:bg-muted-pink transition-colors text-center"
          >
            <CookingPot size={32} className="text-dusty-red mx-auto mb-2 group-hover:text-white" />
            <p className="font-medium text-gray-700 group-hover:text-white">Nova Receita</p>
          </button>

          <button
            onClick={() => navigate('/admin/clients/new')}
            className="group p-4 border-2 border-dashed border-dusty-red rounded-lg hover:border-muted-pink hover:bg-muted-pink transition-colors text-center"
          >
            <Users size={32} className="text-dusty-red mx-auto mb-2 group-hover:text-white" />
            <p className="font-medium text-gray-700 group-hover:text-white">Novo Cliente</p>
          </button>

          <button className="group p-4 border-2 border-dashed border-dusty-red rounded-lg hover:border-muted-pink hover:bg-muted-pink transition-colors text-center">
            <TrendUpIcon size={32} className="text-dusty-red mx-auto mb-2 group-hover:text-white" />
            <p className="font-medium text-gray-700 group-hover:text-white">Relatórios</p>
          </button>
        </div>
      </div>

    </div>
  );
}
