import React, { Component } from 'react';
import BusquedaAlumno from './BusquedaAlumno';
import ListaCursando from './ListaCursando';
import { Container, Header, Icon, Card, Button } from 'semantic-ui-react';

export default class KardexAlumno extends Component {
    constructor(props){
        super(props);
        this.state = {
            idAlumno: '',
            matriculaAlumno: '',
            nombreAlumno: '',
            carreraAlumno: ''
        };
    }
    render(){
        return(
            <Container>
                <Header size='huge'><Icon name='browser' /> Kardex de Alumno</Header>
                {this.state.idAlumno === '' ?
                    <Card fluid raised>
                        <Card.Content>
                            <BusquedaAlumno onAlumnoSelected={this.onAlumnoSelected.bind(this)} source='KARDEX' />
                        </Card.Content>
                    </Card>
                    : 
                    <Button color='red' floated='right' onClick={this.onCancel.bind(this)}><Icon name='close' /> Cancelar</Button>
                }
                {this.state.idAlumno !== '' ? <ListaCursando filter='ALUMNO' idAlumno={this.state.idAlumno} /> : <h4>Selecciona un alumno de la lista para mostar su kardex.</h4> }
                
            </Container>
        );
    }

    onAlumnoSelected(_id, matricula, nombre, carreraID){
        this.setState({idAlumno: _id, matriculaAlumno: matricula, nombreAlumno: nombre, carreraAlumno: carreraID});
    }

    onCancel(){
        this.setState({idAlumno: '', matriculaAlumno: '', nombreAlumno: '', carreraAlumno: ''});
    }
}