import { getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import type { Couture } from '@entities/Couture';
import type { CoutureRepository } from '@repositories/CoutureRepository';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import Firebase Firestore functions
// Import types for Couture and CoutureRepository


export class CoutureRepositoryImpl implements CoutureRepository {

  async getAllCoutures(): Promise<Couture[]> {
    const firestore = getFirestore();
    const querySnapshot = await getDocs(collection(firestore, "couture"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Couture[];
  }

  async addCouture(couture: Couture): Promise<boolean> {
  const firestore = getFirestore();
  const storage = getStorage();

  try {
    let imageUrl = couture.imageUrl;

    // Si imageUrl est un fichier (File), on l’upload
    if (couture.imageUrl instanceof File) {
      const storageRef = ref(storage, `couture/${Date.now()}-${couture.imageUrl.name}`);
      const snapshot = await uploadBytes(storageRef, couture.imageUrl);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = doc(collection(firestore, "couture")); // Auto-ID
    await setDoc(docRef, {
      name: couture.name,
      description: couture.description,
      price: couture.price,
      customizable: couture.customizable,
      imageUrl: imageUrl,
    });

    return true;
  } catch (error) {
    console.error("Erreur lors de l’ajout de couture :", error);
    return false;
  }
}
  async getCoutureById(id: string): Promise<Couture | null> {
    const firestore = getFirestore();
    const docRef = doc(firestore, "couture", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Couture;
    } else {
      return null;
    }
  }
  async customCouture(name: string): Promise<boolean> {
    const firestore = getFirestore();
    const docRef = doc(collection(firestore, "couture"));
    
    try {
      await setDoc(docRef, {
        name,
        description: "Custom Couture",
        price: 0,
        customizable: true,
        imageUrl: "",
      });
      return true;
    } catch (error) {
      console.error("Erreur lors de la création de la couture personnalisée :", error);
      return false;
    }
  }
  async updateCouture(id: string, couture: Couture): Promise<Couture | null> {
    const firestore = getFirestore();
    const docRef = doc(firestore, "couture", id);
    
    try {
      await setDoc(docRef, couture, { merge: true });
      return {
        
        ...couture,
      } as Couture;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la couture :", error);
      return null;
    }
  }
  async deleteCouture(id: string): Promise<boolean> {
    const firestore = getFirestore();
    const docRef = doc(firestore, "couture", id);
    
    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de la couture :", error);
      return false;
    }
  }
}