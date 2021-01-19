//const withPWA = require('next-pwa')
 
// module.exports = withPWA({
//     images: {
//         domains: ['raw.githubusercontent.com', 'upload.wikimedia.org'],
//     },
//     // pwa: {
//     //     dest: 'public',
//     //     disable: process.env.NODE_ENV === 'development',
//     // }
// })

module.exports = {
    webpack: (config) => {
      config.module.rules.push(
        {
          test: /\.css$/,
          use: 'raw-loader'
        }
      )
      return config
    },
  }