

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddCouture() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis !");

    if (!file) return alert("Veuillez sélectionner une image");

    // 1. Upload sur Storage
    const storageRef = ref(storage, `couture/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);

    // 2. Récupération de l’URL
    const imageUrl = await getDownloadURL(snapshot.ref);

    // 3. Enregistrement dans Firestore
    await addDoc(collection(db, "couture"), {
      name,
      description,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    alert("Couture ajoutée !");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
