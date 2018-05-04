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
                    <Button color='red' size='tiny' floated='right' onClick={this.onCancel.bind(this)} style={{marginBottom: '25px'}}><Icon name='close' /> Cancelar</Button>
                }
                {this.state.idAlumno !== '' ? 
                    <Card fluid>
                        <Card.Content header={<Header><Icon name='info' /> Información del Alumno </Header>} />
                        <Card.Content description={this.state.matriculaAlumno}>
                            <Icon name='user circle outline' />
                            <strong>Nombre: </strong> {this.state.nombreAlumno}
                        </Card.Content>
                        <Card.Content description>
                            <Icon name='user' />
                            <strong>Matrícula: </strong> {this.state.matriculaAlumno}
                        </Card.Content>
                        <Card.Content description>
                            <Icon name='graduation' />
                            <strong>Carrera: </strong> {this.state.carreraAlumno}
                        </Card.Content>
                    </Card> :
                    null
                }
                <Card fluid>
                    <Card.Content header='Materias' />
                    <Card.Content>
                        {this.state.idAlumno !== '' ? <ListaCursando filter='ALUMNO' idAlumno={this.state.idAlumno} /> : <h4>Selecciona un alumno de la lista para mostar su kardex.</h4> }
                    </Card.Content>
                </Card>
                
                
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