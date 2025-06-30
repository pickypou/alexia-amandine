import Button from "@components/Button";


const AdminPage = () => {
  return (
    <div>
      <h1 className="mt-5">Bienvenue sur la page administration </h1>
     
      <div className ="button-container">
              <Button type="submit" label="Je me connecte" redirectTo="/admin/login" />
              <Button type="submit" label="retour sur le site " redirectTo="/" />

      </div>
    </div>
  );
}
export default AdminPage;