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
  images: {
    domains: ['assets.questionsof.com']
  },
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
  },
  async redirects() {
    return [
      {
        source: '/amp/enem/:tag',
        destination: '/enem/:tag',
        permanent: true,
      },
    ]
  },
}