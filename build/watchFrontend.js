const minify = require('@node-minify/core');
const uglifyES = require('@node-minify/uglify-es');
const cleanCSS = require('@node-minify/clean-css');
const fs = require('fs');

const JS_BASE_PATH = './public/js/';
const CSS_BASE_PATH = './public/css/';
const MAIN_JS_PATH = JS_BASE_PATH + 'main.js';
const RESULTS_JS_PATH = JS_BASE_PATH + 'results.js';
const STYLE_CSS_PATH = CSS_BASE_PATH + 'style.css';

fs.watchFile(MAIN_JS_PATH, () => {
    console.log('main.js changed');
    minify({
            compressor: uglifyES,
            input: MAIN_JS_PATH,
            output: './public/js/$1.min.js',
        }).then(console.log('main.js rebuild'))
        .catch(console.err);
});

fs.watchFile(RESULTS_JS_PATH, () => {
    console.log('results.js changed');
    minify({
            compressor: uglifyES,
            input: RESULTS_JS_PATH,
            output: './public/js/$1.min.js',
        }).then(console.log('results.js rebuild'))
        .catch(console.err);
});

fs.watchFile(STYLE_CSS_PATH, () => {
    minify({
        compressor: cleanCSS,
        input: STYLE_CSS_PATH,
        output: './public/css/style.min.css',
    }).then(console.log('main.js rebuild'))
    .catch(console.err);
});