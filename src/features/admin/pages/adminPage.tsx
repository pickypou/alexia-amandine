import Button from "@components/button";


const AdminPage = () => {
  return (
    <div>
      <h1>Bienvenue sur la page administration </h1>
      <p>Welcome to the admin page!</p>
      <div className ="button-container">
             <Button type="submit" label="créer un compte" redirectTo="/admin/register" />
              <Button type="submit" label="Je me connecte" redirectTo="/admin/login" />

      </div>
    </div>
  );
}
export default AdminPage;