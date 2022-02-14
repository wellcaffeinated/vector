import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import babelrc from './.babelrc.json'
import pkg from './package.json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const variable = 'Vector'
const library = 'vector'

function header() {
  return {
    renderChunk(code) {
      return `/**
 * ${library} ${pkg.version}
 * @license ${pkg.license}
 * Copyright 2022-present Jasper Palfree
 */
${code}`
    }
  }
}

let builds = [
  {
    input: 'src/index.js',
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        compact: false,
        babelrc: false,
        ...babelrc
      }),
      header()
    ],
    output: [
      {
        format: 'esm',
        file: `dist/${library}.module.js`
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        compact: false,
        babelrc: false,
        ...babelrc
      }),
      header()
    ],
    output: [
      {
        format: 'umd',
        name: variable,
        file: `dist/${library}.js`,
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
        ...babelrc
      }),
      terser(),
      header()
    ],
    output: [
      {
        format: 'umd',
        name: variable,
        file: `dist/${library}.min.js`
      }
    ]
  }
]

export default builds
