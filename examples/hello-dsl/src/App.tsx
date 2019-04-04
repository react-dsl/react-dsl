import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';

import { DslProvider, DefaultCache, withDsl } from 'react-dsl';

const Hello = (props: any) => <b>{props.text}</b>;

const ConnectedHello = withDsl((dsl, props) => ({
    text: dsl.calculate(null, props.text),
}))(Hello);

const cache = new DefaultCache();

export class App extends React.Component<{}, {}> {

    render(): JSX.Element {
        return (
            <DslProvider cache={cache} methods={{}} prefix={null}>
                <CssBaseline />
                <Card style={{ margin: '32px auto', maxWidth: 320 }}>
                    <CardContent>
                        <ConnectedHello text='"Hello" + " " + "DSL"' />
                    </CardContent>
                </Card>
            </DslProvider>
        );
    }
}
