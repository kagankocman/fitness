import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { registerUser };