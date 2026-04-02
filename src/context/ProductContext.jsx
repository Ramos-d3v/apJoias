import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  // Puxa a URL base do .env
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    fetchProducts();
  }, []);

  // Qualquer pessoa pode ver os produtos (Não precisa de token)
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products`);
      if(response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função auxiliar para pegar o token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { 'Authorization': `Bearer ${token}` };
  };

  // Requer Token
  const addProduct = async (formData) => {
    await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: getAuthHeaders(), // <-- Enviando a "chave" da porta
      body: formData,
    });
    fetchProducts();
  };

  // Requer Token
  const updateProduct = async (id, formData) => {
    await fetch(`${apiUrl}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });
    fetchProducts();
  };

  // Requer Token
  const deleteProduct = async (id) => {
    if(window.confirm("Tem certeza que deseja excluir esta joia?")) {
      await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      fetchProducts();
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct,
      updateProduct,
      deleteProduct,
      categoriaSelecionada, 
      setCategoriaSelecionada 
    }}>
      {children}
    </ProductContext.Provider>
  );
};