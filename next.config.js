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
        source: '/amp/:username',
        destination: '/amp/username/read/:username',
      },
      {
        source: '/amp/:username/:notebookTag',
        destination: '/amp/notebook/read/:username/:notebookTag',
      },
      {
        source: '/amp/:username/:notebookTag/:questionTag',
        destination: '/amp/question/read/:username/:notebookTag/:questionTag',
      },
      {
        source: '/:username',
        destination: '/username/read/:username',
      },
      {
        source: '/:username/:notebookTag',
        destination: '/notebook/read/:username/:notebookTag',
      },
      {
        source: '/:username/:notebookTag/:questionTag',
        destination: '/question/read//:username/:notebookTag/:questionTag',
      },
    ]
  },
}