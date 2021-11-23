import Menu from './menu';
import { render } from '@testing-library/react';

describe('teste do componente menu', () => {
    it('deve renderizar o componente sem erros', () => {
        const { getByText } = render(<Menu 
            produtos={[]}
            handleExibirProdutos={()=> false}
            handleExibirCheckout={()=> false} />);
        const texto = getByText(/mini ecommerce/i);
        expect(texto).toBeInTheDocument();
    });
});