import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@lib/firebase";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@components/CustomTextField";
import Button from "@components/Button";
import styles from "./register.module.css"; 

export default function Register() {
  const [userName, setUserName] = useState(""); 
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
        userName: userName,
        admin: true,
        createdAt: new Date().toISOString(),
      });

      navigate("/admin/account");
    } catch (err) {
      if (err instanceof Error) {
        alert("Erreur : " + err.message);
      } else {
        alert("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className={styles.container}>
  <div>
    <h2>Je crée mon compte</h2>
    <form onSubmit={handleRegister}>

<CustomTextField
        label="Mon prénom"
        type="text"
        value={userName}
        onChange={e => setUserName(e.target.value)} 
        required
      />

      <CustomTextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <CustomTextField
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
       <div className ="button-container">
        <Button type="submit" label="soumettre " />
       <Button type="submit" label="Acueil" redirectTo="/" />
      </div>
      
    </form>
  </div>
</div>

  );
}
