import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstados from '../../services/listar-estados';
import ListarCidades from '../../services/listar-cidades';
import { Formik } from 'formik';
import * as yup from 'yup';
import { formatarCpf, validarCpf } from '../../utils/cpf.util';
import { formatarCep } from '../../utils/cep.util';
import axios from 'axios';
import './styles.css';

registerLocale('pt', pt);

const CHECKOUT_URL='http://localhost:3001/mini-ecommerce/checkout/finalizar-compra';

function Checkout(props) {

    const [dataNascimento, setDataNascimento] = useState(null);
    const [formEnvaido, setFormEnviado] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErroModal, setShowErroModal] = useState(false);

    //configuracao do yup para validacao do form
    const schema = yup.object({
        email: yup.string().email().required(),
        nomeCompleto: yup.string().required().min(5),
        cpf: yup.string().required().min(14).max(14)
            .test('cpf-valido', 'CPF Inválido', (cpf) => validarCpf(cpf)),
        endereco: yup.string().min(5).required(),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        cep: yup.string().required().min(9).max(9),
        emailPromocional: yup.string().required(),
        termosCondicoes: yup.bool().oneOf([true])

    })

    function visivel() {
        return props.visivel ? null : 'hidden';
    }

    async function finalizarCompra(dados) {

        if(!dataNascimento){
            setFormEnviado(true);
            return;
        }
        dados.dataNascimento = dataNascimento;
        dados.produtos = JSON.stringify(props.produtos);
        dados.total = `R$: ${props.total}`;

        try{            
                await axios.post(CHECKOUT_URL, dados);
                setShowModal(true);
                props.handleLimparCarrinho();
       
        } catch (error) {

            setShowErroModal(true);

        }

    }

    function handleDataNascimento(data) {

        setDataNascimento(data);
    }

    function datePickerCss() {
        if (!formEnvaido) {

            return "form-control";
        }
        if (dataNascimento) {

            return "form-control is-valid";

        } else {

            return "form-control is-invalid";
        }

    }

    function handleContinuar() {
        setShowModal(false);
        props.handleExibirProdutos();

    }

    function handleFecharErroModal(){
        setShowErroModal(false);
    }

    return (
        <div className={visivel()}>
            <div className="Jumbo">
                <h3 className="text-center">Finalizar Compra</h3>

                <Formik
                    onSubmit={(values) => { finalizarCompra(values) }}
                    initialValues={{
                        email: '',
                        nomeCompleto: '',
                        cpf: '',
                        endereco: '',
                        cidade: '',
                        estado: '',
                        cep: '',
                        termosCondicoes: false,
                        emailPromocional: 'S'
                    }}
                    validationSchema={schema}
                >
                    {/** VALIDAÇOES DO FORMIK */}
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors
                    }) => (

                        <Form
                            noValidate
                            style={{ margin: '10px' }}
                            onSubmit={handleSubmit}
                        >

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
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={touched.email && !!errors.email}
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
                                        value={values.nomeCompleto}
                                        onChange={handleChange}
                                        isValid={touched.nomeCompleto && !errors.nomeCompleto}
                                        isInvalid={touched.nomeCompleto && !!errors.nomeCompleto}
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
                                        selected={dataNascimento}
                                        onChange={handleDataNascimento}
                                        className={datePickerCss()}
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
                                        value={values.cpf}
                                        onChange={e => {
                                            e.currentTarget.value = formatarCpf(e.currentTarget.value);
                                            handleChange(e);
                                        }}
                                        isValid={touched.cpf && !errors.cpf}
                                        isInvalid={touched.cpf && !!errors.cpf}
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
                                        value={values.endereco}
                                        onChange={handleChange}
                                        isValid={touched.endereco && !errors.endereco}
                                        isInvalid={touched.endereco && !!errors.endereco}
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
                                        value={values.estado}
                                        onChange={handleChange}
                                        isValid={touched.estado && !errors.estado}
                                        isInvalid={touched.estado && !!errors.estado}

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
                                        value={values.cidade}
                                        onChange={handleChange}
                                        isValid={touched.cidade && !errors.cidade}
                                        isInvalid={touched.cidade && !!errors.cidade}
                                    >
                                        <option value="">Selecione a Cidade</option>
                                        <ListarCidades estado={values.estado} />
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
                                        value={values.cep}
                                        onChange={e => {
                                            e.currentTarget.value = formatarCep(e.currentTarget.value);
                                            handleChange(e);
                                        }}
                                        isValid={touched.cep && !errors.cep}
                                        isInvalid={touched.cep && !!errors.cep}
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
                                        checked={values.emailPromocional === 'S'}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        name="emailPromocional"
                                        type="radio"
                                        id="promocaoNao"
                                        value="N"
                                        label="Não"
                                        style={{ marginLeft: '15px' }}
                                        checked={values.emailPromocional === 'N'}
                                        onChange={handleChange}
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
                                    value={values.termosCondicoes}
                                    onChange={handleChange}
                                    isValid={touched.termosCondicoes && !errors.termosCondicoes}
                                    isInvalid={touched.termosCondicoes && !!errors.termosCondicoes}
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
                    )}
                </Formik>

                <Modal show={showModal}
                    data-testid="modal-compra-sucesso"
                    onHide={handleContinuar}
                >
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
                            onClick={handleContinuar}
                        >
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showErroModal}
                    data-testid="modal-compra-erro"
                    onHide={handleFecharErroModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Erro - Comnpra não efetuada
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Um erro ocorreu na sua compra, tente novamente em instantes.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning"
                            onClick={handleFecharErroModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>

                </Modal>

            </div>
        </div>
    )
}
Checkout.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirProdutos: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired,
    produtos: PropTypes.object.isRequired,
    handleLimparCarrinho: PropTypes.func.isRequired
}
export default Checkout;