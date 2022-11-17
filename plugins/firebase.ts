// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCV2sR8A2Jdeg0eZa_71ciEyYPE2L4_ckM',
  authDomain: 'leaf-347c8.firebaseapp.com',
  databaseURL:
    'https://leaf-347c8-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'leaf-347c8',
  storageBucket: 'leaf-347c8.appspot.com',
  messagingSenderId: '545006299714',
  appId: '1:545006299714:web:cff00947cc1db504e8dbdb',
  measurementId: 'G-VBR6HVHXXS',
}

const firebase = initializeApp(firebaseConfig)
const database = getFirestore(firebase)

export default database
