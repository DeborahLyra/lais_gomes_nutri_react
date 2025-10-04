import { useState } from 'react';
import { Plus,Pencil, Trash, Eye, User, Envelope, Phone, FileSearchIcon } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import type { Client } from '../../types/supabase';
import { clients } from '../../types/examples';
import { ClientModal } from '../../components/admin/ClientModal';

export function ClientsManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const getStatusColor = (status: string) => {
    return status === 'Ativo' 
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
  };

  const getPlanColor = (plan: string) => {
    return plan === 'Premium' 
      ? 'bg-purple-100 text-purple-700'
      : 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-b-dusty-red p-2">
        <div>
          <h1 className="text-2xl font-bold text-dusty-red">Gerenciar Clientes</h1>
        </div>
        <button 
          onClick={() => {
            setSelectedClient(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors"
        >
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dusty-red p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FileSearchIcon size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent">
            <option>Todos os planos</option>
            <option>Básico</option>
            <option>Premium</option>
          </select>
          <select className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent">
            <option>Todos os status</option>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-sm border border-dusty-red p-6 hover:shadow-md transition-shadow cursor-pointer">
        
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-dusty-red" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(client.plan)}`}>
                    {client.plan}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Envelope size={16} />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} />
                <span>{client.phone}</span>
              </div>
              <div className="text-xs text-gray-500">
                Cliente desde: {client.created_at}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                <Eye size={16} />
                Ver
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedClient(client);
                  setIsModalOpen(true);
                }}
              >
                <Pencil size={16} />
                Editar
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                <Trash size={16} />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => console.log("Salvar cliente:", data)}
        initialData={selectedClient}
      />
    </div>
  );
}