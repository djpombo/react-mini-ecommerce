import Menu from './menu';
import { render } from '@testing-library/react';

describe('teste do componente menu', () => {
    it('deve renderizar o componente sem erros', () => {
        const { getByText } = render(<Menu />);
        const texto = getByText(/menu/i);
        expect(texto).toBeInTheDocument();
    });
});