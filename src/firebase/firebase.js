// import firebase from "firebase";

import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDeuwJCovVM_OKNftuirbHBUq-fTWnX42I',

  authDomain: 'nims-dev.firebaseapp.com',

  databaseURL: 'https://nims-dev-default-rtdb.firebaseio.com',

  projectId: 'nims-dev',

  storageBucket: 'nims-dev.appspot.com',

  messagingSenderId: '117878342530',

  appId: '1:117878342530:web:f95790c5409c930d81c59b'
}

const app = initializeApp(firebaseConfig)
const firebase1 = getStorage(app)

export default firebase1
