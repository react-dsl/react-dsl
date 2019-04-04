import React, { ChangeEvent } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { DslProvider, DefaultCache, withDsl } from 'react-dsl';

const methods = {
    $(a: string): any {
        return this[a];
    }
};

const Result = (props: any) => <b>Result is: {props.text}</b>;

const ConnectedResult = withDsl((dsl, props) => ({
    text: dsl.calculate(props.context, props.text),
}))(Result);

const cache = new DefaultCache();

interface AppState {
    a: number;
    b: number;
    expression: string;
}

export class App extends React.Component<{}, AppState> {

    state = {
        a: 1,
        b: 2,
        expression: '$("a") + $("b")',
    };

    private onChangeA = (e: ChangeEvent<HTMLInputElement>) => this.setState({ a: Number(e.target.value) });
    private onChangeB = (e: ChangeEvent<HTMLInputElement>) => this.setState({ b: Number(e.target.value) });
    private onChangeExpression = (e: ChangeEvent<HTMLInputElement>) => this.setState({ expression: e.target.value });

    render(): JSX.Element {
        return (
            <DslProvider cache={cache} methods={methods} prefix={null}>
                <CssBaseline />
                <Card style={{ margin: '32px auto', maxWidth: 320 }}>
                    <CardContent>
                        <TextField label="a" type="number" value={this.state.a} onChange={this.onChangeA} fullWidth margin="normal" />
                        <TextField label="b" type="number" value={this.state.b} onChange={this.onChangeB} fullWidth margin="normal" />
                        <TextField label="Expression" value={this.state.expression} onChange={this.onChangeExpression} fullWidth margin="normal" />
                        <br />
                        <br />
                        <ConnectedResult text={this.state.expression} context={this.state} />
                    </CardContent>
                </Card>
            </DslProvider>
        );
    }
}
