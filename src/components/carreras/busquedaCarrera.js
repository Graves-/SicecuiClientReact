import React, { Component } from 'react';
import config from '../../config';
import { Input, List, Button, Icon, Header } from 'semantic-ui-react';

export default class BusquedaCarrera extends Component {
    constructor(props){
        super(props);
        this.state = {
            carreras: [],
            materias: [],
            filtered: [],
            isLoading: false,
            materiaSelected: ''
        }
    }

    componentDidMount() {
        fetch(`${config.baseUrl}/carreras`).then((res) => {
            return res.json();
        }).then((data) => {
            let objArrayMaterias = [];
            let arrayMaterias = [];
            if(data){
                objArrayMaterias = data.map((item, i) => {
                    return item.Materias;
                });
                objArrayMaterias.forEach((item) => {
                    item.forEach((materia) => {
                        arrayMaterias.push(materia);
                    })
                })
            }
            this.setState({carreras: data, materias: arrayMaterias});
        }).catch((err) => {
            console.log('error al obtener carreras ', err);
        })
    }

    render(){
        return(
            <div style={{marginTop: '15px'}}>
                <Header><Icon name='info circle'/> Seleccionar Materia</Header>
                <Input fluid icon='search' iconPosition='left' placeholder='Buscar materia...' loading={this.state.isLoading} onChange={this.searchMateriaFromInput.bind(this)} />
                <List divided verticalAlign='middle'>
                    {this.state.filtered.map((materia, i) => {
                        return (
                            <List.Item key={i}>
                                <List.Content floated='right'>
                                    <Button color='red' onClick={this.onMateriaSelected.bind(this, materia.MateriaID, 'A', materia.Nombre)}><Icon name='add' /> Matutino</Button>
                                    <Button color='green' onClick={this.onMateriaSelected.bind(this, materia.MateriaID, 'B', materia.Nombre)}><Icon name='add' /> Vespertino</Button>
                                    <Button color='blue' onClick={this.onMateriaSelected.bind(this, materia.MateriaID, 'C', materia.Nombre)}><Icon name='add' /> Sabatino</Button>
                                </List.Content>
                                <List.Content>
                                    <List.Header>{materia.Nombre}</List.Header>
                                    <List.Description>{materia.MateriaID}</List.Description>
                                </List.Content>
                            </List.Item>
                        )
                    })}
                </List>
            </div>
        )
    }

    searchMateriaFromInput(e){
        let input = e.target.value;
        if(input === '') { this.setState({isLoading: false, filtered: []}); } else { this.setState({isLoading: true}); }
        let filter = this.state.materias.filter((item, i) => {
            return item.Nombre.toLowerCase().includes(input.toLowerCase()) || item.MateriaID.toLowerCase().includes(input.toLowerCase());
        });
        setTimeout(() => {
            if(input === '') { this.setState({isLoading: false, filtered: []}); }
            else{ this.setState({isLoading: false, filtered: filter}); }
        }, 1000);
    }

    onMateriaSelected(id, turno, nombre){
        this.props.onMateriaSelected(id, turno, nombre);
        this.setState({materiaSelected: id});
    }
}