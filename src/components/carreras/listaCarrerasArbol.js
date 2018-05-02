import React, { Component } from 'react';
import { Container, List } from 'semantic-ui-react';
import config from '../../config';

export default class ListaCarrerasArbol extends Component {
    constructor(props){
        super(props);
        this.state = {
            carreras: []
        }
    }

    componentDidMount() {
        fetch(`${config.baseUrl}/carreras`).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({carreras: data});
        }).catch((err) => {
            console.log('error al obtener carreras ', err);
        })
    }

    render(){
        return(
            <Container>    
                <List>         
                {
                    this.state.carreras.map((item, i) => {
                        return (
                            <List.Item key={i} onClick={this.itemClickHandler.bind(this, item)}> 
                                <List.Content>
                                    <List.Header style={{fontSize: '18pt'}}><List.Icon name='book' /> {`${item.CarreraID} - ${item.Nombre}`}</List.Header>
                                    <List.List>
                                        {item.Materias.map((materia, i) => {
                                            let DescSeriacion;
                                            if(materia.Seriacion !== ''){
                                                DescSeriacion = <List.Description><List.Icon name='sitemap' /> {`Seriación: ${materia.Seriacion}`}</List.Description>;
                                            }
                                            return (
                                                <List.Item key={i}>
                                                    <List.Icon name='folder' />
                                                    <List.Content>
                                                        <List.Header>{`${materia.MateriaID} - ${materia.Nombre}`}</List.Header>
                                                        <List.List>
                                                            <List.Description><List.Icon name='hashtag' /> {`Cuatrimestre: ${materia.CuatrimestreID}`}</List.Description>
                                                            <List.Description><List.Icon name='checkmark box' /> {`Creditos: ${materia.Creditos}`}</List.Description>
                                                            { DescSeriacion }
                                                        </List.List>
                                                    </List.Content>
                                                </List.Item>
                                            )
                                        })}
                                    </List.List>
                                </List.Content>
                            </List.Item>
                        )
                    })
                }
                </List>
            </Container>
        );
    }

    itemClickHandler(item){
        console.log(item);
    }
}