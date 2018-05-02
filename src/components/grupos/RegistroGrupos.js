import React, { Component } from 'react';
import ListaMaestros from '../maestros/ListaMaestros';
import PanelMaestro from '../maestros/PanelMaestro';
import BusquedaCarrera from '../carreras/busquedaCarrera';
import ConfirmGrupo from './ConfirmGrupo';
import { Container, Header, Segment, Button, Icon } from 'semantic-ui-react';
import config from '../../config';
import swal from 'sweetalert2';
import axios from 'axios';

export default class RegistroGrupos extends Component {
    constructor(){
        super();
        this.state = {
            maestroInfo: null,
            maestroIdSelected: '',
            materiaSelected: '',
            turnoSelected: '',
            maestroIsSelected: false
        }
    }

    render(){
        let SegmentResumen, SegmentMateria, SegmentInfo, ListMaestros;

        if(!this.state.maestroIsSelected){
            ListMaestros = (
                <ListaMaestros padre='REGISTRO_GRUPOS' onChange={this.handleClickXD.bind(this)} />
            );
        }
        if(this.state.materiaSelected !== ''){
            SegmentResumen = (
                <ConfirmGrupo maestro={this.state.maestroInfo} materia={this.state.materiaSelected} turno={this.state.turnoSelected} onConfirm={this.onConfirm.bind(this)} />
            );
            
        }
        if(this.state.maestroIdSelected !== ''){
            SegmentMateria = (
                <Segment color='red'>
                    <BusquedaCarrera onMateriaSelected={this.onMateriaSelected.bind(this)} />
                </Segment>
            );
        }
        if(this.state.maestroInfo != null){
            SegmentInfo = (
                <Segment color='blue'>
                    <div style={{float: 'right'}}>
                        <Button icon onClick={this.onCancelClicked.bind(this)}>
                            <Icon name='close' />
                            Cancelar
                        </Button>
                    </div>
                    <br />
                    <PanelMaestro detalles={this.state.maestroInfo} />
                </Segment>
            );
        }
        return(
            <Container>
                <Header size='huge' textAlign='center'>Registro de Grupos</Header>
                {ListMaestros}
                {SegmentInfo}
                {SegmentMateria}
                {SegmentResumen}
            </Container>
        );
    }

    handleClickXD(_id){
        this.setState({maestroIsSelected: true});
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

    onMateriaSelected(materiaId, turno){
        this.setState({materiaSelected: materiaId, turnoSelected: turno});
        //this.checkCursoAvailable(this.state.maestroIdSelected, materiaId, turno);
    }

    onCancelClicked(){
        this.setState({maestroInfo: null, maestroIdSelected: '', materiaSelected: '', turnoSelected: '', maestroIsSelected: false});
    }

    onConfirm(){
        console.log(this.state.materiaSelected, this.state.maestroIdSelected, this.state.turnoSelected);
        
        switch(this.state.turnoSelected){
            case 'A': 
                fetch(`${config.baseUrl}/maestros/check/grupo/${this.state.maestroIdSelected}/${this.state.materiaSelected}/A`).then((res) => {
                    return res.text();
                }).then((data) => {
                    console.log('Matutino -> ', data);
                    if(data === '0'){ this.postNewGrupo(); } else{this.showMensajeGrupoAsignado();}
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
                break;
            case 'B': 
                fetch(`${config.baseUrl}/maestros/check/grupo/${this.state.maestroIdSelected}/${this.state.materiaSelected}/B`).then((res) => {
                    return res.text();
                }).then((data) => {
                    console.log('Vespertino -> ', data);
                    if(data === '0'){ this.postNewGrupo(); } else{this.showMensajeGrupoAsignado();}
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
                break;
            case 'C': 
                fetch(`${config.baseUrl}/maestros/check/grupo/${this.state.maestroIdSelected}/${this.state.materiaSelected}/C`).then((res) => {
                    return res.text();
                }).then((data) => {
                    console.log('Sabatino -> ', data);
                    if(data === '0'){ this.postNewGrupo(); } else{this.showMensajeGrupoAsignado();}
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
                break;
            default: this.showMensajeGrupoAsignado(); break;
        }
    }

    showMensajeGrupoAsignado(){
        swal('Grupo Ocupado!', 'La materia y turno seleccionados ya tienen un maestro asignado.', 'error');
    }

    postNewGrupo(){
        axios.post(`${config.baseUrl}/grupos/save`, {
            MaestroID: this.state.maestroIdSelected,
            MateriaID: this.state.materiaSelected,
            Turno: this.state.turnoSelected,
            Nombre: `${this.state.maestroInfo.Nombre} ${this.state.maestroInfo.ApellidoPaterno} ${this.state.maestroInfo.ApellidoMaterno}`,
            Email: this.state.maestroInfo.Email
        }).then((res) => {
            if(res.data === 'ok'){
                this.setState({maestroInfo: null, maestroIdSelected: '', materiaSelected: '', turnoSelected: '', maestroIsSelected: false});
                swal('Grupo Asignado!', 'La materia fue asignada al maestro y turnos seleccionados exitosamente.', 'success');
            }else{
                swal('Error', 'La materia no pudo ser asignada al maestro seleccionado.', 'error');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}