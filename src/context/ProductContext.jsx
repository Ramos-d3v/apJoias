import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    }
  };

  // Usamos FormData agora por causa do upload de arquivos
  const addProduct = async (formData) => {
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: formData,
    });
    fetchProducts();
  };

  const updateProduct = async (id, formData) => {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if(window.confirm("Tem certeza que deseja excluir esta joia?")) {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
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