import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';

import { DslProvider, DefaultCache } from 'react-dsl';

import { Grid, GridColumnRenderer } from './Grid';

import { data } from './data';

const methods = {
    $(a: string): any {
        return this[a];
    },
    color(a: string): any {
        return a.toLowerCase().includes('a')
            ? '#f5f7ff'
            : null;
    },
};

const cache = new DefaultCache();

export const App = () => (
    <DslProvider cache={cache} methods={methods} prefix={null}>
        <CssBaseline />
        <Card style={{ margin: '32px auto', maxWidth: 600 }}>
            <CardContent>
                <Grid
                    bgColor='color($("name"))'
                    columns={[
                        { key: 'id', label: 'ID', renderer: GridColumnRenderer.NONE },
                        { key: 'name', label: 'Name', renderer: GridColumnRenderer.NONE },
                        { key: 'expression', label: 'Expression (raw)', renderer: GridColumnRenderer.CODE },
                        { key: 'expression', label: 'Expression', renderer: GridColumnRenderer.EXPRESSION },
                    ]}
                    data={data}
                />
            </CardContent>
        </Card>
    </DslProvider>
);
