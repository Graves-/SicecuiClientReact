import React, { Component } from 'react';

class EditarAlumno extends Component {

    constructor(props){
        super(props);
        this.state = {
            idAlumno: 0
        }
    }

    componentWillMount(){
        this.setState({idAlumno: this.props.match.params.id});
    }

    render() {
        return (<h1>Hola, {this.state.idAlumno}</h1>);
    }
}

export default EditarAlumno;
