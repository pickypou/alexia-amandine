import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import CustomTextField from "@components/CustomTextField";
import Button from "@components/Button";
import { db } from "@lib/firebase";
import styles from './addAvisClient.module.css';
import CustomTextarea from "@components/CustomTextarea";
import { useNavigate } from "react-router-dom";

export function AddAvisClient() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors: { name?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Le prénom est requis.";
    }

    if (!message.trim()) {
      newErrors.message = "Le message est requis.";
    } else if (message.length < 10) {
      newErrors.message = "Le message est trop court (10 caractères minimum).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const avisId = uuidv4();
     console.log("→ Envoi du message en cours…");
      await setDoc(doc(db, "avis_clients", avisId), {
        name,
        message,
        date: serverTimestamp(),
      });
      console.log("✅ Message bien envoyé !");

      setName("");
      setMessage("");
      setSuccess(true);
      setSubmitted(false);

      setTimeout(() => setSuccess(false), 3000);

      // ✅ Redirection après succès seulement
      navigate("/avisClients");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.avisform}>
        <h2 className="mt-3 mb-3">Laissez votre avis</h2>

        <CustomTextField
          label="Votre prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={submitted ? errors.name : undefined}
        />

        <CustomTextarea
          label="Votre message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre témoignage ici..."
          error={submitted ? errors.message : undefined}
        />
<div className={styles.buttonContainer}>
        <Button
  label={loading ? "Envoi en cours..." : "Je poste mon avis"}
  type="submit"
  disabled={loading}
/>

      </div>
        {success && (
          <p className="success-message">Merci pour votre avis !</p>
        )}
      </form>

      
    </>
  );
}
