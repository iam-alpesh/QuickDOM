import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',   // Entry file
    output: [
        {
            file: 'dist/quickdom.esm.js',
            format: 'esm',        // ES Module
            sourcemap: true
        },
        {
            file: 'dist/quickdom.cjs.js',
            format: 'cjs',        // CommonJS
            sourcemap: true
        },
        {
            file: 'dist/quickdom.umd.js',
            format: 'umd',        // UMD for browsers
            name: 'QuickDOM',     // global variable for browser usage
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        terser()   // Minify the output
    ]
};
