const userList = document.getElementById('users-list');
const form = document.getElementById('add-user-form');

async function fetchUsers() { // utilisation de async pour pouvoir utiliser await 
    try {
        const response = await fetch('/api/users'); 
        const users = await response.json();
        userList.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.className ="list-group-item d-flex justify-content-between align-items-center";
            const textSpan = document.createElement('span');
            textSpan.textContent = `${user.prenom} ${user.nom}`;;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "X";
            deleteBtn.className = "btn btn-danger btn-sm"; 
            deleteBtn.onclick = () => deleteUser(user.id);

            li.appendChild(textSpan);
            li.appendChild(deleteBtn);
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;

    try {
        await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom })
        });

        fetchUsers();
        form.reset();
        
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
    }
});

async function deleteUser(id) {
    if(!confirm("Êtes-vous sûr ?")) return; // Petite sécurité

    try {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        fetchUsers(); // Important : on recharge la liste après !
    } catch (error) {
        console.error("Erreur effacement", error);
    }
}

fetchUsers();

// Test pour la branche homework_1