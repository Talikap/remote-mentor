// for webpack dev server > 4.0.0
module.exports = {
    // ... rest
    output: {
      //path: path.resolve(__dirname, 'dist'),
      //filename: 'index_bundle.js',
      publicPath: '/'
    },
    devServer: {
      compress: true,
      // 👇️ set this property
      disableHostCheck: true,
      historyApiFallback : true
    },
  };