// LICENSE_CODE ZON ISC
'use strict'; /*jslint node:true, esnext:true, es9:true*/
import acorn from 'acorn';
import config_schema from '../../../../util/lpm_config_schema.json';
import json_schema_lint_factory from './json_schema_lint_factory.js';

export const config_linter = json_schema_lint_factory({
    schema: config_schema,
    format_error: err=>{
        if (err.keyword=='additionalProperties' && err.params &&
            err.params.additionalProperty)
        {
            const prop = err.params.additionalProperty;
            const p = err.instancePath || '';
            const path = p ? p.split('/').filter(Boolean) : [];
            const fixed = path.map(s=>String(+s)===s ? +s : s);
            fixed.push(prop);
            return {
                path: fixed,
                message: `Unknown field "${prop}"`,
                severity: 'warning', // or 'error'
            };
        }
        let p = err.instancePath || '';
        let last = p ? p.split('/').filter(Boolean).slice(-1)[0] : 'config';
        return {message: err.message ? last+': '+err.message
            : 'Validation error'};
    },
});

export const js_basic_linter = view=>{
    const code = view.state.doc.toString();
    try {
        acorn.parse(code, {ecmaVersion: 2022, sourceType: 'script'});
        return [];
    } catch(e){
        const pos = e.pos ?? 0;
        const from = Math.max(0, Math.min(pos, view.state.doc.length));
        const to = Math.min(from + 1, view.state.doc.length);
        return [{
            from,
            to,
            severity: 'error',
            message: e.message || 'Syntax error',
        }];
    }
};
