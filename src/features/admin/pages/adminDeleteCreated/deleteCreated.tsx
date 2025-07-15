import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import type { Created } from "@entities/created";
import CustomCard from "@components/CustomCard";
import styles from "./deleteCreated.module.css";
import AppBarAdmin from "@components/AppBbarAdmin";
import { getStorage, ref, deleteObject } from "firebase/storage";


export default function DeleteCreated() {
  const [items, setItems] = useState<Created[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, "created"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Created[];
      setItems(list);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
  if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;

  // Trouver l'élément à supprimer pour récupérer l'URL de l'image
  const itemToDelete = items.find(item => item.id === id);
  if (!itemToDelete) return;

  try {
    // Supprimer l'image de Firebase Storage
    if (typeof itemToDelete.imageUrl === "string" && itemToDelete.imageUrl) {
      const storage = getStorage();
      // Extraire le chemin relatif à partir de l’URL Firebase Storage
      const decodedUrl = decodeURIComponent(itemToDelete.imageUrl);
      const pathMatch = decodedUrl.match(/\/o\/(.+)\?alt=/);
      const filePath = pathMatch?.[1];
      
      if (filePath) {
        const imageRef = ref(storage, filePath);
        await deleteObject(imageRef);
        console.log("Image supprimée du storage :", filePath);
      }
    }

    // Supprimer le document Firestore
    await deleteDoc(doc(db, "created", id));
    setItems((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Erreur lors de la suppression de l'élément.");
  }
};

  if (loading) return <p>Chargement...</p>;

  return (
    <>
    <AppBarAdmin />
    <div>
      <h1>Supprimer une création</h1>
      {items.length === 0 ? (
        <p>Aucun élément à supprimer</p>
      ) : (
        <div className={styles.cardContainer}>
          {items.map((item) => (
            <CustomCard
              key={item.id}
              name={item.name}
              description={item.description}
             imageUrl={typeof item.imageUrl === "string" ? item.imageUrl : undefined}
              price={item.price}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}
    </div>
    </>
  );
}
