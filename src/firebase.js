import firebase from 'firebase'
import 'firebase/messaging'; 

const config ={

    apiKey: "AIzaSyBAIbU3WgdgvmLV1U6GH-E6H2UTPYr7fTw",
  authDomain: "umrah-ride-bbcba.firebaseapp.com",
  projectId: "umrah-ride-bbcba",
  storageBucket: "umrah-ride-bbcba.appspot.com",
  messagingSenderId: "719159743497",
  appId: "1:719159743497:web:8344a578d1aa80823d94d8"
}
firebase.initializeApp(config)
const messaging=firebase.messaging()


export  {firebase,messaging}