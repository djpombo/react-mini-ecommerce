import { render } from '@testing-library/react';
import axiosMock from 'axios';
import ListarCidades from './listar-cidades';

describe('Teste do componente listar-cidades', () => {
    it('deve gerar uma listagem de cidades', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: ['São Leopoldo', 'Porto Alegre'] });
        const { findByTestId } = render(<ListarCidades estado="RS" />);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(await findByTestId('São Leopoldo')).toHaveTextContent('São Leopoldo');
        expect(await findByTestId('Porto Alegre')).toHaveTextContent('Porto Alegre');
    })
})