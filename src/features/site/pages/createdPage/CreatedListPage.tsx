// CreatedListPage.tsx
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CreatedRepositoryImpl } from "@data/created/CreatedRepositoryImpl";
import { GetAllUseCase } from "@usecases/createdUseCase/getAllUseCase";
import type { Created } from "@entities/created";
import CustomCard from "@components/CustomCard";
import styles from "./createdListPage.module.css"


function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface Props {
  isCustomPage?: boolean;
}

const CreatedListPage: React.FC<Props> = ({ isCustomPage = false }) => {
  const location = useLocation();
   console.log("location.pathname:", location.pathname);
  const pathParts = location.pathname.split("/").filter(Boolean);
  console.log("pathParts:", pathParts);
    const collection = pathParts.length > 0 ? pathParts[0] : "";
const rawCategory = pathParts.length > 1 ? pathParts[1].toLowerCase() : "";
const category = rawCategory; // utilisé pour le filtre Firestore
const displayCategory = capitalizeFirstLetter(rawCategory); // utilisé pour l'affichage

  console.log("Extracted collection:", collection);
  console.log("Extracted category:", category);
  const [items, setItems] = useState<Created[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    const repo = new CreatedRepositoryImpl();
    const useCase = new GetAllUseCase(repo);

    let itemsToDisplay: Created[] = [];

    if (isCustomPage) {
      // 🔁 Appelle la méthode spéciale pour les personnalisables
      itemsToDisplay = await repo.getCustomProducts(category);
      console.log("category passed to getCustomProducts:", category);

    } else {
      const filters: any = {};
      if (collection) filters.collection = collection;
      if (category) filters.category = category;
      itemsToDisplay = await useCase.execute(filters);
    }

    setItems(itemsToDisplay);
    setLoading(false);
  };

  fetchData();
}, [collection, category, isCustomPage]);



   if (loading) return <p>Chargement...</p>;

  return (
    <div>
    <h1 style={{ textTransform: "capitalize" }}>
  {isCustomPage
    ? `Personnalisable - ${displayCategory}`
    : `${collection} - ${displayCategory}`}
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