import React, { Component } from 'react';
import { Table, Container, Header, Button, Icon } from 'semantic-ui-react';
import config from '../../config';

export default class ListaGrupos extends Component {
    constructor(props){
        super(props);
        this.state = {
            grupos : []
        }
    }
    componentDidMount(){
        this.getGrupos();
    }
    render(){
        return(
            <Container>
                <Header size='huge' textAlign='center'><Icon name='list' /> Lista de Grupos</Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nombre Maestro</Table.HeaderCell>
                            <Table.HeaderCell>Correo Maestro</Table.HeaderCell>
                            <Table.HeaderCell>Materia</Table.HeaderCell>
                            <Table.HeaderCell>Turno</Table.HeaderCell>
                            <Table.HeaderCell>Acciones</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.grupos.map((item, i) => {
                            let turno;
                            switch(item.Turno){
                                case 'A': turno = 'Matutino'; break;
                                case 'B': turno = 'Vespertino'; break;
                                case 'C': turno = 'Sabatino'; break;
                                default: turno = 'Sabatino'; break;
                            }
                            return (
                                <Table.Row key={i}>
                                    <Table.Cell>{item.nombreMaestro}</Table.Cell>
                                    <Table.Cell>{item.emailMaestro}</Table.Cell>
                                    <Table.Cell>{item.MateriaID}</Table.Cell>
                                    <Table.Cell>{turno}</Table.Cell>
                                    <Table.Cell><Button color='red' onClick={this.deleteGrupo.bind(this, item.idMaestro, item.MateriaID, item.Turno)}><Icon name='trash' /> Baja</Button></Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
    getGrupos(){
        fetch(`${config.baseUrl}/grupos`).then(res => {
            return res.json();
        }).then((data) => {
            this.setState({grupos: data});
        }).catch(err => {
            console.log('No se pudieron obtener los grupos.');
        });
    }

    //TODO: Agregar ruta en el servidor para borrar registros. Y agregar mensaje de respuesta en front-end.
    deleteGrupo(idMaestro, idMateria, idTurno){
        console.log(idMaestro, idMateria, idTurno);
    }
}