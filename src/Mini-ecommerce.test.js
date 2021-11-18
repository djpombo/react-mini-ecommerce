import { render, screen } from '@testing-library/react';
import MiniEcommerce from './Mini-ecommerce';

describe('Teste do componente mini-ecommerce', () => {

  it('deve rendereizar o componente sem erros', () => {
    render(<MiniEcommerce />);
    const linkElement = screen.getByText(/checkout/i);
    expect(linkElement).toBeInTheDocument();
  });

});