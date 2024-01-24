// for webpack dev server > 4.0.0
module.exports = {
    // ... rest
  
    devServer: {
      compress: true,
      port: 3000,
  
      // 👇️ set this property
      allowedHosts: 'all',
    },
  };