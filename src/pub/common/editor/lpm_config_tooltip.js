// LICENSE_CODE ZON ISC
'use strict'; /*jslint browser:true, esnext:true, es9:true*/
/* eslint "hola/var-names-unix":"off" */
import _ from 'lodash4';
import {syntaxTree} from '@codemirror/language';
import config_schema from '../../../../util/lpm_config_schema.json';

const unquote = s=>s ? s.replace(/^["']|["']$/g, '') : s;

const find_ancestor = (node, name)=>{
    while (node && node.name!=name)
        node = node.parent;
    return node;
};

const prop_name = (view, prop_node)=>{
    const pn = prop_node?.getChild?.('PropertyName');
    if (!pn)
        return null;
    return unquote(view.state.sliceDoc(pn.from, pn.to));
};

const build_path = (view, node)=>{
    const path = [];
    while (node)
    {
        if (node.name=='Property')
        {
            const k = prop_name(view, node);
            if (k)
                path.unshift(k);
        }
        node = node.parent;
    }
    return path;
};

const json_path_to_schema_path = path=>{
    const schema_path = ['properties'];
    for (let i=0; i<path.length; i++)
    {
        schema_path.push(path[i]);
        if (i<path.length-1)
        {
            const next = _.get(config_schema, schema_path);
            if (next?.items?.properties)
                schema_path.push('items', 'properties');
            else if (next?.properties)
                schema_path.push('properties');
        }
    }
    return schema_path;
};

const tooltip_dom = field_schema=>{
    const dom = document.createElement('div');
    dom.className = 'cm-lpm-tooltip';
    dom.textContent = field_schema.description ?? '';
    return dom;
};

export default (view, pos)=>{
    const tree = syntaxTree(view.state);
    let node = tree.resolve(pos, -1);
    node = find_ancestor(node, 'PropertyName');
    if (!node)
        return null;
    const prop = find_ancestor(node, 'Property');
    const path = build_path(view, prop);
    const schema_path = json_path_to_schema_path(path);
    const field_schema = _.get(config_schema, schema_path);
    if (!field_schema?.description)
        return null;
    return {
        pos: node.from,
        end: node.to,
        above: true,
        create: ()=>({dom: tooltip_dom(field_schema)}),
    };
};
