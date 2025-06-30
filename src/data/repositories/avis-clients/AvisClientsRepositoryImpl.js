import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, serverTimestamp, Timestamp, } from "firebase/firestore";
import { db } from "@lib/firebase";
export class AvisClientsRepositoryImpl {
    constructor() {
        this.collectionRef = collection(db, "avis_clients");
    }
    async getAllAvisClients() {
        const snapshot = await getDocs(this.collectionRef);
        return snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                name: data.nom,
                message: data.message,
                date: (data.date instanceof Timestamp) ? data.date.toDate() : new Date(),
            };
        });
    }
    async addAvisClients(avis) {
        try {
            const docRef = await addDoc(this.collectionRef, {
                nom: avis.name,
                message: avis.message,
                date: serverTimestamp(), // ✅ Firestore ajoute la date automatiquement
            });
            const saved = await getDoc(docRef);
            const savedData = saved.data();
            if (!savedData)
                return null;
            return {
                id: docRef.id,
                name: savedData.nom,
                message: savedData.message,
                date: (savedData.date instanceof Timestamp) ? savedData.date.toDate() : new Date(),
            };
        }
        catch (err) {
            console.error("Erreur ajout avis client:", err);
            return null;
        }
    }
    async avisClientsGetById(id) {
        try {
            const docSnap = await getDoc(doc(this.collectionRef, id));
            const data = docSnap.data();
            if (!data)
                return null;
            return {
                id: docSnap.id,
                name: data.nom,
                message: data.message,
                date: (data.date instanceof Timestamp) ? data.date.toDate() : new Date(),
            };
        }
        catch (err) {
            console.error("Erreur récupération avis par ID:", err);
            return null;
        }
    }
    async delete(id) {
        try {
            await deleteDoc(doc(this.collectionRef, id));
            return true;
        }
        catch (err) {
            console.error("Erreur suppression avis:", err);
            return false;
        }
    }
}
