import React, { Component } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import ListaPagos from './ListaPagos';
import axios from 'axios';
import config from '../../config';


class Pagos extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            pagos: []
        }
    }
    componentWillMount(){
        this.GetPagos(0);
    }

    render(){
        const panes = [
            {
                menuItem: 'Todos', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={this.state.pagos}></ListaPagos>
                    </Tab.Pane>
                ),
                anio: 0
            },
            {
                menuItem: '2016 y Anteriores', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={this.state.pagos}></ListaPagos>
                    </Tab.Pane>
                ),
                anio: 2016
            },
            {
                menuItem: '2017', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={this.state.pagos}></ListaPagos>
                    </Tab.Pane>
                ),
                anio: 2017
            },
            {
                menuItem: '2018 y Después', 
                render: () => (
                    <Tab.Pane>
                        <ListaPagos items={this.state.pagos}></ListaPagos>
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
        this.GetPagos(data.panes[data.activeIndex].anio)
    }

    GetPagos(anio){
        switch(anio){
            case 0: {
                axios.get(`${config.baseUrl}/pagos`).then((res) => {
                    res.data.map((pago, index) => {
                        pago.title = pago.Concepto + " - " + pago.Dia + "/"+pago.Mes+"/"+pago.Anio;
                        pago.description = pago.Nombre + " " + pago.ApellidoPaterno + " " + pago.ApellidoMaterno;
                        pago.price = "$" + pago.CantidadNum + ".00";
                    });
                    this.setState({pagos: res.data});
                }).catch((err) => {
                    console.log(err);
                });
                break;
            }
            default: {
                axios.get(`${config.baseUrl}/pagos/${anio}`).then((res) => {
                    res.data.map((pago, index) => {
                        pago.title = pago.Concepto + " - " + pago.Dia + "/"+pago.Mes+"/"+pago.Anio;
                        pago.description = pago.Nombre + " " + pago.ApellidoPaterno + " " + pago.ApellidoMaterno;
                        pago.price = "$" + pago.CantidadNum + ".00";
                    });
                    this.setState({pagos: res.data});
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
}

export default Pagos;