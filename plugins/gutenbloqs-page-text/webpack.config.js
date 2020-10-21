const path = require('path')
const defaults = require('@wordpress/scripts/config/webpack.config')

module.exports = {
  ...defaults,
  entry: {
    gutenberg: path.resolve(process.cwd(), 'src', 'gutenberg.js'),
    component: path.resolve(process.cwd(), 'src', 'component.js'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
