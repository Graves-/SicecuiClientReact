import React, {Component} from 'react';
import { Form, Header } from 'semantic-ui-react';


export default class CapturaKardex extends Component {
    constructor(props){
        super(props);
        this.state = {
            primero: 0,
            segundo: 0,
            tercero: 0,
            promedio: 0
        }
        this.handlePrimero = this.handlePrimero.bind(this);
        this.handleSegundo = this.handleSegundo.bind(this);
        this.handleTercero = this.handleTercero.bind(this);
    }

    render(){
        return(
            <div style={{paddingLeft: 15, paddingRight: 15}}>
                <Header>{`${this.props.nombreMat} - ${this.props.idMateria}`}</Header>
                <Form.Group>
                    <Form.Input label='Primer Parcial' placeholder='Primer Parcial' width={4} className='parcialInput' name={`1_${this.props.idMateria}`} type='number' value={this.state.primero} onChange={this.handlePrimero} />
                    <Form.Input label='Segundo Parcial' placeholder='Segundo Parcial' width={4} className='parcialInput' name={`2_${this.props.idMateria}`} type='number' value={this.state.segundo} onChange={this.handleSegundo}/>
                    <Form.Input label='Tercer Parcial' placeholder='Tercer Parcial' width={4} className='parcialInput' name={`3_${this.props.idMateria}`} type='number' value={this.state.tercero} onChange={this.handleTercero}/>
                    <Form.Input label='Promedio' placeholder='Promedio' width={4} className='promedioInput' name={`4_${this.props.idMateria}`} readOnly value={this.state.promedio} />
                </Form.Group>
                <pre>{JSON.stringify({
                    1: this.state.primero,
                    2: this.state.segundo,
                    3: this.state.tercero
                })}</pre>
            </div>
        );
    }

    handlePrimero(e){
        let promedio = this.calcularPromedio(e.target.value, this.state.segundo, this.state.tercero);
        this.setState({primero: e.target.value, promedio: promedio});
    }

    handleSegundo(e){
        let promedio = this.calcularPromedio(this.state.primero, e.target.value, this.state.tercero);
        this.setState({segundo: e.target.value, promedio: promedio});
    }

    handleTercero(e){
        let promedio = this.calcularPromedio(this.state.primero, this.state.segundo, e.target.value);
        this.setState({tercero: e.target.value, promedio: promedio});
    }

    calcularPromedio(primero, segundo, tercero) {
        return (primero + segundo + tercero);
    }
    
}