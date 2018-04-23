import React, { Component } from 'react';
import { Container, Table, Header, Icon, Button } from 'semantic-ui-react';
import MaestroRow from '../maestros/MaestroRow';
import axios from 'axios';
import config from '../../config';

export default class ListaMaestros extends Component {
    constructor(){
        super();
        this.state = {
            maestros: [],
            maestroIdSelected: ''
        }
    }

    componentDidMount(){
        this.getMaestros();
    }

    render(){
        // Si la lista se llamma desde el componente de RegistroGrupos, entonces se tiene un botón para la acción de Asignar Grupo.
        const listaMaestros = this.state.maestros.map((maestro, i) => {
            let compAccion;
            if(this.props.padre === 'REGISTRO_GRUPOS'){
                compAccion = <Button color='twitter' onClick={() => this.props.onChange(maestro._id)} objid={maestro._id}><Icon name='sign in'/> Asignar Grupo </Button>;
            }
            return <MaestroRow key={i} nombre={`${maestro.Nombre} ${maestro.ApellidoPaterno} ${maestro.ApellidoMaterno}`} curp={maestro.CURP} rfc={maestro.RFC} origen={`${maestro.Municipio}, ${maestro.Entidad}`} correo={maestro.Email} accion={compAccion}></MaestroRow>;
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
            //console.log(res.data);
            this.setState({maestros: res.data});
        })
    }

    handleClick(e, data){
        console.log(data.objid);
        this.setState({maestroIdSelected: data.objid});
    }
}