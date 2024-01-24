// for webpack dev server > 4.0.0
module.exports = {
    // ... rest
  
    devServer: {
      compress: true,
      // 👇️ set this property
      disableHostCheck: true,
    },
  };