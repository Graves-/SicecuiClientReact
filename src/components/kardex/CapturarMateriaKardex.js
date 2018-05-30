import React, {Component} from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import swal from 'sweetalert2';

export default class CapturaKardex extends Component {
    constructor(props){
        super(props);
        this.state = {
            primero: 0,
            segundo: 0,
            tercero: 0,
            promedio: 0,
            errorPrimero: false,
            errorSegundo: false,
            errorTercero: false,
            saved: false
        }
        this.handlePrimero = this.handlePrimero.bind(this);
        this.handleSegundo = this.handleSegundo.bind(this);
        this.handleTercero = this.handleTercero.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    render(){
        return(
            <div>
                {
                    !this.state.saved ?
                    <div style={{paddingLeft: 15, paddingRight: 15}}>
                        <Header>{`${this.props.nombreMat} - ${this.props.idMateria}`}</Header>
                        <Form.Group>
                            <Form.Input label='Primer Parcial' placeholder='Primer Parcial' width={3} className='parcialInput' name={`1_${this.props.idMateria}`} type='number' value={this.state.primero} onChange={this.handlePrimero} error={this.state.errorPrimero}/>
                            <Form.Input label='Segundo Parcial' placeholder='Segundo Parcial' width={3} className='parcialInput' name={`2_${this.props.idMateria}`} type='number' value={this.state.segundo} onChange={this.handleSegundo} error={this.state.errorSegundo}/>
                            <Form.Input label='Tercer Parcial' placeholder='Tercer Parcial' width={3} className='parcialInput' name={`3_${this.props.idMateria}`} type='number' value={this.state.tercero} onChange={this.handleTercero} error={this.state.errorTercero}/>
                            <Form.Input label='Promedio' placeholder='Promedio' width={3} className='promedioInput' name={`4_${this.props.idMateria}`} readOnly value={this.state.promedio} />
                            <Form.Button label='' color='blue' width={4} onClick={this.onSave}>Guardar</Form.Button>
                        </Form.Group>
                    </div>
                    :
                    null
                }
            </div>
        );
    }

    handlePrimero(e){
        let promedio = this.calcularPromedio(e.target.value, this.state.segundo, this.state.tercero);
        if(e.target.value < 10 || e.target.value > 100){
            this.setState({primero: e.target.value, promedio: promedio, errorPrimero: true});
        }else{
            this.setState({primero: e.target.value, promedio: promedio, errorPrimero: false});
        }
        
    }

    handleSegundo(e){
        let promedio = this.calcularPromedio(this.state.primero, e.target.value, this.state.tercero);
        if(e.target.value < 10 || e.target.value > 100){
            this.setState({segundo: e.target.value, promedio: promedio, errorSegundo: true});
        }else{
            this.setState({segundo: e.target.value, promedio: promedio, errorSegundo: false});
        }
        
    }

    handleTercero(e){
        let promedio = this.calcularPromedio(this.state.primero, this.state.segundo, e.target.value);
        if(e.target.value < 10 || e.target.value > 100){
            this.setState({tercero: e.target.value, promedio: promedio, errorTercero: true});
        }else{
            this.setState({tercero: e.target.value, promedio: promedio, errorTercero: false});
        }
        
    }

    calcularPromedio(primero, segundo, tercero) {
        return ((parseInt(primero) + parseInt(segundo) + parseInt(tercero)) / 3).toFixed(2);
    }

    onSave(){
        if(!this.state.errorPrimero && !this.state.errorSegundo && !this.state.errorTercero){
            this.props.onSave({
                primero: this.state.primero,
                segundo: this.state.segundo,
                tercero: this.state.tercero,
                promedio: this.state.promedio,
                idMateria: this.props.idMateria,
                nombre: this.props.nombreMat
            });
            this.setState({saved: true});
        }else{
            swal('Error', 'La materia tiene por lo menos una calificación inválida. Favor de verificar.', 'error');
        }
    }
    
}