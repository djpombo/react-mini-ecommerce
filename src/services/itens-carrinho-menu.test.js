import Menu from '../components/menu/menu';
import { render } from '@testing-library/react';
import ItensCarrinhoMenu from './itens-carrinho-menu';

describe('Teste do componente de itens do menu do carrinho', ()=> {
    it('deve renderizar o carrinho vazio', ()=>{
        const { getByTestId } = render(
            <ItensCarrinhoMenu produtos={[]} />
        );
        expect(getByTestId('itens')).toHaveTextContent('Carrinho vazio...');
    });

    it('Deve renderizar o carrinho com um produto', ()=> {
        const produtos = [{ nome: 'Aprenda React', preco: 'R$ 59,90', quantidade: 1 }];
        const{ getByTestId} = render(
            <ItensCarrinhoMenu produtos={produtos} />
        );
        expect(getByTestId(produtos[0].nome)).toHaveTextContent('Aprenda React - 1 x R$ 59,90');
    });

    it|('Deve renderizar o carrinho com multiplos produtos', () =>{
        const produtos =
            [
                { nome: 'Aprenda React', preco: 'R$ 59,90', quantidade: 1 },
                { nome: 'Aprenda PHP', preco: 'R$ 19,90', quantidade: 2 }
            ];
        const { getByTestId } = render(
            <ItensCarrinhoMenu produtos={produtos} />
        );

        expect(getByTestId(produtos[0].nome)).toHaveTextContent('Aprenda React - 1 x R$ 59,90');
        expect(getByTestId(produtos[1].nome)).toHaveTextContent('Aprenda PHP - 2 x R$ 19,90');
        
    });
})