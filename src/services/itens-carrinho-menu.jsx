import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

function ItensCarrinhoMenu(props) {

    function render() {
        //carrinho vazio
        if (props.produtos.length === 0) {
            return(
            <NavDropdown.Item
                href=""
                data-testid="itens"
            >
                <FontAwesomeIcon icon={faSadTear} />&nbsp;
                Carrinho vazio...
            </NavDropdown.Item>
            )};
            
        //listagem dos produtos
        const itens = props.produtos.map(prod =>
            <NavDropdown.Item
                href=""
                key={prod.nome}
                data-testid={prod.nome}>
                    {prod.nome} - {prod.quantidade} x {prod.preco}
            </NavDropdown.Item>
        );

        return itens;

    }

    return render();

}
ItensCarrinhoMenu.propTypes = {
    produtos: PropTypes.array.isRequired
}
export default ItensCarrinhoMenu;