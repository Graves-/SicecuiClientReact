import React, { Component } from 'react';
import { Form, Icon, Header, Container } from 'semantic-ui-react';

class RegistroMaestro extends Component {
    constructor(props){
        super(props);
        this.state = {
            estados: []
        };
    }
    render() {
        return (
            <Container text>
                <Header size='large'>Large Header</Header>
                <Form onSubmit={this.formSubmit.bind(this)}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Nombre' placeholder='Nombre' value={this.state.nombre} onChange={this.nombreChanged.bind(this)} />
                        <Form.Input fluid label='Apellido Paterno' placeholder='Paterno' value={this.state.apePat} onChange={this.apPatChanged.bind(this)}/>
                        <Form.Input fluid label='Apellido Materno' placeholder='Materno' value={this.state.apeMat} onChange={this.apMatChanged.bind(this)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Teléfono' placeholder='Teléfono' icon="phone" type="number" value={this.state.tel} onChange={this.telChanged.bind(this)}/>
                        <Form.Input fluid label='Correo Electrónico' placeholder='Correo' icon='mail' type="email" value={this.state.correo} onChange={this.correoChanged.bind(this)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='CURP' placeholder='CURP' icon="id card" value={this.state.curp} onChange={this.curpChanged.bind(this)} />
                        <Form.Input fluid label='Dirección' placeholder='Dirección' icon='home' value={this.state.dir} onChange={this.dirChanged.bind(this)}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Estado' options={this.state.estados} placeholder='Selecciona Estado' onChange={this.estadoChanged.bind(this)} />
                        <Form.Select fluid label='Municipio' options={this.state.municipios} placeholder='Selecciona Municipio' onChange={this.munChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Carrera' options={carreras} placeholder='Selecciona Carrera' onChange={this.carreraChanged.bind(this)} />
                        <Form.Select fluid label='Cuatrimestre' options={cautrimestre} placeholder='Selecciona Cuatrimestre' onChange={this.cuatChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Turno' options={turnos} placeholder='Selecciona Turno' onChange={this.turnoChanged.bind(this)} />
                        <Form.Select fluid label='Estatus' options={estatuses} placeholder='Selecciona Estatus' onChange={this.estatusChanged.bind(this)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Bachillerato' placeholder='Bachillerato' icon="book" value={this.state.bach} onChange={this.bachChanged.bind(this)}/>
                        <Form.Select fluid label='¿Cómo te enteraste?' options={medios} placeholder='Selecciona Medio' onChange={this.mediosChanged.bind(this)} />
                    </Form.Group>
                    <FormGroup widths='equal'>
                        <Form.Checkbox label='Trabaja?' onChange={this.trabajaChanged.bind(this)} />
                        {Trabaja}
                    </FormGroup>

                    <Form.Button><Icon name='add user' />Inscribir</Form.Button>
                </Form>
            </Container>
        );
    }

    componentDidMount(){
        this.fillEdos();
    }

    fillEdos(){
        axios.get('http://datamx.io/dataset/73b08ca8-e955-4ea5-a206-ee618e26f081/resource/9c5e8302-221c-46f2-b9f7-0a93cbe5365b/download/estados.json').then((response) => {
            let arrayEstados = [];
            let count = 0;
            response.data.forEach(estado => {
                arrayEstados.push({
                    key: count++,
                    value: estado.id,
                    text: estado.name
                });
            });
            this.setState({
                estados: arrayEstados
            });
        }).catch((err) => {
            alert('error al obtener estados ' + err);
        });
    }
}

export default RegistroMaestro;
