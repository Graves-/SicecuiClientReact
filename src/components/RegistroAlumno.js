import React, { Component } from 'react';
import { Form, Icon, Header, Container } from 'semantic-ui-react';
import axios from 'axios';
import FormGroup from 'semantic-ui-react/dist/commonjs/collections/Form/FormGroup';

class RegistroAlumno extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            apePat:'',
            apeMat: '',
            tel: '',
            correo: '',
            curp: '',
            dir: '',
            bach: '',
            lugarTrabajo: '',
            estados: [],
            municipios: [],
            estadoSelected: 0,
            munSelected: 0,
            carreraSelected: 0,
            cautrimestreSelected: 0,
            turnoSelected: 0,
            estatusSelected: 0,
            medioSelected: 0,
            trabaja: false
        };
    }

    render() {
        const carreras = [
            {key: 1, value:'LEA', text:'LICENCIATURA EN ADMINISTRACIÓN'},
            {key: 2, value:'LED', text:'LICENCIATURA EN DERECHO'},
            {key: 3, value:'LEI', text:'LICENCIATURA EN INFORMÁTICA'},
            {key: 4, value:'LEC', text:'LICENCIATURA EN CONTABILIDAD'}
        ];
        const cautrimestre = [
            {key: 1, value: 1, text:'PRIMER CUATRIMESTRE'},
            {key: 2, value: 2, text:'SEGUNDO CUATRIMESTRE'},
            {key: 3, value: 3, text:'TERCER CUATRIMESTRE'},
            {key: 4, value: 4, text:'CUARTO CUATRIMESTRE'}
        ];
        const turnos = [
            {key: 1, value: 1, text:'MATUTINO'},
            {key: 2, value: 2, text:'VESPERTINO'},
            {key: 3, value: 3, text:'SABATINO'}
        ];
        const estatuses = [
            {key: 1, value: 1, text:'REGULAR'},
            {key: 2, value: 2, text:'IRREGULAR'},
            {key: 3, value: 3, text:'MATERIAS LIBRES'},
            {key: 4, value: 4, text:'BAJA'},
            {key: 5, value: 5, text:'EGRESADO'},
            {key: 6, value: 6, text:'TITULADO'}
        ];
        const medios = [
            {key: 1, value: 1, text:'AMIGOS'},
            {key: 2, value: 2, text:'RADIO'},
            {key: 3, value: 3, text:'MANTAS'},
            {key: 4, value: 4, text:'FAMILIA'},
            {key: 5, value: 5, text:'VOLANTES'},
            {key: 6, value: 6, text:'PERIODICO'},
            {key: 7, value: 7, text:'OTROS'}
        ];
        let Trabaja = null;
        if(this.state.trabaja){
            Trabaja = <Form.Input fluid label='Lugar de Trabajo' placeholder='Lugar' value={this.state.lugarTrabajo} onChange={this.lugarTrabajoChanged.bind(this)}></Form.Input>;
        }

        return (
            <Container text>
                <Header size='large'>Large Header</Header>
                <Form onSubmit={this.formSubmit.bind(this)}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Nombre' placeholder='Nombre' value={this.state.nombre} onChange={this.nombreChanged.bind(this)} />
                        <Form.Input fluid label='Apellido Paterno' placeholder='Paterno' value={this.state.apePat} onChange={this.apPatChanged.bind(this)}/>
                        <Form.Input fluid label='Apellido Materno' placeholder='Materno' value={this.state.apeMat} onChange={this.apMatChanged.bind(this)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Teléfono' placeholder='Teléfono' icon="phone" type="number" value={this.state.tel} onChange={this.telChanged.bind(this)}/>
                        <Form.Input fluid label='Correo Electrónico' placeholder='Correo' icon='mail' type="email" value={this.state.correo} onChange={this.correoChanged.bind(this)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='CURP' placeholder='CURP' icon="id card" value={this.state.curp} onChange={this.curpChanged.bind(this)} />
                        <Form.Input fluid label='Dirección' placeholder='Dirección' icon='home' value={this.state.dir} onChange={this.dirChanged.bind(this)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Estado' options={this.state.estados} placeholder='Selecciona Estado' onChange={this.estadoChanged.bind(this)} />
                        <Form.Select fluid label='Municipio' options={this.state.municipios} placeholder='Selecciona Municipio' onChange={this.munChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Carrera' options={carreras} placeholder='Selecciona Carrera' onChange={this.carreraChanged.bind(this)} />
                        <Form.Select fluid label='Cuatrimestre' options={cautrimestre} placeholder='Selecciona Cuatrimestre' onChange={this.cuatChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Turno' options={turnos} placeholder='Selecciona Turno' onChange={this.turnoChanged.bind(this)} />
                        <Form.Select fluid label='Estatus' options={estatuses} placeholder='Selecciona Estatus' onChange={this.estatusChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Bachillerato' placeholder='Bachillerato' icon="book" value={this.state.bach} onChange={this.bachChanged.bind(this)}/>
                        <Form.Select fluid label='¿Cómo te enteraste?' options={medios} placeholder='Selecciona Medio' onChange={this.mediosChanged.bind(this)} />
                    </Form.Group>
                    <FormGroup widths='equal'>
                        <Form.Checkbox label='Trabaja?' onChange={this.trabajaChanged.bind(this)} />
                        {Trabaja}
                    </FormGroup>

                    <Form.Button><Icon name='add user' />Inscribir</Form.Button>
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

    carreraChanged(e, target){
        this.setState({carreraSelected: target.value});
    }

    cuatChanged(e, target){
        this.setState({cautrimestreSelected: target.value});
    }

    turnoChanged(e, target){
        this.setState({turnoSelected: target.value});
    }

    estatusChanged(e, target){
        this.setState({estadoSelected: target.value});
    }

    mediosChanged(e, target){
        this.setState({medioSelected: target.value});
    }

    trabajaChanged(){
        this.setState({trabaja: !this.state.trabaja});
    }

    nombreChanged(event){
        this.setState({nombre: event.target.value});
    }
    apPatChanged(event){
        this.setState({apePat: event.target.value});
    }

    apMatChanged(event){
        this.setState({apeMat: event.target.value});
    }

    telChanged(event){
        this.setState({tel: event.target.value});
    }

    correoChanged(event){
        this.setState({correo: event.target.value});
    }

    curpChanged(event){
        this.setState({curp: event.target.value});
    }

    dirChanged(event){
        this.setState({dir: event.target.value});
    }

    bachChanged(event){
        this.setState({bach: event.target.value});
    }

    lugarTrabajoChanged(event){
        this.setState({lugarTrabajo: event.target.value});
    }

    formSubmit(e){
        e.preventDefault();
        let data = this.state;
        console.log(data);
        axios.post('url', data).catch((err) => {
            //console.log('error xD');
        });
    }
}

export default RegistroAlumno;
