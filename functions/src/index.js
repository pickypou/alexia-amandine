import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as nodemailer from "nodemailer";
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASSWORD = defineSecret("SMTP_PASSWORD");
export const sendMail = onRequest({
    cors: true,
    secrets: [SMTP_USER, SMTP_PASSWORD],
    timeoutSeconds: 60, // Augmentez le timeout
    memory: "512MiB", // Augmentez la mémoire
}, async (req, res) => {
    // Vérification de la méthode HTTP
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    // Validation du corps de la requête
    if (!req.body || typeof req.body !== "object") {
        res.status(400).json({ error: "Corps de requête invalide" });
        return;
    }
    const { nom, email, message } = req.body;
    if (!nom || !message) {
        res.status(400).json({ error: "Nom et message sont requis." });
        return;
    }
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: SMTP_USER.value(),
                pass: SMTP_PASSWORD.value(),
            },
        });
        await transporter.sendMail({
            from: `"Site Féerique" <${SMTP_USER.value()}>`,
            to: SMTP_USER.value(),
            subject: `Message de ${nom}`,
            text: `Nom: ${nom}\nEmail: ${email || "Non fourni"}\n\nMessage:\n${message}`,
            replyTo: email || undefined,
        });
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Erreur complète:", error);
        res.status(500).json({
            error: "Erreur serveur",
            details: error instanceof Error ? error.message : String(error),
        });
    }
});
