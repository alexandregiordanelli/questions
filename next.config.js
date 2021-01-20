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
  async rewrites() {
    return [
      { //bug ( catch all routes [[...notebookTag]] is not working for /api/notebook but working for /api/notebook/1 )
        source: '/api/:api*',
        destination: '/api/:api*',
      },
      {
        source: '/amp/:notebookTag',
        destination: '/amp/notebook/:notebookTag',
      },
      {
        source: '/amp/:notebookTag/:questionTag',
        destination: '/amp/notebook/:notebookTag/question/:questionTag',
      },
      {
        source: '/:notebookTag',
        destination: '/notebook/:notebookTag',
      },
      {
        source: '/:notebookTag/:questionTag',
        destination: '/notebook/:notebookTag/question/:questionTag',
      },
    ]
  },
}