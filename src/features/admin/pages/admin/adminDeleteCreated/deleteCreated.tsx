import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import type { Created } from "@entities/created";
import CustomCard from "@components/CustomCard";
import styles from "./deleteCreated.module.css";

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
    await deleteDoc(doc(db, "created", id));
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) return <p>Chargement...</p>;

  return (
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
  );
}
