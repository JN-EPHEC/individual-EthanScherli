import { useEffect, useState } from "react";

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {/* 2. On affiche le nom ET le prénom ici */}
        {data.map((item) => (
          <li key={item.id}>{item.prenom} {item.nom}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;