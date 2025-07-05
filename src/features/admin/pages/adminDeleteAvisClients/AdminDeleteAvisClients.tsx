import { db } from "@lib/firebase";
import type { AvisClient } from "@pages/avis_clients/avisClientsList";
import { collection, deleteDoc,doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from './deleteAvis.module.css'
import CustomCard from "@components/CustomCard";
import AppBarAdmin from "@components/AppBbarAdmin";


export default function DeleteAvisClients()  {
    const [items, setItems] = useState<AvisClient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const snapshot = await getDocs(collection(db, "avis_clients"));
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as AvisClient[];
            setItems(list);
            setLoading(false);
        };
        fetchItems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Voulez vous vraiments supprimer cet élément ?")) return;
        await deleteDoc(doc(db, 'avis_clients', id));
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    if(loading) return <p>Chargement...</p>;

    return (
        <>
        <AppBarAdmin />
        <div>
            <h1>Supprimer un avis clients</h1>
            {items.length === 0 ? (
                <p>Aucun avis à supprimer</p>
            ): (
                <div className= {styles.cardContainer}>
                    {items.map((item) =>(
                        <CustomCard 
                        key={item.id}
                        name={item.name}
                        message={item.message}
                        onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </div>
            )}
        </div>
        </>
    );
}