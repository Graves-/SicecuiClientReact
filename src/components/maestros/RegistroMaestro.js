import React, { Component } from 'react';
import { Form, Icon, Header, Container, Card } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config';
import swal from 'sweetalert2';

class RegistroMaestro extends Component {
    constructor(props){
        super(props);
        this.state = {
            estados: [],
            municipios: [],
            estadoSelected: 0,
            munSelected: 0,
            nivelSelected: '',
            nivelEstudios: [
                {value:'LIC', text: 'LICENCIATURA'},
                {value:'MAE', text: 'MAESTRÍA'},
                {value:'DOC', text: 'DOCTORADO'}
            ],
            nombre: '',
            apePat: '',
            apeMat: '',
            rfc: '',
            curp: '',
            correo: '',
            dir: '',
            tel: '',
            ben: '',
            dirBen: '',
            nombreMun: '',
            nombreEdo: '',
            isLoading: false
        };
    }
    render() {
        return (
            <Container text>
                <Header size='large'>Registro de Maestros</Header>
                <Form onSubmit={this.formSubmit.bind(this)} loading={this.state.isLoading}>

                    <br />
                    <Header>
                        <Icon name='list layout' /> Datos Generales del Maestro
                    </Header>
                    
                    <Card fluid>
                        <Card.Content>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Nombre' placeholder='Nombre' value={this.state.nombre} onChange={e => this.setState({nombre: e.target.value})} />
                                <Form.Input fluid label='Apellido Paterno' placeholder='Paterno' value={this.state.apePat} onChange={e => this.setState({apePat: e.target.value})} />
                                <Form.Input fluid label='Apellido Materno' placeholder='Materno' value={this.state.apeMat} onChange={e => this.setState({apeMat: e.target.value})}/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Correo Electrónico' placeholder='Correo' type='email' icon='mail' value={this.state.correo} onChange={e => this.setState({correo: e.target.value})} />
                                <Form.Input fluid label='RFC' placeholder='RFC' icon='id badge' value={this.state.rfc} onChange={e => this.setState({rfc: e.target.value})} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='CURP' placeholder='CURP' icon='id card' value={this.state.curp} onChange={e => this.setState({curp: e.target.value})} />
                                <Form.Select fluid label='Nivel de Estudios' placeholder='Selecciona Nivel de Estudios' options={this.state.nivelEstudios} onChange={this.nivelChanged.bind(this)} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Dirección' placeholder='Dirección' icon='home' value={this.state.dir} onChange={e => this.setState({dir: e.target.value})} />
                                <Form.Input fluid label='Teléfono' placeholder='Teléfono' icon='phone' type='number' value={this.state.tel} onChange={e => this.setState({tel: e.target.value})} />
                            </Form.Group>
                        </Card.Content>
                    </Card>

                    <Header>
                        <Icon name='list layout' /> Origen del Maestro
                    </Header>

                    <Card fluid>
                        <Card.Content>
                            <Form.Group widths='equal'>
                                <Form.Select fluid label='Estados' placeholder='Selecciona Estado' options={this.state.estados} onChange={this.estadoChanged.bind(this)}/>
                                <Form.Select fluid label='Municipios' placeholder='Selecciona Municipios' options={this.state.municipios} onChange={this.munChanged.bind(this)} />
                            </Form.Group>
                        </Card.Content>
                    </Card>

                    <Header>
                        <Icon name='list layout' /> Beneficiario del Maestro
                    </Header>

                    <Card fluid>
                        <Card.Content>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Nombre Beneficiario' placeholder='Nombre Beneficiario' icon='user' value={this.state.ben} onChange={e => this.setState({ben: e.target.value})} />
                                <Form.Input fluid label='Dirección Beneficiario' placeholder='Dirección Beneficiario' icon='home' value={this.state.dirBen} onChange={e => this.setState({dirBen: e.target.value})} />
                            </Form.Group>
                        </Card.Content>
                    </Card>

                    <Form.Button><Icon name='add user' />Registrar</Form.Button>
                </Form>
            </Container>
        );
    }

    componentDidMount(){
        this.fillEdos();
    }

    fillEdos(){
        axios.get('http://datamx.io/dataset/73b08ca8-e955-4ea5-a206-ee618e26f081/resource/9c5e8302-221c-46f2-b9f7-0a93cbe5365b/download/estados.json').then((response) => {
            let arrayEstados = [];
            let count = 0;
            response.data.forEach(estado => {
                arrayEstados.push({
                    key: count++,
                    value: estado.id,
                    text: estado.name
                });
            });
            this.setState({
                estados: arrayEstados
            });
        }).catch((err) => {
            alert('error al obtener estados ' + err);
        });
    }

    fillMuns(){
        axios.get('http://datamx.io/dataset/319a8368-416c-4fe6-b683-39cf4d58b360/resource/829a7efd-3be9-4948-aa1b-896d1ee12979/download/municipios.json').then((response) => {
            let arrayMuns = [];
            let count = 0;
            response.data.forEach(mun => {
                if(mun.state_id === this.state.estadoSelected){
                    arrayMuns.push({
                        key: count++,
                        value: mun.id,
                        text: mun.name
                    });
                }
            });
            this.setState({
                municipios: arrayMuns
            });
        }).catch((err) => {
            alert('error al obtener estados ' + err);
        });
    }

    estadoChanged(e, target){
        let nombre = this.state.estados[target.value-1].text;
        this.setState({
            estadoSelected: target.value,
            nombreEdo: nombre
        });
        this.fillMuns();
    }

    munChanged(e, target){
        let nombre = this.state.municipios[target.value-1].text;
        this.setState({
            munSelected: target.value,
            nombreMun: nombre
        });
    }

    nivelChanged(e, target){
        this.setState({
            nivelSelected: target.value
        });
    }

    formSubmit(e){
        e.preventDefault();
        this.setState({isLoading: true});

        let data = {
            Nombre: this.state.nombre,
            ApellidoPaterno: this.state.apePat,
            ApellidoMaterno: this.state.apeMat,
            Telefono: this.state.tel,
            Municipio: this.state.munSelected,
            nombreMun: this.state.nombreMun,
            Entidad: this.state.estadoSelected,
            nombreEdo: this.state.nombreEdo,
            CURP: this.state.curp,
            RFC: this.state.rfc,
            Email: this.state.correo,
            Direccion: this.state.dir,
            nombreBen: this.state.ben,
            dirBen: this.state.dirBen
        };

        axios.post(`${config.baseUrl}/maestros/registro`, data).catch(err => {
            console.log('error al insertar maestro ', err);
        }).then(res => {
            if(res !== undefined){
                if(res.data === 'ok'){
                    swal({
                        title: 'Maestro Registrado',
                        text: 'El maestro fue registrado exitosamente!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    this.setState({isLoading: false});
                }else{
                    swal({
                        title: 'Error!',
                        text: 'Hubo un error al registrar al maestro.',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        });
    }
}

export default RegistroMaestro;
