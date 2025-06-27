import { getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import Firebase Firestore functions
// Import types for Couture and CoutureRepository
export class CreatedRepositoryImpl {
    async getAll() {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, "created"));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    async add(created) {
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
                customizable: created.customizable,
                imageUrl: imageUrl,
            });
            return true;
        }
        catch (error) {
            console.error("Erreur lors de l’ajout de la creation :", error);
            return false;
        }
    }
    async getById(id) {
        const firestore = getFirestore();
        const docRef = doc(firestore, "created", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            };
        }
        else {
            return null;
        }
    }
    async custom(name) {
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
        }
        catch (error) {
            console.error("Erreur lors de la création  personnalisée :", error);
            return false;
        }
    }
    async update(id, created) {
        const firestore = getFirestore();
        const docRef = doc(firestore, "created", id);
        try {
            await setDoc(docRef, created, { merge: true });
            return {
                ...created,
            };
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de la création :", error);
            return null;
        }
    }
    async delete(id) {
        const firestore = getFirestore();
        const docRef = doc(firestore, "created", id);
        try {
            await deleteDoc(docRef);
            return true;
        }
        catch (error) {
            console.error("Erreur lors de la suppression de la création :", error);
            return false;
        }
    }
}
