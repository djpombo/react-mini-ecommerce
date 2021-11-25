import imgProd_01 from '../../img/img_1.jpg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './listar-produtos.css';

function ListarProdutos(props) {

    const produtos = [
        { nome: 'Aprenda Java', preco: 'R$ 59,90' },
        { nome: 'Javascript em 24h', preco: 'R$ 19,90' },
        { nome: 'React em 7 dias', preco: 'R$ 29,90' },
        { nome: 'Algoritmos e Estrutura de Dados em C', preco: 'R$ 25,90' },
        { nome: 'Start-up', preco: 'R$ 29,90' },
        { nome: 'Testes Unitários com Jasmine', preco: 'R$ 14,90' },
        { nome: 'API Restfull com Spring e Java', preco: 'R$ 15,90' },
        { nome: 'Typescript na Prática', preco: '19,90' }
    ];

    function handleComprar(event, produto){
        event.preventDefault();
        //adcionar o produto
        props.adicionarProduto(produto);
        //exibir mensagem de adcionamento
        props.exibirMensagem(produto);
    }

    function render() {
        let key = 1;

        const cards = produtos.map(produto =>
            <Card
                key={key}
                data-testid={'card' + key++}
                className='cards'>
                <Card.Img variant='top' src={imgProd_01} />
                <Card.Body className="text-center">
                    <Card.Title style={{ height: '40px' }}>
                        {produto.nome}
                    </Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa ex facilis, mollitia libero unde suscipit aliquid eligendi
                        repudiandae totam rem eum sapiente dolores atque est laboriosam
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant="success"
                        style={{ width: '100%' }}
                        onClick={ (event) => handleComprar(event, produto)}>
                        Comprar ({produto.preco})
                    </Button>
                </Card.Footer>
            </Card>);

        return cards;

    }


    return render();

}
ListarProdutos.propTypes = {
    adicionarProduto: PropTypes.func.isRequired,
    exibirMensagem: PropTypes.func.isRequired
}

export default ListarProdutos;