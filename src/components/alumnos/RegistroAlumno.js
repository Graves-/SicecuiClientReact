import React, { Component } from 'react';
import { Form, Icon, Header, Container, FormGroup, Card } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config';
import swal from 'sweetalert2';

class RegistroAlumno extends Component {
    constructor(props){
        super(props);
        this.state = {
            matricula: '',
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
            medios: [
                {key: 1, value: 1, text:'AMIGOS'},
                {key: 2, value: 2, text:'RADIO'},
                {key: 3, value: 3, text:'MANTAS'},
                {key: 4, value: 4, text:'FAMILIA'},
                {key: 5, value: 5, text:'VOLANTES'},
                {key: 6, value: 6, text:'PERIODICO'},
                {key: 7, value: 7, text:'OTROS'}
            ],
            carreras: [
                {key: 1, value:'LEA', text:'LICENCIATURA EN ADMINISTRACIÓN'},
                {key: 2, value:'LED', text:'LICENCIATURA EN DERECHO'},
                {key: 3, value:'LEI', text:'LICENCIATURA EN INFORMÁTICA'},
                {key: 4, value:'LEC', text:'LICENCIATURA EN CONTABILIDAD'}
            ],
            cautrimestres: [
                {key: 1, value: 1, text:'PRIMER CUATRIMESTRE'},
                {key: 2, value: 2, text:'SEGUNDO CUATRIMESTRE'},
                {key: 3, value: 3, text:'TERCER CUATRIMESTRE'},
                {key: 4, value: 4, text:'CUARTO CUATRIMESTRE'}
            ],
            turnos: [
                {key: 1, value: 1, text:'MATUTINO'},
                {key: 2, value: 2, text:'VESPERTINO'},
                {key: 3, value: 3, text:'SABATINO'}
            ],
            estatuses: [
                {key: 1, value: 1, text:'REGULAR'},
                {key: 2, value: 2, text:'IRREGULAR'},
                {key: 3, value: 3, text:'MATERIAS LIBRES'},
                {key: 4, value: 4, text:'BAJA'},
                {key: 5, value: 5, text:'EGRESADO'},
                {key: 6, value: 6, text:'TITULADO'}
            ],
            estadoSelected: 0,
            nombreEdo: '',
            munSelected: 0,
            nombreMun: '',
            carreraSelected: 0,
            cautrimestreSelected: 0,
            turnoSelected: 0,
            nombreTurno: '',
            estatusSelected: 0,
            nombreEstatus: '',
            medioSelected: 0,
            nombreMedio: '',
            trabaja: false,
            isLoading: false
        };
    }

    render() {
        let Trabaja = null;
        if(this.state.trabaja){
            Trabaja = <Form.Input fluid label='Lugar de Trabajo' placeholder='Lugar' value={this.state.lugarTrabajo} onChange={this.lugarTrabajoChanged.bind(this)}></Form.Input>;
        }

        return (
            <Container text>
                <Header size='large'>Registro de Alumno</Header>
                <Form onSubmit={this.formSubmit.bind(this)} loading={this.state.isLoading}>
                    <Form.Input fluid label='Matríula' placeholder='Matrícula de Alumno' value={this.state.matricula} onChange={(e) => this.setState({matricula: e.target.value})}></Form.Input>
        
                    <Header>
                        <Icon name='list layout' /> Datos Generales del Alummno
                    </Header>
                    <Card fluid>
                        <Card.Content>
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
                        </Card.Content>
                    </Card>
                    
                    
                    <Header>
                        <Icon name='map' /> Origen del Alumno
                    </Header>
                    <Card fluid>
                        <Card.Content>
                            <Form.Group widths='equal'>
                                <Form.Select fluid label='Estado' options={this.state.estados} placeholder='Selecciona Estado' onChange={this.estadoChanged.bind(this)} />
                                <Form.Select fluid label='Municipio' options={this.state.municipios} placeholder='Selecciona Municipio' onChange={this.munChanged.bind(this)} />
                            </Form.Group>
                        </Card.Content>
                    </Card>
                    
                    <Header>
                        <Icon name='book' /> Datos Académicos del Alumno
                    </Header>
                    <Card fluid>
                        <Card.Content>
                            <Form.Group widths='equal'>
                                <Form.Select fluid label='Carrera' options={this.state.carreras} placeholder='Selecciona Carrera' onChange={this.carreraChanged.bind(this)} />
                                <Form.Select fluid label='Cuatrimestre' options={this.state.cautrimestres} placeholder='Selecciona Cuatrimestre' onChange={this.cuatChanged.bind(this)} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Select fluid label='Turno' options={this.state.turnos} placeholder='Selecciona Turno' onChange={this.turnoChanged.bind(this)} />
                                <Form.Select fluid label='Estatus' options={this.state.estatuses} placeholder='Selecciona Estatus' onChange={this.estatusChanged.bind(this)} />
                            </Form.Group>
                        </Card.Content>
                    </Card>

                    <Header>
                        <Icon name='info' /> Información Adicional
                    </Header>
                    <Card fluid>
                        <Card.Content>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Bachillerato' placeholder='Bachillerato' icon="book" value={this.state.bach} onChange={this.bachChanged.bind(this)}/>
                                <Form.Select fluid label='¿Cómo te enteraste?' options={this.state.medios} placeholder='Selecciona Medio' onChange={this.mediosChanged.bind(this)} />
                            </Form.Group>
                            <FormGroup widths='equal'>
                                <Form.Checkbox label='Trabaja?' onChange={this.trabajaChanged.bind(this)} />
                                {Trabaja}
                            </FormGroup>
                        </Card.Content>
                    </Card>
                    

                    <Form.Button color='green'><Icon name='add user' />Inscribir</Form.Button>
                </Form>
            </Container>
        );
    }

    componentDidMount(){
        this.fillEdos();
    }

    fillEdos(){
        axios.get(`${config.baseUrl}/estados`).then((response) => {
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
        axios.get(`${config.baseUrl}/municipios`).then((response) => {
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

    carreraChanged(e, target){
        this.setState({carreraSelected: target.value});
    }

    cuatChanged(e, target){
        this.setState({cautrimestreSelected: target.value});
    }

    turnoChanged(e, target){
        let nombre = this.state.turnos[target.value-1].text;
        this.setState({turnoSelected: target.value, nombreTurno: nombre});
    }

    estatusChanged(e, target){
        let nombre = this.state.estatuses[target.value-1].text;
        this.setState({estatusSelected: target.value, nombreEstatus: nombre});
    }

    mediosChanged(e, target){
        let nombre = this.state.medios[target.value-1].text;
        this.setState({medioSelected: target.value, nombreMedio: nombre});
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
        this.setState({isLoading: true});
        let data = {
            Matricula: this.state.matricula,
            Nombre: this.state.nombre,
            ApellidoPaterno: this.state.apePat,
            ApellidoMaterno: this.state.apeMat,
            Telefono: this.state.tel,
            Municipio: this.state.munSelected,
            nombreMun: this.state.nombreMun,
            Entidad: this.state.estadoSelected,
            nombreEdo: this.state.nombreEdo,
            Direccion: this.state.dir,
            CURP: this.state.curp,
            Email: this.state.correo,
            PerfilID: 1,
            CuatrimestreID: this.state.cautrimestreSelected,
            StatusID: this.state.estatusSelected,
            nombreEstatus: this.state.nombreEstatus,
            CarreraID: this.state.carreraSelected,
            Trabaja: this.state.trabaja ? 'SI' : 'NO',
            LugarTrabaja: this.state.lugarTrabajo,
            Turno: this.state.turnoSelected,
            nombreTurno: this.state.nombreTurno,
            Medio: this.state.medioSelected,
            nombreMedio: this.state.nombreMedio,
            Bachillerato: this.state.bach
        };
        console.log(data);

        axios.post(`${config.baseUrl}/alumnos/registro`, data).catch((err) => {
            console.log('error al insertar alumno ', err);
        }).then((response) => {
            if(response.data === 'ok'){
                swal({
                    title: 'Alumno Inscrito',
                    text: 'El alumno fue inscrito exitosamente!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
                this.setState({isLoading: false});
            }else{
                swal({
                    title: 'Error!',
                    text: 'Hubo un error al inscribir al alumno.',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    }
}

export default RegistroAlumno;
