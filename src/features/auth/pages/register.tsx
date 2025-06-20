import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ajout dans Firestore avec champ admin: true
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        admin: true,
        createdAt: new Date().toISOString(),
      });

      navigate("/admin");
    } catch (err) {
      if (err instanceof Error) {
        alert("Erreur : " + err.message);
      } else {
        alert("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Créer un compte admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Créer le compte</button>
    </form>
  );
}
