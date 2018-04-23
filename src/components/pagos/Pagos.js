import React, { Component } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import ListaPagos from './ListaPagos';
import axios from 'axios';
import config from '../../config';


class Pagos extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            pagos: [],
            selectedAnio: 0
        }
    }
    componentWillMount(){
        this.GetPagos();
    }

    render(){
        let filteredPagos = this.state.pagos.filter( (pago) => {
            if(this.state.selectedAnio === 0){
                return true;
            } else{
                return pago.Anio === this.state.selectedAnio
            }
            
        });
        const panes = [
            {
                menuItem: 'Todos', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={filteredPagos}></ListaPagos>
                    </Tab.Pane>
                ),
                anio: 0
            },
            {
                menuItem: '2016 y Anteriores', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={filteredPagos}></ListaPagos>
                    </Tab.Pane>
                ),
                anio: 2016
            },
            {
                menuItem: '2017', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={filteredPagos}></ListaPagos>
                    </Tab.Pane>
                ),
                anio: 2017
            },
            {
                menuItem: '2018 y Después', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={filteredPagos}></ListaPagos>
                    </Tab.Pane>
                ),
                anio: 2018
            }
        ]
        return(
            <Container fluid style={{padding: '15px'}}>
                <h1>Pagos</h1>
                <Tab defaultActiveIndex={0} panes={panes} menu={{ secondary: true, pointing: true }} onTabChange={this.handleTabChange.bind(this)}></Tab>
            </Container>
        );
    }

    handleTabChange(e, data){
        this.setState({ selectedAnio: data.panes[data.activeIndex].anio});
    }

    GetPagos(){
        axios.get(`${config.baseUrl}/pagos`).then((res) => {
            this.setState({pagos: res.data});
        }).catch((err) => {
            console.log(err);
        });
    }
}

export default Pagos;