import React, { Component } from 'react';
import { Container, Header, Icon, Card } from 'semantic-ui-react';

export default class RegistroGrupos extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataMaestro: this.props.detalles
        }
    }

    render(){
        let infoPanel = (
            <Header>Selecciona un maestro de la lista.</Header>
        );
        if(this.props.detalles._id !== undefined){
            infoPanel = (
                <div>
                    <Header><Icon name='info circle'/> Información del Maestro</Header>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                {this.props.detalles.Nombre + ' ' + this.props.detalles.ApellidoPaterno + ' ' + this.props.detalles.ApellidoMaterno}
                            </Card.Header>
                            <Card.Meta>
                                {this.props.detalles.Email}
                            </Card.Meta>
                            <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            );
        }

        
        return(
            <Container>
                {infoPanel}
            </Container>
        );
    }
}