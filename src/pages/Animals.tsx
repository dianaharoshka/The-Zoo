import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { Link } from "react-router";
import noImage from "../assets/no-image.png";
import chinchilla from "../assets/Chinchilla.jpg";
import häst from "../assets/häst.jpg";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [fedAnimals, setFedAnimals] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch(
        "https://animals.azurewebsites.net/api/animals"
      );
      const data: IAnimal[] = await response.json();

      const animalsById = data.reduce(
        (acc: { [key: string]: IAnimal }, animal) => {
          acc[animal.id] = animal;
          return acc;
        },
        {}
      );
      localStorage.setItem("animals", JSON.stringify(animalsById));

      setAnimals(data);

      const storedData = JSON.parse(localStorage.getItem("fedAnimals") || "{}");
      setFedAnimals(storedData);
    };

    getAnimals();
  }, []);

  return (
    <section className="animals-container">
      {animals.map((animal) => (
        <div
          key={animal.id}
          className={`animal ${fedAnimals[animal.id] ? "fed" : ""}`}
        >
          <h4>{animal.name}</h4>
          <div className="image-container">
            <Link to={`/animal/${animal.id}`}>
              <img
                className="animal-image"
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
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};
