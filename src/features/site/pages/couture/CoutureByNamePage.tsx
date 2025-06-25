import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatedRepositoryImpl } from "@data/created/CreatedRepositoryImpl";
import { GetAllUseCase } from "@usecases/createdUseCase/getAllUseCase";
import type { Created } from "@entities/created";
import CustomCard from "@components/CustomCard";

const CoutureByNamePage: React.FC = () => {
  const { category } = useParams();
  const [items, setItems] = useState<Created[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const repo = new CreatedRepositoryImpl();
      const useCase = new GetAllUseCase(repo);
      const all = await useCase.execute();
      const filtered = all.filter(
        (item) => item.name.toLowerCase() === category?.toLowerCase()
      );
      setItems(filtered);
      setLoading(false);
    };
    fetch();
  }, [category]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{category}</h1>

      {items.length === 0 ? (
        <p>Aucun élément trouvé pour cette catégorie.</p>
      ) : (
        <div>
          {items.map((item) => (
            <CustomCard
              key={item.id}
              name={item.name}
              description={item.description}
              imageUrl={
                typeof item.imageUrl === "string" ? item.imageUrl : undefined
              }
              price={item.price}
              
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoutureByNamePage;
