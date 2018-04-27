import React, { Component } from 'react';
import config from '../../config';
import { Input } from 'semantic-ui-react';

export default class BusquedaCarrera extends Component {
    constructor(props){
        super(props);
        this.state = {
            carreras: [],
            materias: []
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
            <div>
                <Input fluid icon='search' iconPosition='left' placeholder='Buscar materia...' />
            </div>
        )
    }

    searchMateriaFromInput(){

    }
}