import React, { Component } from 'react';
import { Grid, Container, Form, Button, Message, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import swal from 'sweetalert2';
import config from '../../config';

export default class RegistroPago extends Component {
    constructor(props){
        super(props);
        this.state = {
            conceptos: [],
            carreraSelected: '',
            modoPagoSelected: '',
            conceptoSelected: '',
            matricula: '',
            nombre: '',
            paterno: '',
            materno: '',
            cantNum: 0,
            cantLetra: '',
            obs: '',
            isLoading: false
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
                <Form onSubmit={this.handleSubmit.bind(this)} loading={this.state.isLoading}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input label='Matrícula' type='text' placeholder='Matrícula' value={this.state.matricula} onChange={(e) => this.setState({matricula: e.target.value})} />
                                {/*<Dropdown placeholder="Matrícula de alumno." fluid search selection></Dropdown>*/}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input label='Nombre' type='text' placeholder='Nombre' value={this.state.nombre} onChange={(e) => this.setState({nombre: e.target.value})} />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input label='Apellido Paterno' type='text' placeholder='Apellido Paterno' value={this.state.paterno} onChange={(e) => this.setState({paterno: e.target.value})} />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input label='Apellido Materno' type='text' placeholder='Apellido Materno' value={this.state.materno} onChange={(e) => this.setState({materno: e.target.value})} />
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
                                <Form.Input label="Cantidad en Número:" placeholder="Cantidad en número" type="number" value={this.state.cantNum} onChange={(e) => this.setState({cantNum: e.target.value})}></Form.Input>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input label="Cantidad en Letra:" placeholder="Cantidad en letra." type="text" value={this.state.cantLetra} onChange={(e) => this.setState({cantLetra: e.target.value})}></Form.Input>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.TextArea label="Observaciones" placeholder="Observaciones" type="text" alue={this.state.obs} onChange={(e) => this.setState({obs: e.target.value})}></Form.TextArea>
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
        this.setState({isLoading: true});
        let data = {
            modo: this.state.modoPagoSelected,
            CarreraID: this.state.carreraSelected,
            concepto: this.state.conceptoSelected,
            matricula: this.state.matricula,
            nombre: this.state.nombre,
            paterno: this.state.paterno,
            materno: this.state.materno,
            cantNum: this.state.cantNum,
            cantLetra: this.state.cantLetra,
            obs: this.state.obs
        };
        const initialState = {
            carreraSelected: '',
            modoPagoSelected: '',
            conceptoSelected: '',
            matricula: '',
            nombre: '',
            paterno: '',
            materno: '',
            cantNum: 0,
            cantLetra: '',
            obs: '',
            isLoading: false
        };

        axios.post(`${config.baseUrl}/pagos/save`, data).catch((err) => {
            console.log('error al insertar pago ', err);
        }).then((res) => {
            if(res !== undefined){
                if(res.data === 'ok'){
                    this.setState(initialState);
                    swal({
                        title: 'Pago Realizado',
                        text: 'El pago fue guardado exitosamente!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }else{
                    console.log(res.data);
                    swal({
                        title: 'Error!',
                        text: 'Hubo un error al realizar el pago.',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        });
    }
}