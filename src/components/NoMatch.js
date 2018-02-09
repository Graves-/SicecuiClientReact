import React, { Component } from 'react';
import { Header, Icon, Container } from 'semantic-ui-react';

class EditarAlumno extends Component {
    render() {
        return (
            <Container text textAlign='center'>
                <Header as='h2' icon>
                    <Icon name='question circle outline' />
                    Oops!
                    <Header.Subheader>
                    Página no encontrada!
                    </Header.Subheader>
                </Header>
            </Container>
        );
    }
}

export default EditarAlumno;
