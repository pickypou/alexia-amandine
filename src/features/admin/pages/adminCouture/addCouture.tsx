

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import CustomTextField from "@components/CustomTextField";
import Button from "@components/Button";


export default function AddCouture() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [custom, setCustom] = useState(false)

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
      price,
      createdAt: new Date().toISOString(),
    });

    alert("Couture ajoutée !");
  };

  return (
    <div className="center-screen">
      <h1>Ajouter une création couture</h1>
    <form onSubmit={handleSubmit}>
      
      <CustomTextField
            label="Nom"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
      <CustomTextField
            label="Description"
            type="textArea"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            required
          />
      <CustomTextField
            label="Price"
            type="email"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            required
          />
          <CustomTextField
            label="Je choisi une image"
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)}
            required
          />
          <label style={{ marginTop: "1rem" }}>
  <input
    type="checkbox"
    checked={custom}
    onChange={(e) => setCustom(e.target.checked)}
  />
  &nbsp;Produit personnalisable ?
</label>


         

      
     
      <Button 
      label={"Ajouté"}
      type="submit"
      />
    </form>
    </div>
  );
}
