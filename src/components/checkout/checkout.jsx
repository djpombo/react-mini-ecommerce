import { Form, Col, Row, Button, Jumbotron, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstados from '../../services/listar-estados';
import ListarCidades from '../../services/listar-cidades';
import './styles.css';

registerLocale('pt', pt);

function Checkout(props) {

    return (
        <div className="Jumbo">
            <h3 className="text-center">Finalizar Compra</h3>

            <Form noValidate style={{ margin: '10px' }}>

                <Form.Group as={Row} controlId="email" className="formControl">
                    <Form.Label column sm={3}>
                        Email
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="email"
                            placeholder="digite seu email"
                            name="email"
                            data-testid="txt-email"
                        />
                        <Form.Control.Feedback type="invalid">
                            Digite um e-mail válido
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="nomeCompleto" className="formControl">
                    <Form.Label column sm={3} >
                        Nome Completo
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu nome completo"
                            name="nomeCompleto"
                            data-testid="txt-nome-completo"
                        />
                        <Form.Control.Feedback type="invalid">
                            Digite seu nome completo (mínimo 5 caracteres)
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="dataNascimento" className="formControl">
                    <Form.Label column sm={3}>
                        Data de Nascimento
                    </Form.Label>
                    <Col sm={9}>
                        <DatePicker
                            locale="pt"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            dateFormat='dd/MM/yyyy'
                            placeholderText="selecione a data"
                            withPortal
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="cpf" className="formControl">
                    <Form.Label column={3}>
                        CPF
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            placeholder="digite seu CPF"
                            name="cpf"
                            data-testid="txt-cpf"
                        />
                        <Form.Control.Feedback type="invalid">
                            Digite um CPF válido.
                        </Form.Control.Feedback>


                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="endereco" className="formControl">
                    <Form.Label column={3}>
                        Endereço
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu endereço completo"
                            name="endereco"
                            data-testid="txt-endereco"
                        />
                    </Col>
                    <Form.Control.Feedback type="invalid">
                        Digite seu endereço completo.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Row} controlId="estado" className="formControl">
                    <Form.Label column={3}>
                        Estado
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="estado"
                            data-testid='estado'
                            
                        >
                            <ListarEstados />
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Selecione o seu estado
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="cidade" className="formControl">
                    <Form.Label column={3}>
                        Cidade
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="cidade"
                            data-testid="cidade"
                        >
                            <option value="">Selecione a Cidade</option>
                            <ListarCidades estado={'RS'}/>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Selecione a sua cidade.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="cep" className="formControl">
                    <Form.Label column={3}>
                        CEP
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            name="cep"
                            data-testid="cep"
                        />
                        <Form.Control.Feedback type="invalid">
                            Digite seu CEP
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="emailPromocional" className="formControl">
                    <Form.Label column={12}>
                        Deseja receber e-mail com promoções?
                    </Form.Label>
                    <div style={{ display: 'inline-block' }}>
                        <Form.Check
                            inline
                            name="emailPromocional"
                            type="radio"
                            id="promocaoSim"
                            value="S"
                            label="Sim"
                            style={{ marginLeft: '15px' }}
                        />
                        <Form.Check
                            inline
                            name="emailPromocional"
                            type="radio"
                            id="promocaoNao"
                            value="N"
                            label="Não"
                            style={{ marginLeft: '15px' }}
                        />
                    </div>
                </Form.Group>

                <Form.Group as={Row} controlId="termosCondicoes" className="formControl">
                    <Form.Check
                        inline
                        name="termosCondicoes"
                        label="Concordo com os termos e condições"
                        style={{ marginLeft: '15px' }}
                        data-testid="check-termos-condicoes"
                    />
                </Form.Group>

                <Form.Group as={Row} controlId="finalizarCompra" className="formControl">
                    <Col className="text-center" sm={12}>
                        <Button
                            type="submit"
                            variant="success"
                            data-testid="btn-finalizar-compra"
                        >
                            Finalizar Compra
                        </Button>

                    </Col>
                </Form.Group>
            </Form>

            <Modal show={false} data-testid="modal-compra-sucesso">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Compra Realizada com Sucesso!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Um e-mail de confirmação foi enviado com os detalhes da transação
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                    >
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={false} data-testid="modal-compra-erro">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Erro - Comnpra não efetuada
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Um erro ocorreu na sua compra, tente novamente em instantes.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning">Continuar</Button>
                </Modal.Footer>

            </Modal>

        </div>
    )
}
export default Checkout;