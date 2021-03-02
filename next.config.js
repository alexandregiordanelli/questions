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
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  images: {
    domains: ['assets.questionsof.com']
  }
}