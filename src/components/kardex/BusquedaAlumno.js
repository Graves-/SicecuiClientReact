import React, { Component } from 'react';
import { Container, Input, List, Button, Icon } from 'semantic-ui-react';
import config from '../../config';

export default class AsignacionMateria extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            alumnos: [],
            filtered: []
        }
    }

    componentDidMount(){
        if(this.props.itemsAlumnos === undefined){
            this.getAlumnos();
        }else{
            this.setState({alumnos: this.props.itemsAlumnos});
        }
    }

    render(){
        return(
            <Container>
                <Input fluid icon='search' iconPosition='left' placeholder='Buscar alumno...' loading={this.state.isLoading} onChange={this.searchAlumno.bind(this)} />
                <List divided relaxed>
                    {this.state.filtered.map((item, i) => {
                        return(
                            <List.Item key={i}>
                                <List.Content floated='left'>
                                    <List.Icon name='user circle' size='large' verticalAlign='middle' />
                                </List.Content>
                                <List.Content floated='right'>
                                    {this.props.source === 'KARDEX' ? <Button color='orange' onClick={this.alumnoSelected.bind(this, item._id, item.Matricula, `${item.Nombre} ${item.ApellidoPaterno} ${item.ApellidoMaterno}`, item.CarreraID)}><Icon name='browser' /> Ver Kardex</Button> : <Button color='linkedin' onClick={this.alumnoSelected.bind(this, item._id, item.Matricula, `${item.Nombre} ${item.ApellidoPaterno} ${item.ApellidoMaterno}`, item.CarreraID)}><Icon name='add' /> Asignar Materia</Button>}
                                    
                                </List.Content>
                                <List.Content>
                                    <List.Header as='a'>{`${item.Nombre} ${item.ApellidoPaterno} ${item.ApellidoMaterno}`}</List.Header>
                                    <List.Description as='a'>{item.Matricula}</List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>
            </Container>
        );
    }

    searchAlumno(e){
        let input = e.target.value;
        if(input === '') { this.setState({isLoading: false, filtered: []}); } else { this.setState({isLoading: true}); }
        let filter = this.state.alumnos.filter((item, i) => {
            return item.Matricula.toLowerCase().includes(input.toLowerCase()) || item.Nombre.toLowerCase().includes(input.toLowerCase()) || item.ApellidoPaterno.toLowerCase().includes(input.toLowerCase()) || item.ApellidoMaterno.toLowerCase().includes(input.toLowerCase());
        });
        setTimeout(() => {
            if(input === '') { this.setState({isLoading: false, filtered: []}); }
            else{ this.setState({isLoading: false, filtered: filter}); }
        }, 1000);
    }

    alumnoSelected(_id, matricula, nombre, carreraID){
        this.props.onAlumnoSelected(_id, matricula, nombre, carreraID);
    }

    getAlumnos(){
        fetch(`${config.baseUrl}/alumnos`).then((res)=> {
            return res.json();
        }).then((data) => {
            this.setState({alumnos: data});
        }).catch((err) => {
            console.log('hubo un error al obtener alumnos.', err);
        });
    }
}