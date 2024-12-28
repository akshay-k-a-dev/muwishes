import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDoc, doc } from 'firebase/firestore';
import type { GeneratedMessage } from '../types';

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your auth domain",
  projectId: "id",
  storageBucket: "id",
  messagingSenderId: "id",
  appId: "id"
};

// Initialize Firebase outside of the service
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Separate message service with error handling
export const messageService = {
  async save(message: GeneratedMessage): Promise<string> {
    try {
      const messagesRef = collection(db, "messages");
      const docRef = await addDoc(messagesRef, {
        ...message,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving message:", error);
      throw new Error("Failed to save message. Please try again.");
    }
  },

  async get(id: string): Promise<GeneratedMessage | null> {
    try {
      const docRef = doc(db, "messages", id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() as GeneratedMessage : null;
    } catch (error) {
      console.error("Error getting message:", error);
      throw new Error("Failed to retrieve message.");
    }
  }
};
