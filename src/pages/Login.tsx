import logo from '../assets/profile/logoLais.png'
import { useState } from 'react';
import { Eye, EyeSlash, User, Lock } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (signInError) {
      console.error('Erro de login:', signInError);
      if (signInError.message.includes('Invalid login credentials')) {
        setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      }
      return;
    }

    navigate('/admim-dashboard', { replace: true });

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-xl">
              <img src={logo} className='h-24'/>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Acessar Sistema
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange} 
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange} 
                  placeholder="Sua senha"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading} 
              className={`w-full text-white py-3 rounded-lg font-semibold transition-colors focus:ring-2 focus:ring-offset-2 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary hover:bg-light-green cursor-pointer'
              }`}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className='font-light text-primary cursor-pointer mt-8 text-center text-underline-offset-auto hover:text-light-green'>Esqueceu a senha?</p>
        </div>
      </div>
    </div>
  );
}