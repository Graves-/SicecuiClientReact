import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react';

export default class SignUp extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid verticalAlign='middle' textAlign='center'>
                <Form onSubmit={this.formSubmit.bind(this)}>
                    <Form.Field>
                        <Form.Input fluid label='Correo Electrónico' placeholder='micorreo@ejemplo.com' />
                    </Form.Field>
                </Form>
            </Grid>
        );
    }

    formSubmit(){
        console.log('Form submit!');
    }
}