import { render, screen } from '@testing-library/react';
import Produtos from './produtos';

describe('Teste do componente Produtos', () => {

  it('deve rendereizar o componente quando visivel', () => {
    const { getAllByText } = render(<Produtos visivel={true} adicionarProduto={() => false} />);
    const botoes = getAllByText(/comprar/i);
    expect(botoes).toBeTruthy();
  });

});