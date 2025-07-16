import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import Button from "@components/Button";
import CustomTextField from "@components/CustomTextField";
import styles from './addCreated.module.css';
import CustomTextarea from "@components/CustomTextarea";
import AppBarAdmin from "@components/AppBbarAdmin";
function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
const collections = ["couture", "papier", "crochet", "personnalisable"];
const categoriesByCollection = {
    couture: ["sac", "trousse-pochette", "accessoire", "divers"],
    papier: ["emballage", "decoration", "accessoire", "divers", "fete-evenement"],
    crochet: ["peluche", "poupee", "composition-florale", "accessoire", "sac-a-main", "couverture-c2c"],
    personnalisable: ["sac", "trousse", "textile", "adhéssif", "tasse-gobelet", "accessoire", "fete-evenement"]
};
export default function AddCreated() {
    const [collectionName, setCollectionName] = useState(collections[0]);
    const [category, setCategory] = useState(categoriesByCollection[collections[0]][0]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [customizable, setCustomizable] = useState(false);
    const [file, setFile] = useState(null);
    // Activation automatique du champ custom si on choisit "personnalisable"
    useEffect(() => {
        if (collectionName === "personnalisable") {
            setCustomizable(true);
        }
    }, [collectionName]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Veuillez sélectionner une image");
            return;
        }
        try {
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = ref(storage, `created/${fileName}`); // Dossier unique
            const snapshot = await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(snapshot.ref);
            await addDoc(collection(db, "created"), {
                collection: normalize(collectionName),
                category: normalize(category),
                name,
                description,
                price,
                customizable: collectionName === "personnalisable" ? true : customizable,
                imageUrl,
                createdAt: new Date().toISOString(),
            });
            alert("Création ajoutée !");
            // Reset formulaire
            setName("");
            setDescription("");
            setPrice("");
            setFile(null);
            setCategory(categoriesByCollection[collectionName][0]);
            if (collectionName !== "personnalisable")
                setCustomizable(false);
        }
        catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Erreur lors de l'ajout, veuillez réessayer.");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(AppBarAdmin, {}), _jsxs("form", { onSubmit: handleSubmit, className: styles.formContainer, children: [_jsx("label", { children: "Collection" }), _jsx("select", { value: collectionName, onChange: (e) => {
                            setCollectionName(e.target.value);
                            setCategory(categoriesByCollection[e.target.value][0]);
                        }, children: collections.map((col) => (_jsx("option", { value: col, children: col }, col))) }), _jsx("label", { children: "Cat\u00E9gorie" }), _jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), children: categoriesByCollection[collectionName].map((cat) => (_jsx("option", { value: cat, children: cat }, cat))) }), _jsx(CustomTextField, { label: "Nom", type: "text", value: name, onChange: (e) => setName(e.target.value), required: true }), _jsx(CustomTextarea, { label: "Je d\u00E9crit ma cr\u00E9ation", value: description, onChange: (e) => setDescription(e.target.value) }), _jsx(CustomTextField, { label: "Prix", type: "text", value: price, onChange: (e) => setPrice(e.target.value), required: true }), collectionName !== "personnalisable" && (_jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: customizable, onChange: (e) => setCustomizable(e.target.checked) }), "Personnalisable"] })), _jsx(CustomTextField, { label: "Image", type: "file", accept: "image/*", onChange: (e) => setFile(e.target.files?.[0] || null), required: true }), _jsx(Button, { type: "submit", label: "Ajouter" })] })] }));
}
