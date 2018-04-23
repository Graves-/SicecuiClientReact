import React from 'react';
import { Table } from 'semantic-ui-react';

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
                {props.accion}
            </Table.Cell>
        </Table.Row>
    );
};

export default MaestroRow;