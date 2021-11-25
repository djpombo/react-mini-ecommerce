import { render, fireEvent } from '@testing-library/react';
import Checkout from './checkout';
import { axiosMock } from 'axios';

describe('teste do componente checkout', () => {
    const dadosFinalizarCompra = {
        email: 'tuco.kerber@gmail.com',
        nomeCompleto: 'Fulano de tal',
        cpf: '689.145.120-53',
        endereco: 'rua dos cafunchos, 389',
        cidade: 'Novo Hamburgo',
        estado: 'RS',
        cep: '93320-001',
        termosCondicoes: true,
        emailPromocional: 'S',
        dataNascimento: new Date('1976-02-02T23:00:00.000Z'),
        produtos: {},
        total: 'R$ 19,90'
    }

    it('Deve finalizar a compra com sucesso', async () =>{
        axiosMock.get.mockResolvedValueOnce({ data: [ 'São Paulo', 'São Pedro' ]});
        const { findByTestId, getByTestId, getByPlaceholderText } = render(
            <Checkout visivel={true}
             handleExibirProdutos={() => false}
             total={'19,90'}
             produtos={{}}
             handleLimparCarrinho={() => false} />
        );
    
    fireEvent.change(getByTestId('txt-email'), { target: { value: 'tuco.kerber@gmail.com' } });
    fireEvent.change(getByTestId('txt-nome-completo'), { target: { value: 'Fulano de tal' } });
    fireEvent.change(getByPlaceholderText('selecione a data'), { target: { value: '1976-02-02T23:00:00.000Z' } } )
    fireEvent.change(getByTestId('txt-cpf'), { target: { value: '689.145.120-53' } });
    fireEvent.change(getByTestId('txt-endereco'), { target: { value: 'rua dos cafunchos, 389' } });
    fireEvent.change(getByTestId('estado'), { target: { value: 'RS' } });
    const cidade = await findByTestId('cidade');
    fireEvent.change(cidade, { target: { value: 'Novo Hamburgo' } });
    fireEvent.change(getByTestId('cep'), { target: { value: '93320-001' } });
    fireEvent.click(getByTestId('check-termos-condicoes'));
    fireEvent.click(getByTestId('btn-finalizar-compra'));
    const modal = await findByTestId('modal-compra-sucesso');
    expect(modal).toHaveTextContent('Compra Realizada com Sucesso!');
    expect(axiosMock.get).toBeCalledTimes(1);
    expect(axiosMock.post).toBeCalledTimes(1);
    expect(axiosMock.post.mock.calls[0][1]).toStrictEqual(dadosFinalizarCompra);

});

    
});