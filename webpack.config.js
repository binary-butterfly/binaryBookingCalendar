const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
    console.log(path.join(__dirname + '/dist'));
    return {
        target: 'web',
        entry: './src/js/Calendar.js',
        externals: {
            react: 'react',
        },
        output: {
            path: path.join(__dirname + '/dist'),
            filename: 'binaryBookingCalendar.js',
            library: 'BinaryBookingCalendar',
            libraryTarget: 'umd',
            globalObject: 'this',
            umdNamedDefine: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node-modules/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
    };
};
