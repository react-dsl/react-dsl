import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withDsl } from 'react-dsl';

export enum GridColumnRenderer {
    NONE,
    CODE,
    EXPRESSION,
}

export interface GridColumn {
    key: string;
    label: string;
    renderer: GridColumnRenderer,
}

export interface GridProps {
    bgColor: string;
    columns: GridColumn[];
    data: any[];
}

export const ExpressionRenderer = props => <span>{props.text}</span>

const ConnectedExpressionRenderer = withDsl((dsl, props) => ({
    text: dsl.calculate(props.row, props.text),
}))(ExpressionRenderer);

export const Cell = props => {
    switch (props.renderer) {
        case GridColumnRenderer.CODE:
            return <pre>{props.value}</pre>;
        case GridColumnRenderer.EXPRESSION:
            return <ConnectedExpressionRenderer text={props.value} row={props.row} />;
        default:
            return <span>{props.value}</span>;
    }
}

export const Row = props => (
    <TableRow style={{ backgroundColor: props.color }}>
        {props.children}
    </TableRow>
);

const ConnectedRow = withDsl((dsl, props) => ({
    color: dsl.calculate(props.row, props.color),
    children: props.children,
}))(Row);

export const Grid = (props: GridProps) => (
    <Table>
        <TableHead>
            <TableRow>
                {props.columns.map((column, i) => <TableCell key={i}>{column.label}</TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
            {props.data.map(row => (
                <ConnectedRow key={row.id} row={row} color={props.bgColor}>
                    {props.columns.map((column, i) => (
                        <TableCell key={i}>
                            <Cell value={row[column.key]} renderer={column.renderer} row={row} />
                        </TableCell>
                    ))}
                </ConnectedRow>
            ))}
        </TableBody>
    </Table>
);
