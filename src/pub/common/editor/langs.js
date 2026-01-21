// LICENSE_CODE ZON ISC
'use strict'; /*jslint node:true, esnext:true, es9:true*/

import prismjs from 'prismjs';
import 'prismjs/components/prism-clike';
// for php
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';

export {javascript as js} from '@codemirror/lang-javascript';
export {json} from '@codemirror/lang-json';
export {html} from '@codemirror/lang-html';

const prism_detect_lang = lang=>{
    const lang_map = {
        shell: 'bash',
        bash: 'bash',
        sh: 'bash',
        curl: 'bash',
        javascript: 'javascript',
        js: 'javascript',
        node: 'javascript',
        puppeteer: 'javascript',
        playwright: 'javascript',
        typescript: 'typescript',
        ts: 'typescript',
        python: 'python',
        py: 'python',
        scrapy: 'python',
        java: 'java',
        csharp: 'csharp',
        'c#': 'csharp',
        cs: 'csharp',
        php: 'php',
        ruby: 'ruby',
        rb: 'ruby',
        go: 'go',
        golang: 'go',
        rust: 'rust',
        rs: 'rust',
    };
    const normalized = lang?.toLowerCase()?.trim();
    return lang_map[normalized] || 'clike';
};

const prism_highlight = (code, lang)=>{
    const prism_lang = prism_detect_lang(lang);
    const grammar = prismjs.languages[prism_lang] || prismjs.languages.clike;
    return prismjs.highlight(code, grammar, prism_lang);
};

const prism_utils = {
    highlight: prism_highlight,
    detect: prism_detect_lang,
};

export {prism_utils as prism};
