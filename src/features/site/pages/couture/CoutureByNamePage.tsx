import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoutureRepositoryImpl } from "@data/couture/CoutureRepositoryImpl";
import { GetAllCoutureUseCase } from "@usecases/couture/getAllCoutureUseCase";
import type { Couture } from "@entities/Couture";

const CoutureByNamePage: React.FC = () => {
  const { category } = useParams();
  const [items, setItems] = useState<Couture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const repo = new CoutureRepositoryImpl();
      const useCase = new GetAllCoutureUseCase(repo);
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
    <div className="container mt-4">
      <h2 className="mb-4 text-uppercase">{category}</h2>
      {items.length === 0 ? (
        <p>Aucun élément trouvé pour cette catégorie.</p>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100 shadow">
                <img
  src={typeof item.imageUrl === "string" ? item.imageUrl : URL.createObjectURL(item.imageUrl)}
  className="card-img-top"
  alt={item.name}
/>

                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                 
                  {/* <a href={`/details/${item.id}`} className="btn btn-primary">Voir plus</a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoutureByNamePage;
