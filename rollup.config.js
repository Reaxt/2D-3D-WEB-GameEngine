import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
const baseConfig = createBasicConfig();
baseConfig.output.dir = null;
export default {
  input: './out-tsc/src/main.js',
  output: {file:'./dist/bundle.js', format:"es"},
  
  plugins:[nodeResolve({browser:true})]
};
