const env = process.env.NODE_ENV;
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import styles from 'rollup-plugin-styles';
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';

const config = {
    input: 'src/js/Calendar.js',
    output: {
        file: 'dist/binaryBookingCalendar.js',
        name: 'BinaryBookingCalendar',
        format: 'cjs',
        sourcemap: env !== 'production',
        globals: {
            'react': 'React',
            'reactDOM': 'ReactDOM',
        },
        inlineDynamicImports: true,
    },
    plugins: [
        styles(),
        nodeResolve({
            browser: true,
            preferBuiltins: true,
            extensions: ['.js', '.ts', '.tsx'],
        }),
        commonjs({
            exclude: 'src/**',
        }),
        babel({
                'babelHelpers': 'bundled',
                'presets': [
                    [
                        '@babel/preset-env',
                        {
                            'targets': {
                                'browsers': [
                                    'last 2 versions',
                                    'safari >= 7',
                                    'ie >= 11',
                                ],
                            },
                        },
                    ],
                    '@babel/preset-react',
                ],
            },
        ),
        globals(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env === 'production' ? 'production' : 'development'),
            preventAssignment: true,
        }),
    ],
};

if (env === 'production') {
    config.plugins.push(terser());
    config.external = [
        'react',
        'prop-types',
    ];
} else {
    config.input = 'src/js/DemoPage.js';
    config.output.file = 'dist/calendarDemo.js';
}

export default config;
