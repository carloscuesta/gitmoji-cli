const presets = ['@babel/preset-flow']

const plugins = [
  [
    'module-resolver',
    {
      alias: {
        '@utils': './src/utils',
        '@commands': './src/commands',
        '@constants': './src/constants'
      }
    }
  ],
  '@babel/plugin-syntax-import-assertions'
]

module.exports = {
  presets,
  plugins,
  env: {
    test: {
      presets: ['@babel/preset-env', ...presets],
      plugins: ['babel-plugin-transform-import-meta', ...plugins]
    }
  }
}
