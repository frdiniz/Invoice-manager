/**
 * Created by hediniz on 7/7/17.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src_path = path.resolve(__dirname, './src');
const dist_path = path.resolve(__dirname, './dist');

const index_html = new HtmlWebpackPlugin({
    template: 'index.template.html',
    filename: 'index.html',
});

const babel_loader = {
    test: /\.(js|es6)$/,
    exclude: [/node_modules/],
    use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015', 'stage-2'] },
    }],
};

module.exports = {
    resolve: { extensions: ['.js', '.es6'] },
    context: src_path,

    output: { filename: 'js/[name].js', path: dist_path },

    entry: {
        main: './assets/controller.js'
    },

    plugins: [
      index_html
    ],

    module: { rules: [
        babel_loader
    ] },
};