import {
  Newspaper,
  CookingPot,
  Users,
} from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total de Notícias",
      icon: Newspaper,
      color: "blue",
      link: "/news-management"
    },
    {
      title: "Total de Receitas",
      icon: CookingPot,
      color: "green",
      link: "/recipes-management"
    },
    {
      title: "Clientes Cadastrados",
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
              <p className="text-white text-2xl font-extralight group-hover:text-white transition-colors">{stat.title}</p>
            </div>
          );
        })}
      </div>


   
    </div>
  );
}
