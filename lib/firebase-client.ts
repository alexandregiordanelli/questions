import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBYizeDt1yzO5gsizqpa3gyX4NDJ-dqeaY',
  authDomain: 'questionsofcom.firebaseapp.com',
  projectId: 'questionsofcom',
  storageBucket: 'assets.questionsof.com',
  messagingSenderId: '872190920136',
  appId: '1:872190920136:web:eae2dbff82f3515c8b2cfd',
  measurementId: 'G-496GV7480S',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  // firebase.analytics()
}

export default firebase
