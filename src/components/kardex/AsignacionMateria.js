import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import config from '../../config';
import BusquedaAlumno from './BusquedaAlumno';
import ListaCarrerasArbol from '../carreras/listaCarrerasArbol';

export default class AsignacionMateria extends Component {
    constructor(props){
        super(props);
        this.state = {
            idAlumnoSelected: '',
            matriculaAlumnoSelected: '',
            carreras: [],
            materias: []
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
                <BusquedaAlumno onAlumnoSelected={this.onAlumnoSelected.bind(this)} />
            </Container>
        );
    }
    onAlumnoSelected(_id, matricula){
        this.setState({idAlumnoSelected: _id, matriculaAlumnoSelected: matricula});
        console.log(_id, matricula);
    }
}

//TODO: obtener materias y mostrarlas para que puedan ser seleccionadas

/*      SCHEMA 'CURSANDO'
    var CursandoSchema = mongoose.Schema({
        AlumnoID: {type: String, required: true},
        CarreraID: {type: String, required: true},
        Matricula: {type: String, required: true},
        MateriaID: {type: String},
        NombreMateria: {type: String},
        Turno: {type: String},
        PrimerParcial: {type: Number},
        SegundoParcial: {type: Number},
        TercerParcial: {type: Number},
        Promedio: {type: Number},
        Repeticion: {type: String},
        DetallesParcial1: {type: String},
        DetallesParcial2: {type: String},
        DetallesParcial3: {type: String}
    }, {collection: 'Cursando'});
*/