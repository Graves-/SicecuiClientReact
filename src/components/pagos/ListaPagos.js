import React, { Component } from 'react';
import { Container, List, Input } from 'semantic-ui-react';
import ListItemPagos from './ListItemPagos';
import _ from 'lodash';
import config from '../../config';
import axios from 'axios';

class Pagos extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            searchInput: ''
        }
    }

    render(){
        let filtered = this.props.items.filter( (pago) => {
            if(this.state.searchInput === '') return true;
            const re = new RegExp(_.escapeRegExp(this.state.searchInput), 'i');
            return re.test(pago.Concepto) || re.test(pago.Matricula) || re.test(pago.Nombre + ' ' + pago.ApellidoPaterno + ' ' + pago.ApellidoMaterno);
        });
        const Lista = filtered.map((pago, index) => 
            <ListItemPagos
                key={index}
                folio={pago.folio}
                concepto={pago.Concepto}
                nombre={pago.Nombre + ' ' + pago.ApellidoPaterno + ' ' + pago.ApellidoMaterno}
                cantidad={'$ '+pago.CantidadNum+'.00  ,  ' + pago.CantidadLetra}
                matricula={pago.Matricula}
                fecha={pago.Dia + ' / ' + pago.Mes + ' / ' + pago.Anio}
                modo={pago.ModoPago !== undefined ? pago.ModoPago : 'SIN MODO DE PAGO.'}
            />
        );

        return(
            <Container fluid>
                <Input fluid loading={this.state.isLoading} placeholder='Buscar' icon='search' onChange={this.handleSearchInput.bind(this)} />
                <List celled verticalAlign='middle'>
                    {Lista}
                </List>
            </Container>
        );
    }

    handleSearchInput(e, {value}){
        this.setState({isLoading: true, searchInput: value});

        setTimeout(() => {
            this.setState({
                isLoading: false,
                searchInput: value
            });
        }, 500);
    }
}

export default Pagos;