const merge = require('webpack-merge');
    common = require('./webpack.common.js'),

    TerserPlugin = require('terser-webpack-plugin'),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    imageminMozjpeg = require('imagemin-mozjpeg'),
    CompressionPlugin = require('compression-webpack-plugin'),

    FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
    WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                sourceMap: true,
            })
        ]
    },
    plugins: [
        new CompressionPlugin({
            test: /\.(html|css|js)(\?.*)?$/i // only compressed html/css/js, skips compressing sourcemaps etc
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            gifsicle: { // lossless gif compressor
                optimizationLevel: 9
            },
            pngquant: ({ // lossy png compressor, remove for default lossless
                quality: '75'
            }),
            plugins: [imageminMozjpeg({ // lossy jpg compressor, remove for default lossless
                quality: '75'
            })]
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/logoAguarela.svg',
            icons: {
                twitter: true,
                windows: true
            }
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true
        })
    ]
});