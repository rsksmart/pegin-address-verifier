import rollupPluginCommonjs from 'rollup-plugin-commonjs';
import rollupPluginResolve from 'rollup-plugin-node-resolve';

const config = {
  input: 'src/pegin-address-verificator.js',
  output: {
    file: 'dist/umd.js',
    format: 'umd',
    name: 'RskPegInAddressVerifier',
  },
  plugins: [
    rollupPluginCommonjs(),
    rollupPluginResolve(),
  ],
};

export default config;
