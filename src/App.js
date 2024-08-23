import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { API_URL, RECIPE_URL } from './config'; // Importar a configuração da API

// Função para buscar receitas
const getReceitas = () => {
  return axios.get(API_URL);
};

// Função para buscar receita por ID
const getReceitaById = (id) => {
  return axios.get(RECIPE_URL(id));
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Aplicativo de Receitas</h1>
          <nav>
            <ul>
              <li><Link to="/">Lista de Receitas</Link></li>
              <li><Link to="/nova-receita">Adicionar Nova Receita</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListaDeReceitas />} />
            <Route path="/receita/:id" element={<DetalhesDaReceita />} />
            <Route path="/nova-receita" element={<AdicionarReceita />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const ListaDeReceitas = () => {
  const [receitas, setReceitas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getReceitas().then((response) => {
      setReceitas(response.data.results);
      setLoading(false);
    }).catch(error => {
      console.error('Erro ao buscar receitas:', error);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Lista de Receitas</h2>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id}>
            <Link to={`/receita/${receita.id}`}>{receita.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DetalhesDaReceita = () => {
  const { id } = useParams();
  const [receita, setReceita] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getReceitaById(id).then((response) => {
      setReceita(response.data);
      setLoading(false);
    }).catch(error => {
      console.error('Erro ao buscar receita:', error);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!receita) return <p>Receita não encontrada.</p>;

  return (
    <div>
      <h2>{receita.title}</h2>
      <img src={receita.image} alt={receita.title} />
      <h3>Ingredientes</h3>
      <ul>
        {receita.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Modo de Preparo</h3>
      <p>{receita.instructions}</p>
    </div>
  );
};

const AdicionarReceita = () => {
  const [title, setTitle] = React.useState('');
  const [ingredients, setIngredients] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

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
    <div>
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

export default App;
