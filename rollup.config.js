import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
    intro: 'process.env.NODE_ENV = "production";',
  },
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    json({
      exclude: ['node_modules/**'],
    }),
  ],
};
