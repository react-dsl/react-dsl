import * as React from 'react';

import { DSL } from '../core/DSL';
import { DslContext } from './DslContext';

const defaultMapToProps = (dsl: DSL, props: any) => {
    return Object.keys(props).reduce((acc, k) => ({ ...acc, [k]: dsl.calculate({}, props[k]) }), {});
};

export const withDsl = (mapToProps = defaultMapToProps) => Component => props => {
    return (
        <DslContext.Consumer>
            {(dsl: DSL) => {
                try {
                    const calculatedProps = mapToProps(dsl, props);
                    return <Component {...calculatedProps} />;
                } catch (e) {
                    return <span>{e.message}</span>;
                }
            }}
        </DslContext.Consumer>
    );
};
