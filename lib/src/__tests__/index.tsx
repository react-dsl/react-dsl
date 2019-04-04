import * as React from 'react';
import { create } from 'react-test-renderer';

import { DefaultCache, DslProvider, withDsl } from '..';

const methods = {
    $(a) {
        return this[a];
    },
};

const state = {
    a: 1,
    b: 2,
};

const Foo = ({ text }) => <span>{JSON.stringify(text)}</span>;

describe('DSL', () => {

    test('less than operator', () => {
        const cache = new DefaultCache();
        const ConnectedFoo = withDsl((dsl, props) => ({
            text: dsl.calculate({}, props.text),
        }))(Foo);
        const App = () => (
            <DslProvider cache={cache} methods={methods} prefix={null}>
                <ConnectedFoo text='1 > 2' />
            </DslProvider>
        );
        const component = create(<App />).toJSON();
        expect(component).toMatchSnapshot();
    });

    test('greater than operator', () => {
        const cache = new DefaultCache();
        const ConnectedFoo = withDsl((dsl, props) => ({
            text: dsl.calculate({}, props.text),
        }))(Foo);
        const App = () => (
            <DslProvider cache={cache} methods={methods} prefix={null}>
                <ConnectedFoo text='1 < 2' />
            </DslProvider>
        );
        const component = create(<App />).toJSON();
        expect(component).toMatchSnapshot();
    });

    test('addition operator', () => {
        const cache = new DefaultCache();
        const ConnectedFoo = withDsl((dsl, props) => ({
            text: dsl.calculate({}, props.text),
        }))(Foo);
        const App = () => (
            <DslProvider cache={cache} methods={methods} prefix={null}>
                <ConnectedFoo text='1 + 2' />
            </DslProvider>
        );
        const component = create(<App />).toJSON();
        expect(component).toMatchSnapshot();
    });

    test('methods', () => {
        const cache = new DefaultCache();
        const ConnectedFoo = withDsl((dsl, props) => ({
            text: dsl.calculate(props.state, props.text),
        }))(Foo);
        const App = () => (
            <DslProvider cache={cache} methods={methods} prefix={null}>
                <ConnectedFoo text='$("a") + $("b")' state={state} />
            </DslProvider>
        );
        const component = create(<App />).toJSON();
        expect(component).toMatchSnapshot();
    });
});
