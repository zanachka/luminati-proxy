// LICENSE_CODE ZON ISC
'use strict'; /*jslint node:true, esnext:true, es9:true*/
/* eslint "hola/var-names-unix":"off" */
import Ajv from 'ajv';
import {
    parseTree,
    findNodeAtLocation,
    printParseErrorCode,
} from 'jsonc-parser';
import {to_sentence} from '../../util.js';

const clamp = (n, min, max)=>Math.max(min, Math.min(n, max));

const parse_json_pointer = p=>{
    if (!p)
        return [];
    return p.split('/').filter(Boolean).map(seg=>{
        const decoded = seg.replace(/~1/g, '/').replace(/~0/g, '~');
        return String(+decoded)===decoded ? +decoded : decoded;
    });
};

const print_parse_error = code=>{
    let parser_error = printParseErrorCode(code);
    return parser_error ? to_sentence(parser_error) : null;
};

const diag_for_path = (view, root, path, message, severity='error')=>{
    const len = view.state.doc.length;
    const node = path?.length ?
        // eslint-disable-next-line no-extra-parens
        (findNodeAtLocation(root, path) ||
         findNodeAtLocation(root, path.slice(0, -1)) ||
         root) : root;
    const from = clamp(node.offset, 0, len);
    const to0 = clamp(node.offset+node.length, 0, len);
    const to = Math.max(to0, Math.min(from+1, len));
    return {from, to, severity, message};
};

const default_format_error = err=>{
    const p = err.instancePath ?? '';
    const last = p ? p.split('/').filter(Boolean).at(-1) : 'config';
    return {message: err.message ? `${last}: ${err.message}`
        : 'Validation error'};
};

export default opt=>{
    opt ??= {};
    if (!opt.schema && typeof opt.schema_factory!='function')
        throw new Error('schema or schema_factory is required');
    const schema = opt.schema ?? opt.schema_factory();
    const ajv = new Ajv({
        allErrors: true,
        strict: false,
        allowUnionTypes: true,
        ...opt.ajv_opt,
    });
    const validate = ajv.compile(schema);
    const parse_opt = {allowTrailingComma: true, ...opt.parse_opt};
    const format_error = opt.format_error ?? default_format_error;
    return view=>{
        const text = view.state.doc.toString();
        const parse_errors = [];
        const root = parseTree(text, parse_errors, parse_opt);
        if (!root)
        {
            return [{
                from: 0,
                to: Math.min(1, view.state.doc.length),
                severity: 'error',
                message: 'Invalid JSON',
            }];
        }
        if (parse_errors.length)
        {
            const len = view.state.doc.length;
            return parse_errors.map(e=>{
                const message = typeof e.error === 'number'
                    ? print_parse_error(e.error)
                    : e.error || 'JSON parse error';
                return {
                    from: clamp(e.offset, 0, len),
                    to: clamp(e.offset+(e.length||1), 0, len),
                    severity: 'error',
                    message,
                };
            });
        }
        let data;
        try { data = JSON.parse(text); }
        catch(e){ return [diag_for_path(view, root, [], e.message)]; }
        if (validate(data))
            return [];
        return (validate.errors ?? []).map(err=>{
            const fe = format_error(err) ?? {};
            const msg = fe.message ?? 'Validation error';
            const sev = fe.severity ?? 'error';
            const pointer = fe.path ?? err.instancePath;
            const path = Array.isArray(pointer) ? pointer
                : parse_json_pointer(pointer);
            return diag_for_path(view, root, path, msg, sev);
        });
    };
};
