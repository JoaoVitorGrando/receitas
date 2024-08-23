// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '../api.js';
import './Home.css'; // Importa o CSS para a página Home

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes(query);
        setRecipes(data.results); // Ajuste de acordo com a estrutura dos dados retornados
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      }
    };

    getRecipes();
  }, [query]);

  return (
    <div className="home">
      <h1>Lista de Receitas</h1>
      <input
        type="text"
        placeholder="Pesquisar receitas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipe/${recipe.id}`}>{recipe.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
