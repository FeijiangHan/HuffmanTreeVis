import app from '../config/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

export const auth = getAuth(app);
export const db = getFirestore(app);
