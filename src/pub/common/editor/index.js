// LICENSE_CODE ZON ISC
'use strict'; /*jslint react:true, es9:true*/
/* eslint "hola/var-names-unix":"off" */
import React, {useState, useEffect} from 'react';
import _ from 'lodash4';
import CodeMirror from '@uiw/react-codemirror';
import {vscodeLight} from '@uiw/codemirror-theme-vscode';
import {lintGutter, linter} from '@codemirror/lint';
import {js_basic_linter} from './linters.js';
import * as langs from './langs.js';

export * as linters from './linters.js';
export * as langs from './langs.js';
export {default as config_tooltip} from './lpm_config_tooltip.js';

export const cm_basic_setup = {
    lineNumbers: true,
    highlightActiveLineGutter: true,
    highlightActiveLine: false,
    foldGutter: false,
    autocompletion: false,
    rectangularSelection: false,
    crosshairCursor: false,
    closeBrackets: true,
    bracketMatching: true,
    indentOnInput: true,
    searchKeymap: true,
    history: true,
};

export default function Basic_editor(props){
    const {editable, on_change, setup, setup_extend, height='100%', value='',
        extensions=[], theme=vscodeLight} = props;
    const [editor_setup, set_editor_setup] = useState(cm_basic_setup);
    useEffect(()=>{
        if (setup)
            return void set_editor_setup(setup);
        if (setup_extend)
            return void set_editor_setup({...cm_basic_setup, ...setup_extend});
        if (editor_setup !== cm_basic_setup)
            set_editor_setup(cm_basic_setup);

    }, [setup, setup_extend]);
    return <CodeMirror
        value={value}
        height={height}
        editable={editable}
        extensions={extensions}
        theme={theme}
        onChange={on_change}
        basicSetup={editor_setup}
    />;
}

export const Lang_editor = props=><Basic_editor
    extensions={[
        props.lang,
        ...props.lint ? [lintGutter(), linter(props.lint)] : [],
        ...props.extensions || [],
    ]}
    {..._.omit(props, ['lang', 'lint', 'extensions'])}
/>;

export const Js_editor = props=><Lang_editor
    lang={langs.js()}
    lint={js_basic_linter}
    {..._.omit(props, ['lang'])}
/>;
export const Json_editor = props=>
    <Lang_editor lang={langs.json()} {...props}/>;
export const Html_editor = props=>
    <Lang_editor lang={langs.html()} {...props}/>;
