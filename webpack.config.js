import webpack from 'webpack';
import path  from 'path'; 

export default  {
  mode: "development", //production | development
  entry: {
    index: './src/index.js',
    login: './src/login.js',
    registration: './src/registration.js',
    modal: './src/modal-personal.js'
  },
  module: {
    rules: [
        {test: /\.(js)$/, use: 'babel-loader'}
    ]
},
  output: {
    path: path.resolve('./assets/js'),
    filename: '[name].min.js'
  },
};