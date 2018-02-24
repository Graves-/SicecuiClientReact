import React, { Component } from 'react';
import { Grid, Container, Form, Button, Message, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config';

export default class RegistroPago extends Component {
    constructor(props){
        super(props);
        this.state = {
            conceptos: [],
            carreraSelected: '',
            modoPagoSelected: '',
            conceptoSelected: ''
        }
    }

    componentDidMount(){
        axios.get(`${config.baseUrl}/conceptos`).then((response) => {
            this.setState({conceptos: response.data});
        }).catch(err => console.log('no se pudieron obtener los conceptos de pago', err));
    }

    render(){
        const ModosPago = [
            { key: 'TO', value: 'TOTAL', text: 'TOTAL' },
            { key: 'AB', value: 'ABONOS', text: 'ABONOS' }
        ];
        const Carreras = [
            { key: 'LEI', value: 'LEI', text: 'LICENCIATURA EN INFORMÁTICA'},
            { key: 'LEA', value: 'LEA', text: 'LICENCIATURA EN ADMINISTRACIÓN'},
            { key: 'LED', value: 'LED', text: 'LICENCIATURA EN DERECHO' },
            { key: 'LEC', value: 'LEC', text: 'LICENCIATURA EN CONTABILIDAD'}
        ];

        const Conceptos = this.state.conceptos.map((conc, index) => {
            return { key : index, value: conc.Nombre, text: conc.Nombre }
        });

        let fecha = new Date();
        const strDate = `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`;
        return(
            <Container>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <label>Matrícula:</label>
                                {/*<Dropdown placeholder="Matrícula de alumno." fluid search selection></Dropdown>*/}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input label='Nombre' type='text' placeholder='Nombre' />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input label='Apellido Paterno' type='text' placeholder='Apellido Materno' />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input label='Apellido Materno' type='text' placeholder='Apellido Materno' />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <label>Modo de Pago:</label>
                                <Dropdown placeholder="Selecciona un modo de pago." fluid search selection options={ModosPago} onChange={this.modoPagoChanged.bind(this)}/>
                            </Grid.Column>
                            <Grid.Column>
                                <label>Carrera:</label>
                                <Dropdown placeholder="Selecciona la carrera del alumno." fluid search selection options={Carreras} onChange={this.carreraChanged.bind(this)} />
                            </Grid.Column>
                            <Grid.Column>
                                <label>Concepto:</label>
                                <Dropdown placeholder="Selecciona el concepto de pago." fluid search selection options={Conceptos} onChange={this.conceptoChanged.bind(this)} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input label="Cantidad en Número:" placeholder="Cantidad en número" type="number"></Form.Input>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input label="Cantidad en Letra:" placeholder="Cantidad en letra." type="text"></Form.Input>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.TextArea label="Observaciones" placeholder="Observaciones" type="text"></Form.TextArea>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid textAlign='right' columns={3}>
                        <Grid.Row>
                            <Grid.Column></Grid.Column>
                            <Grid.Column></Grid.Column>
                            <Grid.Column>San José Iturbide, Guanajuato a {strDate} </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid>
                        <Grid.Row>
                            <Button type='submit' color='blue'>Registrar Pago</Button>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Container>
        );
    }
    modoPagoChanged(e, target){
        this.setState({modoPagoSelected: target.value});
    }
    carreraChanged(e, target){
        this.setState({carreraSelected: target.value});
    }

    conceptoChanged(e, target){
        this.setState({conceptoSelected: target.value});
    }

    handleSubmit(){
        this.setState({isSuccess: true});
    }
}