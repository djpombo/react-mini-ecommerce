import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faCashRegister, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Menu() {

    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand href="">React Mini Ecommerce</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavDropdown
                        title={
                            <div style={{ display: 'inline-block' }}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                &nbsp;
                                Carrinho
                            </div>
                        }
                        style={{ marginRight: '5rem' }}


                    >
                        <NavDropdown.Item href="">
                            <FontAwesomeIcon icon={faShoppingBasket} />&nbsp;
                            <strong>Produtos</strong>
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        {/** ITEMS DO CARRINHO */}
                        <NavDropdown.Divider />

                        <NavDropdown.Item href="" data-testid="total-carrinho" >
                            Total: R$ {/** TOTAL */}
                        </NavDropdown.Item>

                        <span>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="" style={{ color: 'green' }} >
                                <strong><FontAwesomeIcon icon={faCashRegister} />&nbsp;
                                    Finalizar compra
                                </strong>
                            </NavDropdown.Item>
                        </span>

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Menu;