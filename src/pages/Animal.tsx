import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IAnimal } from "../models/IAnimal";
import { useNavigate } from "react-router";
import noImage from "../assets/no-image.png";
import chinchilla from "../assets/Chinchilla.jpg";
import häst from "../assets/häst.jpg";

export const Animal = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<IAnimal | null>(null);
  const [isFed, setIsFed] = useState(false);
  const [lastFed, setLastFed] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const storedAnimals = JSON.parse(localStorage.getItem("animals") || "{}");

    if (storedAnimals[id]) {
      setAnimal(storedAnimals[id]);
    } else {
      const getAnimal = async () => {
        try {
          const response = await fetch(
            `https://animals.azurewebsites.net/api/animals/${id}`
          );
          if (!response.ok) throw new Error("Failed to fetch animal");

          const data: IAnimal = await response.json();
          setAnimal(data);

          localStorage.setItem(
            "animals",
            JSON.stringify({ ...storedAnimals, [id]: data })
          );
        } catch (error) {
          console.error("Error fetching animal:", error);
        }
      };

      getAnimal();
    }

    const fedData = JSON.parse(localStorage.getItem("fedAnimals") || "{}");
    if (fedData[id]) {
      setIsFed(true);
      setLastFed(fedData[id].lastFed);
    }
  }, [id]);

  const handleFeed = () => {
    if (!animal || !id) return;

    const currentTime = new Date().toLocaleString();

    const storedData = JSON.parse(localStorage.getItem("fedAnimals") || "{}");
    storedData[id] = { isFed: true, lastFed: currentTime };
    localStorage.setItem("fedAnimals", JSON.stringify(storedData));

    setIsFed(true);
    setLastFed(currentTime);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!animal) return <div className="loader"></div>;

  return (
    <div>
      <div className="animal-description-container">
        <h2>{animal.name}</h2>
        <p>{animal.latinName}</p>
        <img
          src={animal.imageUrl}
          alt={animal.name}
          onError={(e) => {
            if (animal.id === 8) {
              e.currentTarget.src = häst;
            } else if (animal.id === 13) {
              e.currentTarget.src = chinchilla;
            } else {
              e.currentTarget.src = noImage;
            }
          }}
        />
        <p>{animal.shortDescription}</p>

        <button onClick={handleFeed} disabled={isFed}>
          Mata djur
        </button>
        <p>Senast matad: {lastFed}</p>
      </div>
      <button className="back-button" onClick={goBack}>
        Tillbaka till djuren
      </button>
    </div>
  );
};
