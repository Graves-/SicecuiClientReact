import React, { Component } from 'react';
import { Container, Table, Grid, Button, Icon, Input} from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config';
import AlumnoRow from './AlumnoRow';
import DetallesAlumno from './DetallesAlumno';

export default class ListaAlumnos extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            filterInput: '',
            showDetalles: false,
            alumnoEditar: {}
        };
        this.getAlumnos = this.getAlumnos.bind(this);
        this.handleLimpiar = this.handleLimpiar.bind(this);
        this.handleDetalles = this.handleDetalles.bind(this);
    }

    componentDidMount(){
        this.getAlumnos();
    }

    render(){
        /*const displayAlumnos = this.state.items.map((alumno, index) =>  return <AlumnoRow key={index} matricula={alumno.Matricula} nombre={`${alumno.Nombre} ${alumno.ApellidoPaterno} ${alumno.ApellidoMaterno}`} carrera={alumno.CarreraID} cuatrimestre={alumno.CuatrimestreID} />);*/
        const filteredAlumnos = this.state.items.filter((alumno, index) => {
            let nombreCompleto = `${alumno.Nombre} ${alumno.ApellidoPaterno} ${alumno.ApellidoMaterno}`;
            return alumno.Matricula.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1 || nombreCompleto.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1 || alumno.CarreraID.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1;
        });

        const displayAlumnos = filteredAlumnos.map((alumno, index) => {
            return (
                <AlumnoRow 
                    key={index} 
                    matricula={alumno.Matricula} 
                    nombre={`${alumno.Nombre} ${alumno.ApellidoPaterno} ${alumno.ApellidoMaterno}`} 
                    carrera={alumno.CarreraID} 
                    cuatrimestre={alumno.CuatrimestreID} 
                    handler={() => this.handleDetalles(alumno)}
                    origen={`${alumno.Municipio}, ${alumno.Entidad}`}
                    estatus={alumno.Status}
                />
            );
        });

        return(
            <Container fluid style={{padding: '15px'}}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Input icon='search' placeholder='Buscar...' fluid value={this.state.filterInput} onChange={e => this.setState({filterInput: e.target.value})} />
                        </Grid.Column>
                        <Grid.Column>
                            <Button icon onClick={this.handleLimpiar} color='yellow'>
                                <Icon name='trash' />
                                Limpiar
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <Table celled compact sortable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Matrícula</Table.HeaderCell>
                                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                                    <Table.HeaderCell>Carrera</Table.HeaderCell>
                                    <Table.HeaderCell>Cuatrimestre</Table.HeaderCell>
                                    <Table.HeaderCell>Origen</Table.HeaderCell>
                                    <Table.HeaderCell>Estatus</Table.HeaderCell>
                                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {displayAlumnos}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        { 
                            this.state.showDetalles === true ? 
                                <div>
                                    <DetallesAlumno alumno={this.state.alumnoEditar}></DetallesAlumno> 
                                    <div style={{textAlign: 'right'}}>
                                        <Button onClick={() => this.setState({showDetalles: false})} color='red'><Icon name='close' />Cerrar</Button>
                                    </div>
                                </div>
                            : "" 
                        }
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }

    getAlumnos(){
        axios.get(`${config.baseUrl}/alumnos`).then((response) => {
            this.setState({items: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleLimpiar(){
        this.setState({filterInput: ''});
    }

    handleDetalles(alumno){
        this.setState({showDetalles: true, alumnoEditar: alumno});
    }
}