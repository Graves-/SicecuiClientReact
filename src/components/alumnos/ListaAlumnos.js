import React, { Component } from 'react';
import { Container, Table, Header, Grid, Button, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../config';
import _ from 'lodash';
import AlumnoRow from './AlumnoRow';

export default class ListaAlumnos extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            filterInput: ''
        };
        this.getAlumnos = this.getAlumnos.bind(this);
        this.handleLimpiar = this.handleLimpiar.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        this.getAlumnos();
    }

    render(){
        const displayAlumnos = this.state.items.map((alumno, index) => {
            return <AlumnoRow key={index} matricula={alumno.Matricula} nombre={`${alumno.Nombre} ${alumno.ApellidoPaterno} ${alumno.ApellidoMaterno}`} carrera={alumno.CarreraID} cuatrimestre={alumno.CuatrimestreID} />
        });

        return(
            <Container>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Input icon='search' placeholder='Buscar...' fluid value={this.state.filterInput} onClick={this.handleSearch} />
                        </Grid.Column>
                        <Grid.Column>
                            <Button icon onClick={this.handleLimpiar} color='yellow'>
                                <Icon name='trash' />
                                Limpiar
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Table celled compact sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Matrícula</Table.HeaderCell>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Carrera</Table.HeaderCell>
                            <Table.HeaderCell>Cuatrimestre</Table.HeaderCell>
                            <Table.HeaderCell>Acciones</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {displayAlumnos}
                    </Table.Body>
                </Table>
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

    handleSearch(e){
        this.setState({filterInput: e.target.value});
    }

    handleLimpiar(){
        this.setState({filterInput: ''});
    }
}