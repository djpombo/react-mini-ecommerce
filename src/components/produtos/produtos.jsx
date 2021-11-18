import ListarProdtuos from "./listar-produtos";
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

function Produtos(props){

    const [exibirMsg, setExibirMsg] = useState(false);
    const [produto, setProduto] = useState('');

    function visivel() {
        return props.visivel ? null : 'hidden'
    }

    function exibirMensagem(produto) {
        setExibirMsg(true);
        setProduto(produto.nome);
        setTimeout(()=>{
            setExibirMsg(false)
        }, 3000);
    }

    return(
        <div className={visivel()}>
            <Alert variant="success" style={{ margin: '10px' }} show={exibirMsg}>
                <Alert.Heading>SUCESSO!</Alert.Heading>
                <p>
                    Produto <b>{ produto }</b> adicionado com sucesso ao carrinho!
                </p>
            </Alert>
            <ListarProdtuos 
                exibirMensagem={exibirMensagem}
                adicionarProduto={props.adicionarProduto}/>
            
        </div>
    )
}

Produtos.propTypes = {
    visivel: PropTypes.bool.isRequired,
    adicionarProduto: PropTypes.func.isRequired
}

export default Produtos;