const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const path = require('path');
const os = require('os');
const util = require('util')
const fs = require('fs')
const streamPipeline = util.promisify(require('stream').pipeline)
const fetch = require('node-fetch')
const url = require("url");
const slugify = require('slugify')
const jwt = require('jsonwebtoken');


exports.helloWorld = functions.auth.user().onCreate(async (user) => {

  const token = jwt.sign({ uid: 'admin' }, 'questionsof', { expiresIn: '1h' })

  const options = {
    method: 'POST',
    body: JSON.stringify({
      id: 0,
      tag: slugify(user.displayName, {
        lower: true,
        strict: true,
        replacement: '',
      }),
      userId: user.uid,
      name: user.displayName,
      media: {
        customerId: 0,
        ext: 'jpg',
        mime: 'image/jpeg',
        name: 'profile.jpg',
        size: 0,
        tag: 'profile.jpg',
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Apikey ${token}`,
    },
  }

  console.log(options)

  const response = await fetch(`https://questionsof.vercel.app/api`, options)

  const res = await response.json()

  const fileName = path.basename(url.parse(user.photoURL).pathname)
  const tempFilePath = path.join(os.tmpdir(), fileName);

  const responseImg = await fetch(user.photoURL)
  await streamPipeline(responseImg.body, fs.createWriteStream(tempFilePath))

  const bucket = admin.storage().bucket("assets.questionsof.com");

  await bucket.upload(tempFilePath, {
    destination: `${res.id}/profile.jpg`,
    metadata: {
        contentType: 'image/jpeg',
    }
  });

  return fs.unlinkSync(tempFilePath);
});
