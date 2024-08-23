import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Função para renderizar o App com o Router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{ui}</Router>);
};

test('renders Lista de Receitas link', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/Lista de Receitas/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Adicionar Nova Receita link', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/Adicionar Nova Receita/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders pagina inicial', () => {
  renderWithRouter(<App />, { route: '/' });
  expect(screen.getByText(/Lista de Receitas/i)).toBeInTheDocument();
});

test('renders pagina de adicionar receita', () => {
  renderWithRouter(<App />, { route: '/nova-receita' });
  expect(screen.getByText(/Adicionar Nova Receita/i)).toBeInTheDocument();
});
