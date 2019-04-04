import * as React from 'react';

import { Cache } from '../cache/Cache';
import { DSL } from '../core/DSL';
import { DslContext } from './DslContext';

export type Methods = Record<string, (...args: any[]) => any>;

export type Props = Record<string, any>;

export interface ProviderProps {
    cache: Cache;
    methods: Methods;
    prefix: string;
    children: any;
}

export const DslProvider = (props: ProviderProps) => {
    const dsl = new DSL(props.cache, props.prefix, props.methods);
    return (
        <DslContext.Provider value={dsl}>
            {props.children}
        </DslContext.Provider>
    );
};
