import { useState } from "react";
import styles from "./contactPage.module.css";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus("sending");

  try {
    const response = await fetch("https://sendmail-cgrahh5xja-uc.a.run.app", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, email, message }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erreur lors de l'envoi");
    }

    setStatus("success");
    // Réinitialisation du formulaire
    setNom("");
    setEmail("");
    setMessage("");
    
    // Réinitialiser le statut après 5 secondes
    setTimeout(() => setStatus("idle"), 5000);
    
  } catch (err) {
    console.error("Erreur:", err);
    setStatus("error");
    setTimeout(() => setStatus("idle"), 5000);
  }
};

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Contactez-nous</h2>

      <label htmlFor="nom">Nom</label>
      <input
        type="text"
        id="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />

      <label htmlFor="email">Email (facultatif)</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours..." : "Envoyer"}
      </button>

      {status === "success" && <p className={styles.success}>Message envoyé ✅</p>}
      {status === "error" && <p className={styles.error}>Erreur lors de l’envoi ❌</p>}
    </form>
  );
}

