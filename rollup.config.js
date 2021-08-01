import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';


export default [{
  input: 'src.js',
  output: [{
    // freeze: false,
    file: "dist/index.js",
    format: 'iife'
  }],
  plugins:[
    commonjs(),
    resolve()
  ]
}];
