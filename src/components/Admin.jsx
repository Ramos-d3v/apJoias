import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { LogOut, PlusCircle, PackagePlus, Edit2, Trash2, X, Wand2, Loader2, AlertCircle } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  
  // Estado do formulário
  const [editingId, setEditingId] = useState(null);
  const [product, setProduct] = useState({
    nome: "",
    categoria: "Pulseira",
    quantidade: 1,
    imagemUrl: ""
  });
  
  const [imagemFile, setImagemFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessingImg, setIsProcessingImg] = useState(false);
  
  // NOVO: Estado para o limite da API
  const [apiUsage, setApiUsage] = useState({ used: 0, limit: 25 });

  const categorias = ["Pulseira", "Pingentes", "Escapularios", "Correntes", "Brincos", "Anéis"];

  // NOVO: Busca o uso atual da API assim que a página carrega
  useEffect(() => {
    const fetchApiUsage = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        
        const res = await fetch(`${apiUrl}/remove-bg/usage`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setApiUsage(data);
        }
      } catch (err) {
        console.error("Erro ao buscar uso da API", err);
      }
    };
    
    fetchApiUsage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagemFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveBackground = async () => {
    if (!imagemFile) return alert('Por favor, selecione uma imagem primeiro.');
    if (apiUsage.used >= apiUsage.limit) return alert('Você atingiu o limite máximo de remoções de fundo.');

    setIsProcessingImg(true);
    const formData = new FormData();
    formData.append('image_file', imagemFile);

    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

      const response = await fetch(`${apiUrl}/remove-bg`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Falha ao processar a imagem no servidor.');
      }

      // Atualiza o contador de uso da API visualmente
      setApiUsage(prev => ({ ...prev, used: prev.used + 1 }));

      const blob = await response.blob();
      const removedBgUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.src = removedBgUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const targetSize = 1080;
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, targetSize, targetSize);
        
        const maxDimension = targetSize * 0.8;
        const imgAspectRatio = img.width / img.height;
        let newWidth, newHeight;
        
        if (imgAspectRatio > 1) {
          newWidth = maxDimension;
          newHeight = maxDimension / imgAspectRatio;
        } else {
          newHeight = maxDimension;
          newWidth = maxDimension * imgAspectRatio;
        }
        
        const x = (targetSize - newWidth) / 2;
        const y = (targetSize - newHeight) / 2;
        ctx.drawImage(img, x, y, newWidth, newHeight);

        canvas.toBlob((processedBlob) => {
          const processedFile = new File([processedBlob], "joia_padronizada.jpg", { type: "image/jpeg" });
          setImagemFile(processedFile);
          setImagePreview(URL.createObjectURL(processedBlob));
          setIsProcessingImg(false);
        }, 'image/jpeg', 0.95);
      };

    } catch (err) {
      alert(err.message);
      setIsProcessingImg(false);
    }
  };

  const handleEdit = (prod) => {
    setEditingId(prod.id);
    setProduct({
      nome: prod.nome,
      categoria: prod.categoria,
      quantidade: prod.quantidade,
      imagemUrl: prod.imagem 
    });
    setImagemFile(null);
    setImagePreview(prod.imagem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProduct({ nome: "", categoria: "Pulseira", quantidade: 1, imagemUrl: "" });
    setImagemFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("nome", product.nome);
    formData.append("categoria", product.categoria);
    formData.append("quantidade", product.quantidade);
    
    if (imagemFile) {
      formData.append("imagemFile", imagemFile);
    } else if (product.imagemUrl) {
      formData.append("imagemUrl", product.imagemUrl);
    }

    if (editingId) {
      await updateProduct(editingId, formData);
      alert("Produto atualizado com sucesso!");
    } else {
      await addProduct(formData);
      alert("Produto cadastrado com sucesso!");
    }
    cancelEdit();
  };

  // Calcula a porcentagem para a barra de progresso
  const usagePercentage = Math.min((apiUsage.used / apiUsage.limit) * 100, 100);
  const isLimitReached = apiUsage.used >= apiUsage.limit;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-8 text-2xl font-serif font-bold text-white tracking-wider border-b border-zinc-800">
            ap<span className="text-[#D4AF37]">Joias</span>
          </div>
          <nav className="mt-8">
            <ul className="flex flex-col gap-2 px-4">
              <li className="flex items-center gap-3 p-3 bg-zinc-800/50 text-[#D4AF37] rounded border border-zinc-700/50 cursor-pointer">
                <PackagePlus size={18} />
                <span className="font-medium text-sm tracking-wide">Gestão de Estoque</span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-zinc-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-500 py-2.5 px-4 rounded text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-12 bg-zinc-900 border border-zinc-800 p-8 rounded-lg relative overflow-hidden shadow-xl">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${editingId ? 'blue-500' : '[#D4AF37]'} to-transparent opacity-50`}></div>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-white">
                {editingId ? "Editar Joia" : "Cadastrar Nova Joia"}
              </h2>
              {editingId && (
                <button onClick={cancelEdit} className="text-zinc-400 hover:text-white flex items-center gap-1 text-sm">
                  <X size={16}/> Cancelar Edição
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#D4AF37] text-xs uppercase font-bold mb-2">Nome da Joia</label>
                  <input type="text" name="nome" value={product.nome} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded py-3 px-4 text-white focus:border-[#D4AF37] outline-none" required />
                </div>

                <div>
                  <label className="block text-[#D4AF37] text-xs uppercase font-bold mb-2">Categoria</label>
                  <select name="categoria" value={product.categoria} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded py-3 px-4 text-white focus:border-[#D4AF37] outline-none">
                    {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[#D4AF37] text-xs uppercase font-bold mb-2">Qtd. Estoque (0 = Esgotado)</label>
                  <input type="number" name="quantidade" value={product.quantidade} onChange={handleChange} min="0" className="w-full bg-zinc-950 border border-zinc-800 rounded py-3 px-4 text-white focus:border-[#D4AF37] outline-none" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-[#D4AF37] text-xs uppercase font-bold">Imagem da Joia</label>
                  
                  <div className="flex gap-2 items-center bg-zinc-950 border border-zinc-800 rounded px-2 py-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange} 
                      className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-[#D4AF37] hover:file:bg-zinc-700 cursor-pointer w-full"
                    />
                  </div>

                  {imagemFile && (
                    <div className="mt-1 flex flex-col gap-1 border border-zinc-800/80 bg-zinc-950/50 p-3 rounded">
                      <button
                        type="button"
                        onClick={handleRemoveBackground}
                        disabled={isProcessingImg || isLimitReached}
                        className={`flex items-center justify-center gap-2 w-full text-white text-xs font-bold py-2 rounded transition-colors uppercase tracking-wider ${
                          isLimitReached ? 'bg-zinc-700 cursor-not-allowed text-zinc-400' : 'bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800'
                        }`}
                      >
                        {isProcessingImg ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                        {isLimitReached ? "Limite da API Atingido" : isProcessingImg ? "Processando..." : "Padronizar Imagem (Fundo Preto)"}
                      </button>
                      
                      {/* INDICADOR DE USO DA API */}
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-400">
                          <span>Uso da IA (Remove.bg)</span>
                          <span className={isLimitReached ? 'text-red-400 font-bold' : ''}>
                            {apiUsage.used} / {apiUsage.limit}
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full ${usagePercentage > 80 ? 'bg-red-500' : 'bg-indigo-500'}`} 
                            style={{ width: `${usagePercentage}%` }}
                          ></div>
                        </div>
                        {isLimitReached && (
                          <div className="flex items-center gap-1 text-red-400 text-[10px] mt-1">
                            <AlertCircle size={12} />
                            <span>Contate o administrador para aumentar o limite.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <span className="text-zinc-500 text-xs text-center my-1">OU</span>
                  
                  <input type="text" name="imagemUrl" value={product.imagemUrl} onChange={handleChange} placeholder="Cole uma URL da internet..." className="w-full bg-zinc-950 border border-zinc-800 rounded py-3 px-4 text-white focus:border-[#D4AF37] outline-none text-sm" disabled={imagemFile !== null} />
                </div>
                
                {imagePreview && (
                  <div className="md:col-span-2 flex flex-col items-center border border-zinc-800 rounded p-4 bg-zinc-950/50">
                    <span className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Pré-visualização</span>
                    <img src={imagePreview} alt="Preview da Joia" className="w-40 h-40 object-contain rounded border border-zinc-800 shadow-lg" />
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-zinc-800 pt-6">
                <button type="submit" disabled={isProcessingImg} className={`w-full md:w-auto flex items-center justify-center gap-2 text-zinc-950 px-8 py-3 uppercase tracking-widest text-sm font-bold rounded transition-colors disabled:opacity-50 ${editingId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-[#D4AF37] hover:bg-[#B8860B]'}`}>
                  {editingId ? <Edit2 size={18} /> : <PlusCircle size={18} />}
                  {editingId ? "Salvar Alterações" : "Cadastrar Item"}
                </button>
              </div>
            </form>
          </div>

          {/* Listagem de Produtos Existentes */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h3 className="text-xl font-serif text-white">Catálogo Atual ({products.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-widest">
                    <th className="p-4 font-medium">Produto</th>
                    <th className="p-4 font-medium">Categoria</th>
                    <th className="p-4 font-medium text-center">Qtd.</th>
                    <th className="p-4 font-medium text-center">Status</th>
                    <th className="p-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {products.map((prod) => (
                    <tr key={prod.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={prod.imagem} alt={prod.nome} className="w-10 h-10 rounded object-cover border border-zinc-700" />
                        <span className="text-zinc-200">{prod.nome}</span>
                      </td>
                      <td className="p-4 text-zinc-400">{prod.categoria}</td>
                      <td className="p-4 text-center text-zinc-300">{prod.quantidade}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold ${prod.quantidade > 0 ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
                          {prod.quantidade > 0 ? 'Disponível' : 'Esgotado'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleEdit(prod)} className="text-zinc-400 hover:text-blue-400 p-2 transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteProduct(prod.id)} className="text-zinc-400 hover:text-red-400 p-2 transition-colors ml-2" title="Excluir">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-zinc-500">Nenhuma joia cadastrada.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admin;