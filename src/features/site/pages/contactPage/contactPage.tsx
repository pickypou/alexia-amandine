import { Row, Col, Card, Container } from "react-bootstrap";
import Button from "@components/Button";
import CustomTextField from "@components/CustomTextField";
import CustomTextarea from "@components/CustomTextarea";
import { useState } from "react";
import styles from "./contactPage.module.css";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://sendmail-cgrahh5xja-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setStatus("success");
      setNom("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Erreur:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <>
    <h1 className="mt-2">Contactez-nous</h1>
    <Container className={`${styles.contactPage} py-4`}>
      <Row>
        {/* Colonne des cartes */}
        <Col md={4} className="mb-4">
         <Card className={styles.card}>
  <Card.Body className={styles.cardBody}>
    <Card.Title className={styles.title}>La petite fée crochette </Card.Title>
    <Card.Text>
  <p>Sur les réseaux</p>
  <div className={styles.iconRow}>
    <a href="https://www.instagram.com/lapetitefeecrochette2?igsh=MWhhbTFldGI2ZDdjaQ==" target="_blank" rel="noreferrer">
      <img src="images/logo-insta.png" alt="Logo insta" className={styles.img} />
    </a>

    <a href="https://www.facebook.com/share/16fpJ7BJsa/" target="_blank" rel="noreferrer">
      <img src="images/facebook.png" alt="logo facebook"  className={styles.img}  />
    </a>

    <a href="https://lapetitefeecrochettebyamandine.sumupstore.com/?fbclid=IwY2xjawLTORZleHRuA2FlbQIxMQABHmxw7hBllQNGC6-NxLZ6JKwAY6p1BiMildfb98-psUR0PDBxGLvh4358-oE0_aem_CS0iharyn-0tBVMvisTTUg" target="_blank" rel="noreferrer">
      <img src="images/sumup.png" alt="Logo sumup" className={styles.img} />
    </a>
  </div>
</Card.Text>

  </Card.Body>
</Card>
<Card className={styles.card}>
  <Card.Body className={styles.cardBody}>
    <Card.Title className={styles.title}>Les petites créas d'Alexia</Card.Title>
    <Card.Text>
      <p>Sur les réseaux</p>
      <div className={styles.iconRow}>
    
      <a href="https://www.instagram.com/lespetitescreasdalexia?igsh=OWVhNjVqZzh1YTFk" target="_blank" rel="noreferrer">
      <img src="images/logo-insta.png" alt="Logo insta" className={styles.img} />
      </a>
      <br />
    
      <a href="https://www.facebook.com/share/14FBg5SgbzH/" target="_blank" rel="noreferrer">
        <img src="images/facebook.png" alt="logo facebook"  className={styles.img} />
      </a>
      <br />
    
      <a
        href="https://lespetitescreasdalexia.sumupstore.com/?fbclid=IwY2xjawLTORZleHRuA2FlbQIxMQABHmxw7hBllQNGC6-NxLZ6JKwAY6p1BiMildfb98-psUR0PDBxGLvh4358-oE0_aem_CS0iharyn-0tBVMvisTTUg"
        target="_blank"
        rel="noreferrer"
      >
      <img src="images/sumup.png" alt="logo sumup" className={styles.img} />
      </a>
      </div>
    </Card.Text>
  </Card.Body>
</Card>


        </Col>

        {/* Colonne formulaire */}
        <Col md={8}>
          <form onSubmit={handleSubmit}>
            

            <CustomTextField
              label="Nom (obligatoire)"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              id="nom"
              name="nom"
              
              className="mb-3"
            />

            <CustomTextField
              label="Email (obligatoire)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              name="email"
              className="mb-3"
            />

            <CustomTextarea
              label="Message (obligatoire)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"

            />

            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                disabled={status === "sending"}
                label={status === "sending" ? "Envoi en cours..." : "Envoyer"}
              />
            </div>

            {status === "success" && <p className="text-success mt-3">Message envoyé ✅</p>}
            {status === "error" && <p className="text-danger mt-3">Erreur lors de l’envoi ❌</p>}
          </form>
        </Col>
      </Row>
    </Container>

    </>
  );
}
