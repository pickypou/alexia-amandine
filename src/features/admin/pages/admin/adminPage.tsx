import Button from "@components/Button";


const AdminPage = () => {
  return (
    <div>
      <h1>Bienvenue sur la page administration </h1>
     
      <div className ="button-container">
             <Button type="submit" label="créer un compte" redirectTo="/admin/register" />
              <Button type="submit" label="Je me connecte" redirectTo="/admin/login" />
              <Button type="submit" label="Accieul " redirectTo="/" />

      </div>
    </div>
  );
}
export default AdminPage;