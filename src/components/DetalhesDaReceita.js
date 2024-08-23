import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetalhesDaReceita.css';

// Configuração da API Spoonacular
const API_KEY = 'b73ec385957c46339b53f25c72e9dbb1';
const API_URL = `https://api.spoonacular.com/recipes`;

const DetalhesDaReceita = () => {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/${id}/information?apiKey=${API_KEY}`)
      .then(response => {
        setReceita(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar receita:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!receita) return <p>Receita não encontrada.</p>;

  return (
    <div className="detalhes-receita">
      <h2>{receita.title}</h2>
      <img src={receita.image} alt={receita.title} className="detalhes-receita-image" />
      <h3>Ingredientes</h3>
      <ul className="detalhes-receita-ingredients">
        {receita.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Modo de Preparo</h3>
      <p>{receita.instructions}</p>
    </div>
  );
};

export default DetalhesDaReceita;
