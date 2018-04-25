import React, { Component } from 'react';
import { Container, Header, Icon, Card } from 'semantic-ui-react';
//import axios from 'axios';

export default class RegistroGrupos extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount(){
        fetch('https://sicecui-ws.herokuapp.com/maestros').then((response) => {
            return response.json();
        }).then((data) => {
            console.log('fecth');
            console.log(data);
        })
    }

    render(){
        return(
            <Container>
                <Header><Icon name='info circle'/> Información del Maestro</Header>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                        Steve Sanders
                        </Card.Header>
                        <Card.Meta>
                        Friends of Elliot
                        </Card.Meta>
                        <Card.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Container>
        );
    }
}