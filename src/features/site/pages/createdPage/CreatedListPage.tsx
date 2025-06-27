// CreatedListPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatedRepositoryImpl } from "@data/created/CreatedRepositoryImpl";
import { GetAllUseCase } from "@usecases/createdUseCase/getAllUseCase";
import type { Created } from "@entities/created";
import CustomCard from "@components/CustomCard";
import styles from "./createdListPage.module.css"

interface Props {
  isCustomPage?: boolean;
}

const CreatedListPage: React.FC<Props> = ({ isCustomPage = false }) => {
  const { collection = "", category = "" } = useParams();
  const [items, setItems] = useState<Created[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const repo = new CreatedRepositoryImpl();
      const useCase = new GetAllUseCase(repo);
      const allItems = await useCase.execute();

      const filteredItems = allItems.filter(item => {
        // Vérification obligatoire de la catégorie
        const categoryMatch = item.category.toLowerCase() === category.toLowerCase();
        
        if (isCustomPage) {
          // Page personnalisable : seulement les custom=true
          return categoryMatch && item.custom === true;
        } else {
          // Page normale : tous les produits de la collection + catégorie
          const collectionMatch = collection 
            ? item.collection.toLowerCase() === collection.toLowerCase()
            : true;
          return categoryMatch && collectionMatch;
        }
      });

      setItems(filteredItems);
      setLoading(false);
    };

    fetchData();
  }, [collection, category, isCustomPage]);

   if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}>
        {isCustomPage ? `Personnalisables  ${category}` : `${collection}  ${category}`}
      </h1>

      {items.length === 0 ? (
        <p>Aucun élément trouvé pour cette catégorie.</p>
      ) : (
        <div className={styles.cardContainer}>
          {items.map((item) => (
            <CustomCard
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={typeof item.imageUrl === "string" ? item.imageUrl : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};



export default CreatedListPage;