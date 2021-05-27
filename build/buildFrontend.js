const minify = require('@node-minify/core');
const uglifyES = require('@node-minify/uglify-es');
const cleanCSS = require('@node-minify/clean-css');

minify({
    compressor: uglifyES,
    input: ['./public/js/main.js', './public/js/results.js'],
    output: './public/js/$1.min.js',
}).then(console.log('js build'))
.catch(console.err);

minify({
    compressor: cleanCSS,
    input: './public/css/style.css',
    output: './public/css/style.min.css',
}).then(console.log('css build'))
.catch(console.err);