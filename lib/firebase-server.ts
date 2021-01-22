import admin, { ServiceAccount, credential } from 'firebase-admin'

if (!admin.apps.length) {
  const serviceAccount: ServiceAccount = {
    projectId: 'questionsofcom',
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: 'firebase-adminsdk-o982d@questionsofcom.iam.gserviceaccount.com',
  }

  admin.initializeApp({
    credential: credential.cert(serviceAccount),
  })
}
export default admin
