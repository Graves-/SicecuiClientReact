import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';


class Pagos extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <List.Item>
                <List.Icon name='money' />
                <List.Content>{this.props.concepto}</List.Content>
                <List.Content>{this.props.nombre}</List.Content>
                <List.Content floated='right'>
                    <Button color='blue'>Detalles</Button>
                </List.Content>
            </List.Item>
        );
    }
}

export default Pagos;