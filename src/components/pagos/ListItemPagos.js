import React, { Component } from 'react';
import { List, Button, Grid } from 'semantic-ui-react';
import config from '../../config';


class Pagos extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <List.Item>
                <Grid style={{marginTop: '5px', marginBottom: '5px'}}>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <List.Content>
                                {this.props.concepto}
                            </List.Content>
                            <List.Content>
                                <List.Icon name='user circle' />
                                {this.props.nombre}
                            </List.Content>
                            <List.Content>
                                <List.Icon name='calendar' />
                                {this.props.fecha}
                            </List.Content>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <List.Content>
                                <List.Icon name='money' />
                                {this.props.cantidad}
                            </List.Content>
                            <List.Content>
                                <List.Icon name='id card outline' />
                                {this.props.matricula}
                            </List.Content>
                            <List.Content>
                                <List.Icon name='exchange' />
                                {this.props.modo}
                            </List.Content>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List.Content>
                                <Button.Group vertical>
                                    <a href={config.baseUrl+`/pagos/recibo/${this.props.folio}`} target="_blank"><Button color='green'>Imprimir Recibo</Button></a>
                                </Button.Group>
                            </List.Content>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                
                
            </List.Item>
        );
    }
}

export default Pagos;