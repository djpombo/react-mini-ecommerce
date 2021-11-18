import ListarProdutos from './listar-produtos';
import { render } from '@testing-library/react';

describe('Teste do componente de listar-produtos', () => {
    it('deve exibir os nomes dos produtos nos cards', () => {
        const { getByTestId } = render(
            <ListarProdutos adicionarProduto={() => false}
                exibirMensagem={() => false} />);
        expect(getByTestId('card1')).toHaveTextContent('Aprenda Java');
        expect(getByTestId('card2')).toHaveTextContent('Javascript em 24h');
    });
    it('deve conter a descrição do produto nos cards', ()=>{
        const { getByTestId } = render(
            <ListarProdutos adicionarProduto={()=>false}
                exibirMensagem={()=> false} />
            );
        expect(getByTestId('card1')).toHaveTextContent('Lorem');
    });
    it('deve exibir os preços dos produtos nos botões de comprar', () =>{
        const { getByTestId } = render(
            <ListarProdutos adicionarProduto={()=> false}
                exibirMensagem={()=> false} />

        );
        expect(getByTestId('card1')).toHaveTextContent('Comprar (R$ 59,90)');
        expect(getByTestId('card2')).toHaveTextContent('Comprar (R$ 19,90)');
    });
});