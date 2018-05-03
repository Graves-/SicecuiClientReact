import React, {Component} from 'react';
import config from '../../config';
import { Container, List, Card } from 'semantic-ui-react';

export default class ListaCursando extends Component {
    constructor(props){
        super(props);
        this.state = {
            kardex: []
        };
    }

    componentDidMount(){
        let url = `${config.baseUrl}/kardex`;
        if(this.props.filter){
            if(this.props.filter === 'CARRERA' && this.props.idCarrera){
                url = `${url}/findByCarrera/${this.props.idCarrera}`;
            }else if(this.props.filter === 'ALUMNO' && this.props.idAlumno){
                url = `${url}/findByAlumno/${this.props.idAlumno}`;
            }
        }
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({kardex: data});
        });
    }

    render(){
        return(
            <Container>
                <List>
                {this.state.kardex.length > 0 ? 
                    this.state.kardex.map((item, i) => {
                        return(
                            <List.Item key={i}>
                                <List.List>
                                    <List.Item>
                                        <List.Icon name='hashtag' />
                                        <List.Content><strong>Primer parcial:</strong> {item.PrimerParcial.toFixed(2)}</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='hashtag' />
                                        <List.Content><strong>Segundo parcial:</strong> {item.SegundoParcial.toFixed(2)}</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='hashtag' />
                                        <List.Content><strong>Tercer parcial:</strong> {item.TercerParcial.toFixed(2)}</List.Content>
                                    </List.Item>
                                </List.List>
                            </List.Item>
                        );
                    })
                :
                    <Card fluid><Card.Content><h2>No tiene materias inscritas.</h2></Card.Content></Card>
                }
                </List>
            </Container>
        );
    }
}