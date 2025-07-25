import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
// Exemple avec Firebase (à adapter si tu n’as pas encore branché Firebase)
export class AuthRepositoryImpl {
    async register(email, password, userName) {
        const auth = getAuth();
        const firestore = getFirestore();
        // Étape 1 : Créer l'utilisateur avec Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        await firebaseUser.getIdToken(true);
        const uid = firebaseUser.uid;
        //console.log("Nom d'utilisateur à enregistrer :", userName);
        await setDoc(doc(firestore, "users", uid), {
            uid,
            email,
            userName,
            createdAt: serverTimestamp(),
        });
        // Étape 3 : Retourner le user local
        return {
            id: uid,
            email,
            userName,
            admin: false,
        };
    }
    async login(email, password) {
        const auth = getAuth();
        const firestore = getFirestore();
        // Étape 1 : Connexion via Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        // Étape 2 : Récupérer le document utilisateur dans Firestore
        const userDoc = await getDoc(doc(firestore, "users", uid));
        if (!userDoc.exists()) {
            throw new Error("Utilisateur non trouvé dans Firestore.");
        }
        const data = userDoc.data();
        // Étape 3 : Retourner l'objet User avec les vraies infos
        return {
            id: uid,
            email: data.email,
            userName: data.userName,
            admin: data.admin
        };
    }
    async logout() {
        // TODO: logique de logout
        console.log("Utilisateur déconnecté");
    }
    async getCurrentUser() {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser)
            return null;
        const firestore = getFirestore();
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (!userDoc.exists())
            return null;
        const data = userDoc.data();
        //console.log("Utilisateur récupéré :", data);
        return {
            id: currentUser.uid,
            email: data.email,
            userName: data.userName, // <--- ici tu utilises bien `userName`
            admin: data.admin === true
        };
    }
}
