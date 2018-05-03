import React, { Component } from 'react';
import { Container, Button, Icon, Card, Header } from 'semantic-ui-react';
import config from '../../config';
import BusquedaAlumno from './BusquedaAlumno';
import BusquedaCarrera from '../carreras/busquedaCarrera';
import swal from 'sweetalert2';
import axios from 'axios';

export default class AsignacionMateria extends Component {
    constructor(props){
        super(props);
        this.state = {
            idAlumnoSelected: '',
            matriculaAlumnoSelected: '',
            carreras: [],
            materias: [],
            nombreAlumnoSelected: '',
            idCarreraAlumnoSelected: ''
        }
    }
    componentDidMount(){
        fetch(`${config.baseUrl}/carreras`).then((res) => {
            return res.json();
        }).then((data) => {
            let objArrayMaterias = [];
            let arrayMaterias = [];
            if(data){
                objArrayMaterias = data.map((item, i) => {
                    return item.Materias;
                });
                objArrayMaterias.forEach((item) => {
                    item.forEach((materia) => {
                        arrayMaterias.push(materia);
                    })
                })
            }
            this.setState({carreras: data, materias: arrayMaterias});
        }).catch((err) => {
            console.log('error al obtener carreras ', err);
        })
    }
    render(){
        return(
            <Container>
                <Header size='huge'><Icon name='sign in' /> Inscripción de Materia</Header>
                <Button color='red' onClick={this.onCancel.bind(this)} floated='right'><Icon name='close' /> Cancelar</Button>
                {this.state.idAlumnoSelected === '' ? <BusquedaAlumno onAlumnoSelected={this.onAlumnoSelected.bind(this)} source='ASIGNACION_MATERIA' /> : null}
                {this.state.idAlumnoSelected !== '' ? 
                    <Card fluid>
                        <Card.Content header={this.state.nombreAlumnoSelected} />
                        <Card.Content extra>
                            <Icon name='id card' />
                            <strong>Matrícula:</strong> {this.state.matriculaAlumnoSelected}
                        </Card.Content>
                        <Card.Content>
                            <BusquedaCarrera onMateriaSelected={this.onMateriaSelected.bind(this)} />
                        </Card.Content>
                    </Card>
                : null}
                
            </Container>
        );
    }
    onAlumnoSelected(_id, matricula, nombre, carreraId){
        this.setState({idAlumnoSelected: _id, matriculaAlumnoSelected: matricula, nombreAlumnoSelected: nombre, idCarreraAlumnoSelected: carreraId});
        console.log(_id, matricula, nombre, carreraId);
    }
    onCancel(){
        this.setState({idAlumnoSelected: '', matriculaAlumnoSelected: '', nombreAlumnoSelected: '', idCarreraAlumnoSelected: ''});
    }
    onMateriaSelected(id, turno, nombre){
        console.log(id, turno, nombre);
        const url = `${config.baseUrl}/kardex/check/${this.state.idAlumnoSelected}/${id}`;
        fetch(url).then((res) => {
            return res.text();
        }).then((data) => {
            let payload = {
                AlumnoID: this.state.idAlumnoSelected,
                CarreraID: this.state.idCarreraAlumnoSelected,
                Matricula: this.state.matriculaAlumnoSelected,
                MateriaID: id,
                NombreMateria: nombre,
                Turno: turno,
                PrimerParcial: 0,
                SegundoParcial: 0,
                TercerParcial: 0,
                Promedio: 0,
                Repeticion: 'NO',
                DetallesParcial1: '',
                DetallesParcial2: '',
                DetallesParcial3: ''
            };
            //Si regresa 0 es por que SI se puede inscribir
            if(data === '0'){
                //post
                axios.post(`${config.baseUrl}/kardex/save`, payload).then((res) => {
                    console.log(res.data);
                    if(res.data === 1){
                        swal('Materia Inscrita', 'La materia fue inscrita exitosamente.', 'success');
                    }
                    this.setState({idAlumnoSelected: '', matriculaAlumnoSelected: '', nombreAlumnoSelected: '', idCarreraAlumnoSelected: ''});
                }).catch((err) => {
                    console.log(err);
                    swal('Error', 'Ocurrió un error al inscribir la materia. ' + err, 'error');
                    this.setState({idAlumnoSelected: '', matriculaAlumnoSelected: '', nombreAlumnoSelected: '', idCarreraAlumnoSelected: ''});
                });
            }else{
                //swal('Materia Tomada', 'La materia seleccionada ya esta registrada para este alumno.', 'warning');
                swal({
                    title: 'Materia Tomada',
                    text: 'La materia seleccionada ya esta registrada para este alumno. Puede inscribir esta materia como repetición.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Inscribir en repetición.'
                }).then((result) => {
                    if(result.value){
                        payload.Repeticion = 'SI';
                        axios.post(`${config.baseUrl}/kardex/save`, payload).then((res) => {
                            console.log(res.data);
                            if(res.data === 1){
                                swal('Materia Inscrita', 'La materia fue inscrita exitosamente.', 'success');
                            }
                            this.setState({idAlumnoSelected: '', matriculaAlumnoSelected: '', nombreAlumnoSelected: '', idCarreraAlumnoSelected: ''});
                        }).catch((err) => {
                            console.log(err);
                            swal('Error', 'Ocurrió un error al inscribir la materia. ' + err, 'error');
                            this.setState({idAlumnoSelected: '', matriculaAlumnoSelected: '', nombreAlumnoSelected: '', idCarreraAlumnoSelected: ''});
                        });
                    }
                });

            }
        }).catch((err) => {
            console.log(err);
            swal('Error', 'No se pudo llevar a cabo la inscripción de la materia. \n ' + err, 'error');
        });
    }
}