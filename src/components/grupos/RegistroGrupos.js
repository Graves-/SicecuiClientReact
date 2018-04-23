import React, { Component } from 'react';
import ListaMaestros from '../maestros/ListaMaestros';
import PanelMaestro from '../maestros/PanelMaestro';
import { Divider, Container, Header } from 'semantic-ui-react';

export default class RegistroGrupos extends Component {
    constructor(){
        super();
        this.state = {
            maestroIdSelected: ''
        }
    }

    componentDidMount(){
    }

    render(){
        return(
            <Container>

                <Header size='huge' textAlign='center'>Registro de Grupos</Header>
                <ListaMaestros padre='REGISTRO_GRUPOS' onChange={this.handleClickXD.bind(this)} />
                <Divider />
                <PanelMaestro idmaestro={this.state.maestroIdSelected} />
            </Container>
        );
    }

    handleClickXD(_id){
        console.log(_id);
        this.setState({maestroIdSelected: _id});
    }
}