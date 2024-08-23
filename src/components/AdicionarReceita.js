import React, { useState } from 'react';
import axios from 'axios';
import './AdicionarReceita.css';

const AdicionarReceita = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const novaReceita = {
      title,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      instructions
    };

    try {
      await axios.post('http://localhost:3001/api/receitas', novaReceita);
      setSuccess('Receita adicionada com sucesso!');
      setError('');
      setTitle('');
      setIngredients('');
      setInstructions('');
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
      setError('Erro ao adicionar receita.');
      setSuccess('');
    }
  };

  return (
    <div className="adicionar-receita">
      <h2>Adicionar Nova Receita</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título da Receita</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredientes (separados por vírgulas)</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="instructions">Modo de Preparo</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Receita</button>
      </form>
    </div>
  );
};

export default AdicionarReceita;
