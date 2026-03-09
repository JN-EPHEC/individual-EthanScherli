import React, { useEffect, useState } from "react";

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauPrenom, setNouveauPrenom] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json();
      setData(users);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nouveauNom, prenom: nouveauPrenom })
      });
      setNouveauNom("");
      setNouveauPrenom("");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  const deleteUser = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr ?")) return;
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (error) {
      console.error("Erreur effacement", error);
    }
  };

  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "700px" }}>
      <h1 className="mb-4 text-center">Liste des étudiants</h1>

      <div className="card p-4 shadow-sm">
        <h3 className="mb-3">Ajouter un étudiant</h3>
        <form onSubmit={addUser}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              value={nouveauNom}
              onChange={(e) => setNouveauNom(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Prénom"
              value={nouveauPrenom}
              onChange={(e) => setNouveauPrenom(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ajouter</button>
        </form>
      </div>

      <hr className="my-4" />

      <ul className="list-group mb-4 shadow-sm">
        {data.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span><strong>{user.prenom}</strong> {user.nom}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteUser(user.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;