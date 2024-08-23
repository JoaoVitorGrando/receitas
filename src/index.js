import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globais
import App from './App'; // Componente principal do aplicativo
import reportWebVitals from './reportWebVitals'; // Função para medir performance

const root = ReactDOM.createRoot(document.getElementById('root')); // Criação do root do React
root.render(
  <React.StrictMode>
    <App /> {/* Renderização do componente principal */}
  </React.StrictMode>
);

// Função para medir e registrar a performance do aplicativo
reportWebVitals(console.log);
