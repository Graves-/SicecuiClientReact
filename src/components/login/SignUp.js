import React, { Component } from 'react';
import { Form, Container, Icon, Card, Header, Message, Button } from 'semantic-ui-react';
import firebase from 'firebase';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            showPasswordMessage: false,
            weakPasswordMessage: false,
            emailInUse: false,
            formIsLoading: false
        }
    }

    render(){
        return(
            <Container text>
                <Header textAlign='center'>Registro de Usuario</Header>
                <Card fluid raised>
                    <Card.Content>
                        <Form onSubmit={this.formSubmit.bind(this)} loading={this.state.formIsLoading}>
                            <Form.Field>
                                <Form.Input fluid type='email' icon='mail' iconPosition='left' label='Correo Electrónico' placeholder='micorreo@ejemplo.com' value={this.state.email} onChange={(e) => { this.setState({email: e.target.value})}} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid type='password' icon='lock' iconPosition='left' label='Contraseña' placeholder='Contraseña' value={this.state.password} onChange={(e) => { this.setState({password: e.target.value})}} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input fluid type='password' icon='lock' iconPosition='left' label='Confirmar Contraseña' placeholder='Confirmar Contraseña' value={this.state.confirmPassword} onChange={(e) => { this.setState({confirmPassword: e.target.value})}} />
                            </Form.Field>
                            <Form.Button fluid floated='right' color='green' > <Icon name='sign in' />  Registrarme</Form.Button>
                        </Form>
                    </Card.Content>
                    <Card.Content>
                    <a href='/login' style={{marginBottom: '25px'}} ><Button fluid color='instagram'>Ya tengo cuenta.</Button></a>
                    </Card.Content>
                </Card>
                {this.state.showPasswordMessage ? <Message color='red'>Las contraseñas ingresadas no coinciden.</Message> : null}
                {this.state.weakPasswordMessage ? <Message color='red'>La contraseña es débil. Debe contener al menos 6 caracteres.</Message> : null}
                {this.state.emailInUse ? <Message color='red'>El correo electrónico ingresado ya se encuentra en uso.</Message> : null}
            </Container>
        );
    }

    formSubmit(e){
        e.preventDefault();
        this.setState({formIsLoading: true});

        if(this.state.password !== this.state.confirmPassword){
            this.setState({showPasswordMessage: true, formIsLoading: false});
        }else{
            this.setState({showPasswordMessage: false});
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((err) => {
                console.log(err);
                if(err.code === 'auth/weak-password'){ this.setState({weakPasswordMessage: true}); } 
                if(err.code === 'auth/email-already-in-use'){ this.setState({emailInUse: true}); }
            }).then(() => {
                this.setState({formIsLoading: false});
            });
        }
    }
}