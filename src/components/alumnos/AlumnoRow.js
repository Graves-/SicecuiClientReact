import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

const AlumnoRow = (props) => {
    return(
        <Table.Row>
            <Table.Cell>
                {props.matricula}
            </Table.Cell>
            <Table.Cell>
                {props.nombre}
            </Table.Cell>
            <Table.Cell>
                {props.carrera}
            </Table.Cell>
            <Table.Cell>
                {props.cuatrimestre}
            </Table.Cell>
            <Table.Cell>
                <Button id={`btn_${props.matricula}`} color='blue'><Icon name='edit' /> Editar</Button>
            </Table.Cell>
        </Table.Row>
    );
};

export default AlumnoRow;