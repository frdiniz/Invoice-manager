/**
 * Created by hediniz on 7/7/17.
 */
const path = require('path');

module.exports = {
    entry: './src/assets/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};