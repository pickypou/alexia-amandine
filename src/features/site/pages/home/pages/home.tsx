// HomePage.tsx
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <main>
      <h1 className={styles.title}>Le monde partagé de la</h1>
      <h2 className={styles.title}>Petite fée crochette by Amandine</h2>
      <h2 className={styles.title}>&</h2>
      <h2 className={styles.title}>Les créas d'Alexia</h2>

      <div className={styles.container}>
        <img src="images/logo.jpg" alt="Logo" className={styles.logoHome} />
      </div>

      <p>
        Deux créatrice deux univers ..
      </p>
      <p>
        Une même passion du fait main.
      </p>
      <p>
        Bienvenue dans notre monde à 4 mains, où chaque création raconte une histoire Unique. 
      </p>
      <p>
        D'un côté, la douceur d'un monde féerique.
      </p>
      <p>
        De l'autre, un tourbillon de couleurs pétillantes. Créer, Créer, Coudre, Broder ou Crocheter, avec amour et fantaisie. Deux styles deux ambiances...
      </p>
      <p>
        Il n'y a pas de frontière entre nos monde, seulement un pont de créativité et d'amitié.
      </p>
      <p>
        La fée Crochette alias Amandine n° de siret : 94151489500015.
      </p>
      <p>
        Les Créas D'Alexia n° de siret : 9427684400019.
      </p>
     
    </main>
  );
};

export default HomePage;
