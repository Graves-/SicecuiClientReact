import React, {Component} from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';

export default class ConfirmGrupo extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        let nombreTurno;

        switch(this.props.turno){
            case 'A': nombreTurno = 'Matutino'; break;
            case 'B': nombreTurno = 'Vespertino'; break;
            case 'C': nombreTurno = 'Sabatino'; break;
            default: nombreTurno = 'Matutino'; break;
        }
        return(
            <Segment color='green'>
                <Header><Icon name='checkmark box' /> Confirmar Asignación de Grupo</Header>
                <p><strong><Icon name='user' /> Maestro: </strong> {`${this.props.maestro.Nombre} ${this.props.maestro.ApellidoPaterno} ${this.props.maestro.ApellidoMaterno}`}</p>
                <p><strong><Icon name='book' /> Materia: </strong> {this.props.materia}</p>
                <p><strong><Icon name='time' /> Turno: </strong> {nombreTurno}</p>

                <Button onClick={this.props.onConfirm} fluid color='green'><Icon name='check' /> Confirmar</Button>
            </Segment>
        ); 
    }
}