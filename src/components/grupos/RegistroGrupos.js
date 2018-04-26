import React, { Component } from 'react';
import ListaMaestros from '../maestros/ListaMaestros';
import PanelMaestro from '../maestros/PanelMaestro';
import { Divider, Container, Header } from 'semantic-ui-react';
import config from '../../config';

export default class RegistroGrupos extends Component {
    constructor(){
        super();
        this.state = {
            maestroIdSelected: '',
            maestroInfo: {}
        }
    }

    render(){
        return(
            <Container>

                <Header size='huge' textAlign='center'>Registro de Grupos</Header>
                <ListaMaestros padre='REGISTRO_GRUPOS' onChange={this.handleClickXD.bind(this)} />
                <Divider />
                <PanelMaestro detalles={this.state.maestroInfo} />
            </Container>
        );
    }

    handleClickXD(_id){
        this.findMaestro(_id);
    }

    findMaestro(id){
        fetch(`${config.baseUrl}/maestros/find/${id}`).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({maestroInfo: data, maestroIdSelected: id});
        }).catch((err) => {
            console.log('error al obtener maestro ', err);
        });
    }
}