'use strict' ;


const webpack = require('webpack') ;
const path = require('path') ;
const CopyWebpackPlugin = require('copy-webpack-plugin') ;
const CleanWebpackPlugin = require('clean-webpack-plugin') ;


module.exports = {
    entry: {
        'app': "./js/app",
        'test': "./js/test"
    },
    output: {
        path: path.resolve( __dirname, 'dist', 'js' ),
        filename: "[name].js"
    },
    resolve: {
        alias: { vue: 'vue/dist/vue.min.js' }  // this runtime include template compiler, esm by default
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {
                from: '*.html',
                to: '..'
            },
            // {
            //     from: 'css/*',
            //     to: '..'
            // }
        ]),
        new webpack.ProvidePlugin({
            _: 'lodash',
            // _map: ['lodash', 'map'],
            // Vue: ['vue/dist/vue.esm.js', 'default'],
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'] // default export of an popper es2015 module
        }),
        // new ExtractTextPlugin('bundle.css')
    ],
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: {
                    loader: 'raw-loader'
                }
            },
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: []
                    }
                }
            }
        ]
    }
} ;
