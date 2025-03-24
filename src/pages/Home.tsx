import zoo from "../assets/zoo.jpg";

export const Home = () => {
  return (
    <section className="zoo-container">
      <div className="zoo-welcome">
        <h1>Välkommen till vår Zoo! 🐇🌿</h1>
        <p>
          Upptäck en värld full av fantastiska djur från alla hörn av planeten.
          Vår djurpark är hem för många arter, och vi ser till att de får bästa
          möjliga omsorg.
        </p>
        <img src={zoo} alt="Zoo" className="zoo-image" />
      </div>
    </section>
  );
};
