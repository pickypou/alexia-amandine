import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import Button from "@components/Button";
import CustomTextField from "@components/CustomTextField";
import styles from './addCreated.module.css'
import CustomTextarea from "@components/CustomTextarea";
import AppBarAdmin from "@components/AppBbarAdmin";

function normalize(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}


const collections = ["couture", "papier", "crochet", "personnalisable"];
const categoriesByCollection: Record<string, string[]> = {
  couture: ["sac", "trousse-pochette","accessoire", "divers"],
  papier: ["emballage", "decoration", "accessoire", "divers", "fete-evenement"],
  crochet: ["peluche", "poupee","composition-florale", "accessoire", "sac-a-main","couverture-c2c"],
  personnalisable : ["sac", "trousse","textile", "adhéssif", "tasse-gobelet", "accessoire", "fete-evenement"]
  
};

export default function AddCreated() {
  const [collectionName, setCollectionName] = useState(collections[0]);
  const [category, setCategory] = useState(categoriesByCollection[collections[0]][0]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [customizable, setCustomizable] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Activation automatique du champ custom si on choisit "personnalisable"
  useEffect(() => {
    if (collectionName === "personnalisable") {
      setCustomizable(true);
    }
  }, [collectionName]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!file) {
    alert("Veuillez sélectionner une image");
    return;
  }

  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `created/${fileName}`); // Dossier unique
    const snapshot = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(snapshot.ref);

   await addDoc(collection(db, "created"), {
  collection: normalize(collectionName),
  category: normalize(category),
  name,
  description,
  price,
  customizable: collectionName === "personnalisable" ? true : customizable,
  imageUrl,
  createdAt: new Date().toISOString(),
});


    alert("Création ajoutée !");
    // Reset formulaire
    setName("");
    setDescription("");
    setPrice("");
    setFile(null);
    setCategory(categoriesByCollection[collectionName][0]);
    if (collectionName !== "personnalisable") setCustomizable(false);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    alert("Erreur lors de l'ajout, veuillez réessayer.");
  }
};


  return (
    <>
  <AppBarAdmin/>
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label>Collection</label>
      <select
        value={collectionName}
        onChange={(e) => {
          setCollectionName(e.target.value);
          setCategory(categoriesByCollection[e.target.value][0]);
        }}
      >
        {collections.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>

      <label>Catégorie</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categoriesByCollection[collectionName].map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <CustomTextField
        label="Nom"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <CustomTextarea 
      label="Je décrit ma création"
      value = {description}
      onChange={(e)=> setDescription(e.target.value)}
     
      />

      <CustomTextField
        label="Prix"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {collectionName !== "personnalisable" && (
        <label>
          <input
            type="checkbox"
            checked={customizable}
            onChange={(e) => setCustomizable(e.target.checked)}
          />
          Personnalisable
        </label>
      )}

      <CustomTextField
        label="Image"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />

      <Button type="submit" label="Ajouter" />
    </form>
    </>
  );
}
