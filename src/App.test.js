import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Project Details text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Project Details/i);
  expect(linkElement).toBeInTheDocument();
});
