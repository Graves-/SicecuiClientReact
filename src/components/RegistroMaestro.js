import React, { Component } from 'react';
import { Form, Icon, Header, Container } from 'semantic-ui-react';
import axios from 'axios';

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
            ]
        };
    }
    render() {
        return (
            <Container text>
                <Header size='large'>Registro de Maestros</Header>
                <Form onSubmit={this.formSubmit.bind(this)}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Nombre' placeholder='Nombre' />
                        <Form.Input fluid label='Apellido Paterno' placeholder='Paterno' />
                        <Form.Input fluid label='Apellido Materno' placeholder='Materno' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Correo Electrónico' placeholder='Correo' type='email' icon='mail' />
                        <Form.Input fluid label='RFC' placeholder='RFC' icon='id badge' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='CURP' placeholder='CURP' icon='id card' />
                        <Form.Select fluid label='Nivel de Estudios' placeholder='Selecciona Nivel de Estudios' options={this.state.nivelEstudios} onChange={this.nivelChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Estados' placeholder='Selecciona Estado' options={this.state.estados} onChange={this.estadoChanged.bind(this)}/>
                        <Form.Select fluid label='Municipios' placeholder='Selecciona Municipios' options={this.state.municipios} onChange={this.munChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Dirección' placeholder='Dirección' icon='home' />
                        <Form.Input fluid label='Teléfono' placeholder='Teléfono' icon='phone' type='number' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Nombre Beneficiario' placeholder='Nombre Beneficiario' icon='user' />
                        <Form.Input fluid label='Dirección Beneficiario' placeholder='Dirección Beneficiario' icon='home' />
                    </Form.Group>

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
        this.setState({
            estadoSelected: target.value
        });
        this.fillMuns();
    }

    munChanged(e, target){
        this.setState({
            munSelected: target.value
        });
    }

    nivelChanged(e, target){
        this.setState({
            nivelSelected: target.value
        });
    }

    formSubmit(){

    }
}

export default RegistroMaestro;
