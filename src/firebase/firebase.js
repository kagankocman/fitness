import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from '@firebase/storage';
// import 'firebase/storage'

const firebaseConfig = {
    apiKey: "**************",
    authDomain: "fitness-83552.firebaseapp.com",
    databaseURL: "https://fitness-83552-default-rtdb.firebaseio.com",
    projectId: "fitness-83552",
    storageBucket: "fitness-83552.appspot.com",
    messagingSenderId: "647363344097",
    appId: "1:647363344097:web:6c2717b9db6f03859369a0"
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firestoreDB, auth, storage};
