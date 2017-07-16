/**
 * Created by hediniz on 7/7/17.
 */
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src_path = path.resolve(__dirname, './src');
const dist_path = path.resolve(__dirname, './dist');

const vendors_chunk = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    minChunks: ({ context }) => (
        // this assumes your vendor imports exist in the node_modules directory
        context && context.indexOf('node_modules') !== -1
    ),
});


/*
 * CommonChunksPlugin will now extract all the common modules from vendor and main bundles
 * But since there are no more common modules between them we end up with just the runtime code included in the manifest file
 */

const manifest_chunk = new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
});

const extract_css_plugin = new ExtractTextPlugin({
    filename: 'css/[name].[chunkhash:8].css',
});

const index_html = new HtmlWebpackPlugin({
    template: 'index.template.html',
    filename: 'index.html',
});

const css_loader = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
    }),
};

const babel_loader = {
    test: /\.(js|es6)$/,
    exclude: [/node_modules/],
    use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015', 'stage-2'] },
    }],
};

module.exports = {
    resolve: { extensions: ['.js', '.es6', '.css'] },
    context: src_path,

    output: {
        filename: 'js/[name].[chunkhash:8].js', path: dist_path,
    },

    entry: {
        main: './assets/javascript/controller.js',
        custom: './assets/stylesheets/custom.css',
    },

    plugins: [
        vendors_chunk,
        manifest_chunk,
        extract_css_plugin,
        index_html,
    ],

    module: { rules: [
        babel_loader,
        css_loader,
    ] },
};