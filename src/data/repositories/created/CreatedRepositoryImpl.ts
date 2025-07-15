import { getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc,query, where } from "firebase/firestore";
import type { Created } from '@entities/created';
import type { CreatedRepository } from '@repositories/CreatedRepository';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import Firebase Firestore functions
// Import types for Couture and CoutureRepository


export class CreatedRepositoryImpl implements CreatedRepository {

 async getAll(filters?: { collection?: string; category?: string; customizable?: boolean }): Promise<Created[]> {
  const firestore = getFirestore();
  const collectionRef = collection(firestore, "created");

  const constraints = [];
  if (filters) {
    if (filters.collection && filters.collection.trim() !== '') {
      constraints.push(where("collection", "==", filters.collection));
      console.log("Collection filter applied:", filters.collection);
    }
    if (filters.category && filters.category.trim() !== '') {
      constraints.push(where("category", "==", filters.category));
      console.log("Category filter applied:", filters.category);
    }
    if (filters.customizable !== undefined) {
  constraints.push(where("customizable", "==", filters.customizable));
  console.log("Customizable filter applied:", filters.customizable);
}
  }

  let queryRef;
  if (constraints.length > 0) {
    queryRef = query(collectionRef, ...constraints);
  } else {
    queryRef = collectionRef;
  }

  const querySnapshot = await getDocs(queryRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Created[];
}

async getCustomProducts(category?: string): Promise<Created[]> {
  const firestore = getFirestore();
  const collectionRef = collection(firestore, "created");

  // Requête 1 : produits dans la collection "personnalisable" qui NE sont PAS des produits custom
  const query1 = query(
    collectionRef,
    where("collection", "==", "personnalisable"),
    where("customizable", "==", false),
    ...(category ? [where("category", "==", category)] : [])
  );
  console.log("getCustomProducts called with category:", category);


  // Requête 2 : produits de n'importe quelle autre collection, mais avec customizable === true
  const query2 = query(
    collectionRef,
    where("customizable", "==", true),
    ...(category ? [where("category", "==", category)] : [])
  );

  // On exécute les 2 requêtes en parallèle
  const [snap1, snap2] = await Promise.all([getDocs(query1), getDocs(query2)]);

  const results1 = snap1.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Created[];
  const results2 = snap2.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Created[];

  // On filtre pour éviter les doublons (ex : un produit marqué customizable === true ET dans "personnalisable")
  const combined = [...results1, ...results2];
  const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());

console.log("Results query1:", results1);
console.log("Results query2:", results2);
console.log("Combined unique results:", unique);

  return unique;
}




  async add(created: Created): Promise<boolean> {
  const firestore = getFirestore();
  const storage = getStorage();

  try {
    let imageUrl = created.imageUrl;

    // Si imageUrl est un fichier (File), on l’upload
    if (created.imageUrl instanceof File) {
      const storageRef = ref(storage, `created/${Date.now()}-${created.imageUrl.name}`);
      const snapshot = await uploadBytes(storageRef, created.imageUrl);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = doc(collection(firestore, "created")); // Auto-ID
  await setDoc(docRef, {
  name: created.name,
  description: created.description,
  price: created.price,
  custom: created.custom,      // ici custom (ou customizable) selon choix
  imageUrl: imageUrl,
  collection: created.collection,
  category: created.category,
});

    return true;
  } catch (error) {
    console.error("Erreur lors de l’ajout de la creation :", error);
    return false;
  }
}
  async getById(id: string): Promise<Created | null> {
    const firestore = getFirestore();
    const docRef = doc(firestore, "created", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Created;
    } else {
      return null;
    }
  }
  async custom(name: string): Promise<boolean> {
    const firestore = getFirestore();
    const docRef = doc(collection(firestore, "created"));
    
    try {
      await setDoc(docRef, {
        name,
        description: " ",
        price: 0,
        customizable: true,
        imageUrl: "",
      });
      return true;
    } catch (error) {
      console.error("Erreur lors de la création  personnalisée :", error);
      return false;
    }
  }
  async update(id: string, created: Created): Promise<Created | null> {
    const firestore = getFirestore();
    const docRef = doc(firestore, "created", id);
    
    try {
      await setDoc(docRef, created, { merge: true });
      return {
        
        ...created,
      } as Created;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la création :", error);
      return null;
    }
  }
  async delete(id: string): Promise<boolean> {
    const firestore = getFirestore();
    const docRef = doc(firestore, "created", id);
    
    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de la création :", error);
      return false;
    }
  }
}