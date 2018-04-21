import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

const MaestroRow = (props) => {
    return(
        <Table.Row>
            <Table.Cell>
                {props.nombre}
            </Table.Cell>
            <Table.Cell>
                {props.correo}
            </Table.Cell>
            <Table.Cell>
                {props.curp}
            </Table.Cell>
            <Table.Cell>
                {props.rfc}
            </Table.Cell>
            <Table.Cell>
                {props.origen}
            </Table.Cell>
            <Table.Cell>
                {props.fechaRegistro}
            </Table.Cell>
            {/*<Table.Cell textAlign='center'>
                <Button id={`btn_${props.matricula}`} color='blue' onClick={props.handler}><Icon name='info' /> Detalles</Button>
            </Table.Cell>*/}
        </Table.Row>
    );
};

export default MaestroRow;