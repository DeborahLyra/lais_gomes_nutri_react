import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash, User, FileSearchIcon } from "@phosphor-icons/react";
//import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Client } from '../../types/supabase';
// O import clients de '../../types/examples' foi removido
import { ClientModal } from '../../components/admin/ClientModal';

export function ClientsManagement() {
  //const navigate = useNavigate();
  const [clientsList, setClientsList] = useState<Client[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao carregar clientes:", error);
        setError("Falha ao carregar os clientes. Tente recarregar a página.");
        setClientsList([]);
    } else {
        setClientsList(data as Client[]);
        setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
      fetchClients();
  }, []);

 const handleSaveClient = async (
      clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>,
      id?: string
  ) => {
      if (id) {
          const { error } = await supabase
              .from('clients')
              .update(clientData)
              .eq('id', id);

          if (error) {
              console.error("Erro ao atualizar cliente:", error);
              throw new Error("Não foi possível salvar as alterações.");
          }
      } else {
          const { error } = await supabase
              .from('clients')
              .insert(clientData);

          if (error) {
              console.error("Erro ao adicionar cliente:", error);
              throw new Error("Não foi possível criar o novo cliente.");
          }
      }

      await fetchClients();
  };

  const handleDeleteClient = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja deletar o cliente "${name}"? Esta ação é irreversível.`)) {
        return;
    }

    setLoading(true);
    const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Erro ao deletar cliente:", error);
        alert("Falha ao deletar o cliente.");
    } else {
        await fetchClients(); 
    }
    setLoading(false);
  };

  const filteredClients = useMemo(() => {
    let list = clientsList;

    if (filterPlan !== 'all') {
        list = list.filter(client => client.plan === filterPlan);
    }

    if (filterStatus !== 'all') {
        list = list.filter(client => client.status === filterStatus);
    }

    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        list = list.filter(client =>
            client.name.toLowerCase().includes(searchLower) ||
            client.email.toLowerCase().includes(searchLower) ||
            client.phone.includes(searchLower)
        );
    }

    return list;
  }, [clientsList, searchTerm, filterPlan, filterStatus]);


  const getStatusLabel = (status: string) => {
      return status === 'active' ? 'Ativo' : 'Inativo';
  };
  
  const getPlanLabel = (plan: string) => {
      return plan === 'premium' ? 'Premium' : 'Básico';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
  };

  const getPlanColor = (plan: string) => {
    return plan === 'premium' 
      ? 'bg-purple-100 text-purple-700'
      : 'bg-blue-100 text-blue-700';
  };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'N/A';
//     try {
//         return new Date(dateString).toLocaleDateString('pt-BR');
//     } catch (e) {
//         return dateString;
//     }
//   };
  
  let tableContent;

  if (loading && clientsList.length === 0) {
      tableContent = <p className="text-center py-10 text-gray-500">Carregando clientes...</p>;
  } else if (error) {
      tableContent = <p className="text-center py-10 text-red-600 font-medium">{error}</p>;
  } else if (filteredClients.length === 0) {
      tableContent = <p className="text-center py-10 text-gray-500">Nenhum cliente encontrado com os filtros atuais.</p>;
  } else {
      tableContent = (
          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                              E-mail
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Plano
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ações
                          </th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      {filteredClients.map((client) => (
                          <tr key={client.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                                          <User size={20} className="text-dusty-red" />
                                      </div>
                                      <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                          <div className="text-sm text-gray-500 sm:hidden">{client.email}</div> 
                                      </div>
                                  </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                  {client.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlanColor(client.plan)}`}>
                                      {getPlanLabel(client.plan)}
                                  </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(client.status)}`}>
                                      {getStatusLabel(client.status)}
                                  </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex justify-end space-x-2">
                                      <button
                                          onClick={() => {
                                            setEditingClient(client);
                                            setIsModalOpen(true);
                                          }}
                                          title="Editar Cliente"
                                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                                      >
                                          <Pencil size={18} />
                                      </button>
                                      <button
                                          onClick={() => handleDeleteClient(client.id, client.name)}
                                          title="Excluir Cliente"
                                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                                      >
                                          <Trash size={18} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      );
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-b-dusty-red p-2">
        <div>
          <h1 className="text-2xl font-bold text-dusty-red">Gerenciar Clientes</h1>
          <p className="text-gray-600">Total de Clientes: {clientsList.length}</p>
        </div>
        <button 
          onClick={() => {
            setEditingClient(null); 
            setIsModalOpen(true);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-dusty-red text-white rounded-lg hover:bg-muted-pink transition-colors disabled:bg-gray-400 mt-4 sm:mt-0"
        >
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dusty-red p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <FileSearchIcon size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, e-mail ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent"
            />
          </div>
          <select 
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent w-full md:w-auto"
          >
            <option value="all">Todos os planos</option>
            <option value="basic">Básico</option>
            <option value="premium">Premium</option>
          </select>
          <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-dusty-red rounded-lg focus:ring-2 focus:ring-muted-pink focus:border-transparent w-full md:w-auto"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        {tableContent}
      </div>
      
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => {
            setIsModalOpen(false);
            setEditingClient(null); 
        }}
        onSave={handleSaveClient}
        initialData={editingClient}
      />
    </div>
  );
}
