import React, { Component } from 'react';
import { Container, Form, Button, Message } from 'semantic-ui-react';

export default class RegistroPago extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Container>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }

    handleSubmit(){
        this.setState({isSuccess: true});
    }
}