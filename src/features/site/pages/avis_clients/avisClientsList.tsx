import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "@components/Button";
import { db } from "@lib/firebase";
import styles from './avisClientsList.module.css'
import { Carousel } from "react-bootstrap";

export interface AvisClient {
  id: string;
  name: string;
  message: string;
  date: Date;
}


export function AvisClientsList() {
  const [avisClients, setAvisClients] = useState<AvisClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const q = query(
          collection(db, "avis_clients"),
          orderBy("date", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const avisList: AvisClient[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          avisList.push({
            id: doc.id,
            name: data.name,
            message: data.message || data.commentaire,
            date: data.date?.toDate() || new Date()
          });
        });
        
        setAvisClients(avisList);
      } catch (err) {
        console.error("Erreur de récupération des avis:", err);
        setError("Impossible de charger les avis");
      } finally {
        setLoading(false);
      }
    };

    fetchAvis();
  }, []);

  if (loading) return <div className="text-center py-8">Chargement des avis...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="mb-5 mt-5">Témoignages clients</h1>

      {avisClients.length === 0 ? (
        <div className="text-center py-8">Aucun avis pour le moment.</div>
      ) : (
        <Carousel
          indicators={false}
          interval={6000}
          className="mb-5"
          prevIcon={<span className={styles.customchevron}>‹</span>}
          nextIcon={<span className={styles.customchevron}>›</span>}
        >
          {avisClients.map(({ id, name, message, date }) => (
            <Carousel.Item key={id}>
              <div
                className="p-4 bg-with shadow rounded mx-auto mt-5 mb-5"
                style={{ maxWidth: "600px" }}
              >
                <small className="text-muted text-center">
                  {date.toLocaleDateString("fr-FR")}
                </small>
                <h5 className="mb-1 text-center">{name}</h5>
                <p className="mt-4 fst-italic">"{message}"</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <div className={styles.button}>
        <Button label={"Je laisse un avis"} redirectTo="/addavisClient" />
      </div>
    </div>
  );
}
