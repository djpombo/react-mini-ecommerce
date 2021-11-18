import { render } from '@testing-library/react';
import Checkout from './checkout';

describe('teste do componente checkout', () => {
    it('deve renderizar o componente sem erros', () => {
        const { getByText} = render(<Checkout />);
        const texto = getByText(/checkout/i);
        expect(texto).toBeInTheDocument();
    })
})