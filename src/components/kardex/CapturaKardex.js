import React, {Component} from 'react';
import BusquedaAlumno from './BusquedaAlumno';
import CapturarMateriaKardex from './CapturarMateriaKardex';
import config from '../../config';
import { Container, Header, Icon, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

export default class CapturaKardex extends Component {
    constructor(props){
        super(props);
        this.state = {
            idAlumno: '',
            matriculaAlumno: '',
            nombreAlumno: '',
            carreraAlumno: '',
            turnoAlumno: '',
            carreras: [],
            materiasAgrupadas: [],
            materiasCapturadas: [],
            totalMaterias: 0
        }
        this.cancel = this.cancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount(){
        fetch(`${config.baseUrl}/carreras`).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({carreras: data});
        }).catch((err) => {
            console.log('error al obtener carreras ', err);
        });
    }

    render(){
        return(
            <Container>
                <Button floated='right' color='red' onClick={this.cancel}>Cancelar</Button>
                <Header size='huge'><Icon name='edit' /> Captura de Kardex</Header>
                {this.state.carreraAlumno === '' ? <BusquedaAlumno onAlumnoSelected={this.onAlumnoSelected.bind(this)} source='CAPTURA_KARDEX' /> : null}
                {this.state.carreraAlumno === '' ?  null : <Header>{this.state.materiasCapturadas.length} / {this.state.totalMaterias} materias capturadas.</Header>}
                <Form id='FormKardex'>
                    {
                        this.state.materiasAgrupadas.map((grupo, index) => {
                            return(
                                <div key={index}>
                                    <Header size='huge'><Icon name='caret right' /> {grupo.group}</Header>
                                    {
                                        grupo.materias.map((materia, i) => {
                                            return <CapturarMateriaKardex key={i} nombreMat={materia.Nombre} idMateria={materia.MateriaID} onSave={this.onSave}  />
                                        })
                                    }   
                                </div>
                            );
                        })
                    }
                    {/*<Button fluid color='green'>Guardar</Button>*/}
                </Form>
                
            </Container>
        );
    }

    onAlumnoSelected(_id, matricula, nombre, carreraID, turno){
        let arrayMaterias = null;
        if(this.state.carreras){
            this.state.carreras.forEach((carrera, i) => {
                if(carrera.CarreraID === carreraID){
                    arrayMaterias = carrera.Materias;
                }
            });
        }
        
        let agruparValores = arrayMaterias.reduce((obj, item) => {
            obj[item.CuatrimestreID] = obj[item.CuatrimestreID] || [];
            obj[item.CuatrimestreID].push(item);
            return obj;
        }, {});

        let materiasAgrupadas = Object.keys(agruparValores).map((key) => {
            return {group: `${key}º Cuatrimestre`, materias: agruparValores[key]}
        });
        

        this.setState({idAlumno: _id, matriculaAlumno: matricula, nombreAlumno: nombre, carreraAlumno: carreraID, materiasAgrupadas: materiasAgrupadas, turnoAlumno: turno, totalMaterias: arrayMaterias.length});
    }

    cancel(){
        this.setState({idAlumno: '', matriculaAlumno: '', nombreAlumno: '', carreraAlumno: '', materiasAgrupadas: [], totalMaterias: 0});
    }

    onSave(materia){
        let tempArray = this.state.materiasCapturadas;
        tempArray.push(materia);
        this.setState({materiasCapturadas: tempArray});

        let payload = {
            AlumnoID: this.state.idAlumno,
            CarreraID: this.state.carreraAlumno,
            Matricula: this.state.matriculaAlumno,
            MateriaID: materia.idMateria,
            NombreMateria: materia.nombre,
            Turno: this.state.turnoAlumno,
            PrimerParcial: materia.primero,
            SegundoParcial: materia.segundo,
            TercerParcial: materia.tercero,
            Promedio: materia.promedio,
            Repeticion: materia.repeticion,
            DetallesParcial1: '',
            DetallesParcial2: '',
            DetallesParcial3: ''
        };

        axios.post(`${config.baseUrl}/kardex/save`, payload).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }
}