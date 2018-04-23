import React from 'react';
import { Card, List  } from 'semantic-ui-react';

const DetallesAlumno = (props) => {
    return(
        <Card raised fluid>
            <Card.Content>
                <Card.Header>
                    {`${props.alumno.Nombre} ${props.alumno.ApellidoPaterno} ${props.alumno.ApellidoMaterno}`}
                </Card.Header>
                <Card.Description>
                    <List>
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Content>
                                {props.alumno.CURP}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='mail' />
                            <List.Content>
                                {props.alumno.Email}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='book' />
                            <List.Content>
                                {props.alumno.CarreraID}
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default DetallesAlumno;