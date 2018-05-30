import React, {Component} from 'react';
import BusquedaAlumno from './BusquedaAlumno';
import CapturarMateriaKardex from './CapturarMateriaKardex';
import config from '../../config';
import { Container, Header, Icon, Button, Form } from 'semantic-ui-react';

export default class CapturaKardex extends Component {
    constructor(props){
        super(props);
        this.state = {
            idAlumno: '',
            matriculaAlumno: '',
            nombreAlumno: '',
            carreraAlumno: '',
            carreras: [],
            materiasAgrupadas: [],
            materiasCapturadas: []
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
                    <Button fluid color='green'>Guardar</Button>
                </Form>
                
            </Container>
        );
    }

    onAlumnoSelected(_id, matricula, nombre, carreraID){
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
        

        this.setState({idAlumno: _id, matriculaAlumno: matricula, nombreAlumno: nombre, carreraAlumno: carreraID, materiasAgrupadas: materiasAgrupadas});
    }

    cancel(){
        this.setState({idAlumno: '', matriculaAlumno: '', nombreAlumno: '', carreraAlumno: '', materiasAgrupadas: []});
    }

    onSave(materia){
        this.state.materiasCapturadas.push(materia);
        console.log(this.state.materiasCapturadas);
    }
}