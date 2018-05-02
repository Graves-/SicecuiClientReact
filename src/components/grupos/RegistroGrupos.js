import React, { Component } from 'react';
import ListaMaestros from '../maestros/ListaMaestros';
import PanelMaestro from '../maestros/PanelMaestro';
import BusquedaCarrera from '../carreras/busquedaCarrera';
import { Divider, Container, Header } from 'semantic-ui-react';
import config from '../../config';
import swal from 'sweetalert2';

export default class RegistroGrupos extends Component {
    constructor(){
        super();
        this.state = {
            maestroInfo: {},
            maestroIdSelected: '',
            materiaSelected: ''
        }
    }

    render(){
        let SelectCarrera, SelectMaestro;
        if(this.state.materiaSelected !== ''){
            SelectCarrera = <h1>{this.state.materiaSelected}</h1>
        }
        if(this.state.maestroIdSelected !== ''){
            SelectMaestro = <BusquedaCarrera onMateriaSelected={this.onMateriaSelected.bind(this)} />
        }
        return(
            <Container>
                <Header size='huge' textAlign='center'>Registro de Grupos</Header>
                <ListaMaestros padre='REGISTRO_GRUPOS' onChange={this.handleClickXD.bind(this)} />
                <Divider />
                {/*<PanelMaestro detalles={this.state.maestroInfo} />*/}
                {SelectMaestro}

                {SelectCarrera}
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

    onMateriaSelected(materiaId){
        this.setState({materiaSelected: materiaId});
        this.checkCursoAvailable(this.state.maestroIdSelected, materiaId);
    }

    checkCursoAvailable(maestroId, materiaId){
        let matutinoAvailable = false;
        let vespertinoAvailable = false;
        let sabatinoAvailable = false;

        fetch(`${config.baseUrl}/maestros/check/grupo/${maestroId}/${materiaId}/A`).then((res) => {
            return res.text();
        }).then((dataA) => {
            fetch(`${config.baseUrl}/maestros/check/grupo/${maestroId}/${materiaId}/B`).then((res) => {
                return res.text();
            }).then((dataB) => {
                fetch(`${config.baseUrl}/maestros/check/grupo/${maestroId}/${materiaId}/C`).then((res) => {
                    return res.text();
                }).then((dataC) => {
                    // checa qué grupos están disponibles
                    matutinoAvailable = dataA === '0' ? true : false;
                    vespertinoAvailable = dataB === '0' ? true : false;
                    sabatinoAvailable = dataC === '0' ? true : false;
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}