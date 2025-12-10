import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  setDoc, 
  onSnapshot,
  getDoc
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { FIREBASE_CONFIG } from '../constants';
import { OrderData, MenuAvailability } from '../types';

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);
export const auth = getAuth(app);

// --- Orders ---

export const submitOrderToFirebase = async (orderData: OrderData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderData);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getOrders = async (): Promise<OrderData[]> => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OrderData));
};

// --- Menu Availability ---

export const subscribeToMenuAvailability = (callback: (availability: MenuAvailability) => void) => {
  const docRef = doc(db, "settings", "menu_availability");
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as MenuAvailability);
    } else {
      callback({});
    }
  });
};

export const updateMenuAvailability = async (availability: MenuAvailability) => {
  const docRef = doc(db, "settings", "menu_availability");
  await setDoc(docRef, availability, { merge: true });
};

export const updateMenuItemAvailability = async (itemName: string, isAvailable: boolean) => {
  const docRef = doc(db, "settings", "menu_availability");
  await setDoc(docRef, { [itemName]: isAvailable }, { merge: true });
};

// --- Auth ---

export const loginUser = (email: string, pass: string) => {
  return signInWithEmailAndPassword(auth, email, pass);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
