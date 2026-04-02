import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Salva o TOKEN seguro gerado pelo backend
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setErro('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950">
      <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-serif text-[#D4AF37] mb-6 text-center">Acesso Restrito</h2>
        
        {erro && (
          <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-2 rounded mb-4 text-sm text-center">
            {erro}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-zinc-400 text-sm mb-2 uppercase tracking-widest">Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-3 bg-zinc-950 border border-zinc-800 rounded text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            placeholder="Digite seu usuário"
            required
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-zinc-400 text-sm mb-2 uppercase tracking-widest">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-3 bg-zinc-950 border border-zinc-800 rounded text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            placeholder="Digite sua senha"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-[#D4AF37] text-zinc-950 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;