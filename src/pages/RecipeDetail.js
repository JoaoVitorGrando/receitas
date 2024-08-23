import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../api';
import './RecipeDetail.css'; // Adicione a importação do CSS para esta página

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="recipe-detail">
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <h2>Ingredientes:</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h2>Modo de Preparo:</h2>
          <p>{recipe.instructions}</p>
        </>
      ) : (
        <p>Receita não encontrada.</p>
      )}
    </div>
  );
};

export default RecipeDetail;
