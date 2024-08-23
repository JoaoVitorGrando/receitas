// Configuração da API Spoonacular
const API_KEY = 'b73ec385957c46339b53f25c72e9dbb1';
const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`;
const RECIPE_URL = (id) => `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

export { API_KEY, API_URL, RECIPE_URL };
