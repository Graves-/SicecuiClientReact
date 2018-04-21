import React, { Component } from 'react';
import { Container, Table, Header, Icon } from 'semantic-ui-react';
import MaestroRow from '../maestros/MaestroRow';
import axios from 'axios';
import config from '../../config';

export default class ListaMaestros extends Component {
    constructor(){
        super();
        this.state = {
            maestros: []
        }
    }

    componentDidMount(){
        this.getMaestros();
    }

    render(){

        const listaMaestros = this.state.maestros.map((maestro, i) => {
            return <MaestroRow key={i} nombre={`${maestro.Nombre} ${maestro.ApellidoPaterno} ${maestro.ApellidoMaterno}`} curp={maestro.CURP} rfc={maestro.RFC} origen={`${maestro.Municipio}, ${maestro.Entidad}`} correo={maestro.Email}></MaestroRow>;
        });

        return (
            <Container>
                <Header>
                    <Icon name='list layout' /> Lista de Maestros
                </Header>
                <Table celled compact sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Correo</Table.HeaderCell>
                            <Table.HeaderCell>CURP</Table.HeaderCell>
                            <Table.HeaderCell>RFC</Table.HeaderCell>
                            <Table.HeaderCell>Origen</Table.HeaderCell>
                            <Table.HeaderCell>Acciones</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {listaMaestros}
                    </Table.Body>
                </Table>
            </Container>
        );
    }

    getMaestros(){
        axios.get(`${config.baseUrl}/maestros`, {}).catch(err => {
            console.log('error al obtener alumnos ', err);
        }).then(res => {
            console.log(res.data);
            this.setState({maestros: res.data});
        })
    }
}