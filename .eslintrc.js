module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': 'off',
    //You can override any rules you want
    'linebreak-style': 0,
  },
  //trying alex
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-syntax-dynamic-import'],
    },
  },
};
