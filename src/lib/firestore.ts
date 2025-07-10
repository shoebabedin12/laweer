import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

interface User {
  id: string;
  email: string;
  role: string;
}

export async function getUsers(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
}