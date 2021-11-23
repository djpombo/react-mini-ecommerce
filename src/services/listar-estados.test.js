import { render } from '@testing-library/react';
import ListarEstados from './listar-estados';

describe('Teste do Service Listar Estados', () => {
    it('Deve gerar uma listagem de estados', () => {
        const { getByTestId } = render (
            <ListarEstados/>
        );
        expect(getByTestId('AC')).toHaveTextContent('Acre');
        expect(getByTestId('AM')).toHaveTextContent('Amazonas');
    })
})