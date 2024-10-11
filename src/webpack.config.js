const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
    entry: {
        "index": './index.ts',
        "options": './options.ts'
    },
    output: {
        path: path.resolve(__dirname, '../app'),
        filename: `./[name].js`
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    },
    plugins: [
        new PugPlugin({
            entry: {
                options: './options.pug'
            }
        })
    ]
};