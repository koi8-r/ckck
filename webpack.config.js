'use strict' ;

const webpack = require('webpack') ;
const path = require('path') ;
const CopyWebpackPlugin = require('copy-webpack-plugin') ;
const CleanWebpackPlugin = require('clean-webpack-plugin') ;
const ExtractTextPlugin = require('extract-text-webpack-plugin') ;


const dist = path.resolve( __dirname, 'dist' ) ;

module.exports = {
    entry: {
        'app': "./js/app",
        'test': "./js/test"
    },
    output: {
        path: dist,
        filename: "js/[name].js"
    },
    resolve: {
        alias: { vue: 'vue/dist/vue.min.js' }  // this runtime include template compiler, esm by default
    },
    plugins: [
        new CleanWebpackPlugin([dist]),
        new CopyWebpackPlugin([
            {
                from: '*.html',
                to: '.'
            },
            // {
            //     from: 'css/*',
            //     to: '.'
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
        new ExtractTextPlugin('css/[name].css')
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                //use: [
                //    { loader: 'style-loader' },
                //    { loader: 'css-loader' }
                //]
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
            },
            {
                test: /\.(png|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'assets/'
                    }
                }
            },
            {
                test: /.*\.(eot|woff2?|ttf|svg)(\?(#\w+&)?v=\d+\.\d+\.\d+(#\w+)?)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../'
                    }
                }
            }
        ]
    }
} ;
