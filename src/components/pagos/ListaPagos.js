import React, { Component } from 'react';
import { Container, List, Search, Header } from 'semantic-ui-react';
import ListItemPagos from './ListItemPagos';
import _ from 'lodash';

class Pagos extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            items: []
        }
    }
    componentWillMount(){
        this.resetComponent();
    }
    render(){
        const { isLoading, value, results } = this.state;
        let Lista;

        console.log('render', results);

        if(this.state.results.length > 0){
            console.log('results.length > 0');
            Lista = this.state.results.map((pago, index) => {
                <ListItemPagos
                    style={{cursor: 'pointer'}}
                    key={index}
                    concepto={pago.Concepto}
                    nombre={pago.Nombre + ' ' + pago.ApellidoPaterno + ' ' + pago.ApellidoMaterno}
                />
            });
        }else{
            console.log('results.length <= 0');
            Lista = this.props.items.map((pago, index) => 
                <ListItemPagos
                    style={{cursor: 'pointer'}}
                    key={index}
                    concepto={pago.Concepto}
                    nombre={pago.Nombre + ' ' + pago.ApellidoPaterno + ' ' + pago.ApellidoMaterno}
                />
            );
        }

        return(
            <Container fluid>
                <Search
                    fluid
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect.bind(this)}
                    onSearchChange={this.handleSearchChange.bind(this)}
                    results={results}
                    value={value}
                    {...this.props}
                />
                <List divided verticalAlign='middle'>
                    {Lista}
                </List>
                
                <Header>State</Header>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <Header>Options</Header>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </Container>
        );
    }

    resetComponent(){
        this.setState({ isLoading: false, results: [], value: '', items: this.props.items });
    }

    handleResultSelect(e, {result}){
        console.log('selected', this.state.results);
        this.setState({value: result.title});
    }

    handleSearchChange(e, {value}){
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if(this.state.value.length < 1) return this.resetComponent();
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.Concepto);

            this.setState({
                isLoading: false,
                results: _.filter(this.props.items, isMatch)
            });
        }, 500);
    }

}

export default Pagos;