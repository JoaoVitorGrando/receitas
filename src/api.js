// src/api.js
import axios from 'axios';

const API_KEY = 'b73ec385957c46339b53f25c72e9dbb1';
const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`;
const RECIPE_URL = (id) => `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

export const fetchRecipes = async (query) => {
  const response = await axios.get(API_URL, {
    params: {
      query,
    },
  });
  return response.data.results;
};

export const fetchRecipeById = async (id) => {
  const response = await axios.get(RECIPE_URL(id));
  return response.data;
};
