import React, {Component} from 'react';
import {Grid, Header, Form, Segment, Message, Button} from 'semantic-ui-react';
import firebase from 'firebase';
import { Redirect } from "react-router-dom";

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            password: '',
            showErrorMsg: false,
            redirect: false
        }

        
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className='login-form'>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    {' '}Log-in to your account
                    </Header>
                    <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail address'
                        value={this.state.user}
                        onChange={(e) => { this.setState({user: e.target.value})}}
                        />
                        <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        value={this.state.password}
                        onChange={(e) => { this.setState({password: e.target.value})}}
                        />

                        <Button color='teal' fluid size='large' onClick={this.loginClicked.bind(this)}>Login</Button>
                    </Segment>
                    </Form>
                    <Message>
                        New to us? <a href=''>Sign Up</a>
                    </Message>
                    { this.state.showErrorMsg === true ? <Message error>Usuario o contraseña incorrectos.</Message> : <div></div> }
                    { this.state.redirect === true ? <Redirect to='/maestro/lista' /> : null}
                </Grid.Column>
                </Grid>
            </div>
        );
    }

    loginClicked(){
        const context = this;
        firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.password).then(() => {
            context.setState({showErrorMsg: false, redirect: true});
        }).catch((err) => {
            if(err){
                console.log(err);
                context.setState({showErrorMsg: true, redirect: false});
            }
        });
    }
}