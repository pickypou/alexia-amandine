import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatedRepositoryImpl } from "@data/created/CreatedRepositoryImpl";
import { GetAllUseCase } from "@usecases/createdUseCase/getAllUseCase";
import type { Created } from "@entities/created";
import CustomCard from "@components/CustomCard";

interface Props {
  isCustom?: boolean;
}

const CreatedListPage: React.FC<Props> = ({ isCustom = false }) => {
  const { collection, category } = useParams();
  const [items, setItems] = useState<Created[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const repo = new CreatedRepositoryImpl();
      const useCase = new GetAllUseCase(repo);
      const all = await useCase.execute();

      let filtered: Created[] = [];

      if (isCustom) {
        // Affiche tous les produits personnalisables, quelle que soit leur collection
        filtered = all.filter(
          (item) =>
            item.custom === true &&
            item.category.toLowerCase() === category?.toLowerCase()
        );
      } else {
        // Affiche les produits normaux d'une collection précise
        filtered = all.filter(
          (item) =>
            item.collection.toLowerCase() === collection?.toLowerCase() &&
            item.category.toLowerCase() === category?.toLowerCase()
        );
      }

      setItems(filtered);
      setLoading(false);
    };

    fetch();
  }, [collection, category, isCustom]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}>
        {isCustom ? `Personnalisables – ${category}` : `${collection} – ${category}`}
      </h1>

      {items.length === 0 ? (
        <p>Aucun élément trouvé pour cette catégorie.</p>
      ) : (
        <div className="card-container">
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
