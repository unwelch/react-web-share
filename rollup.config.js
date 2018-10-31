import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/bundle.js',
      format: 'amd',
      name: 'ReactWebShareAPI',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  globals: { 'styled-components': 'styled' },
  external: ['styled-components'],
  plugins: [
    serve({
      open: true,
      contentBase: ['dist', 'demo']
    }),
    external(),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({ browser: true }),
    commonjs()
  ]
}
