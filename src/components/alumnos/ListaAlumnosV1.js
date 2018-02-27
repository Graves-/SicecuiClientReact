import React, { Component } from 'react';
import {Table, Header, Input, Container, Button, Icon} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListaAlumnos extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchName: '',
            searchId: '',
            initialItems: [],
            items: []
        }
    }
    componentWillMount(){
        axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            this.setState({initialItems: response.data});
            this.setState({items: this.state.initialItems});
        }).catch((err)=> {
            console.log('error', err);
        });
    }

    render() {
        let listitems = this.state.items.map((item) => 
            <Table.Row key={item.id}>
                <Table.Cell>
                    {item.id}
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4' image>
                        <Header.Content>
                            {item.name}
                        <Header.Subheader>{item.email}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    {item.username}
                </Table.Cell>
                <Table.Cell>
                    {item.address.street}
                </Table.Cell>
                <Table.Cell>
                    {item.address.city}
                </Table.Cell>
                <Table.Cell>
                    <Link to={'/alumno/editar/' + item.id}><Button fluid color='teal'>Editar</Button></Link>
                    
                </Table.Cell>
            </Table.Row>
        );

        return (
            <Container text>
                <Input placeholder='Buscar Por Nombre' icon='search' value={this.state.searchName} onChange={this.searchNameChanged.bind(this)}/>
                <Input placeholder='Buscar Por ID' icon='search' value={this.state.searchId} onChange={this.searchIdChanged.bind(this)} style={{marginLeft: '10px'}}/>
                <Table celled collapsing striped sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Employee</Table.HeaderCell>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Street Address</Table.HeaderCell>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell>Acciones</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {listitems}
                    </Table.Body>
                </Table>
            </Container>
        );
    }

    searchNameChanged(event){
        this.setState({searchName: event.target.value});
        let updatedList = this.state.initialItems;
        updatedList = updatedList.filter((item) => {
            return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    }

    searchIdChanged(event){
        if(event.target.value === ''){
            this.setState({items: this.state.initialItems});
            this.setState({searchId: event.target.value});
        }else{
            this.setState({searchId: event.target.value});
            let updatedList = this.state.initialItems;
            updatedList = updatedList.filter((item) => {
                return item.id === parseInt(event.target.value, 10);
            });
            this.setState({items: updatedList});
        }
    }
}

export default ListaAlumnos;
