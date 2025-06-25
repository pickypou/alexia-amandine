import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import type { Created } from "@entities/created";

export default function DeleteCreated() {
  const [items, setItems] = useState<Created[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, "created"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Created[];
      setItems(list);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    await deleteDoc(doc(db, "created", id));
    setItems(items.filter(item => item.id !== id));
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Supprimer une création</h1>
      {items.length === 0 ? (
        <p>Aucun élément à supprimer</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} - {item.category} 
              <button onClick={() => handleDelete(item.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
