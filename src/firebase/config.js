import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdxe-piL0b93Ma0-eSdV4b88EcbU-7vlk",
  authDomain: "home-office-coder-react.firebaseapp.com",
  projectId: "home-office-coder-react",
  storageBucket: "home-office-coder-react.appspot.com",
  messagingSenderId: "277025302911",
  appId: "1:277025302911:web:875b90db3752ac3535124a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const getFirestore = () => {
    return firebase.firestore(app);
}