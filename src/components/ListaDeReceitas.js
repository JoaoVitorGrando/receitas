import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListaDeReceitas.css';
import { getReceitas } from './api'; // Ajuste o caminho se necessário

function ListaDeReceitas() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
}

export default ListaDeReceitas;
