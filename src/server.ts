import express, { Request, Response } from 'express';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = 3000;

app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

function greet(name: string): string {
    return `Hello, ${name}!`;
}

const etudiants = [
    {id: 1, nom: "Dupont", prenom: "Jean"},
    {id: 2, nom: "Martin", prenom: "Sophie"},
    {id: 3, nom: "Doe", prenom: "John"}
];

app.get('/api/data', (req: Request, res: Response) => {
    res.json(etudiants);
})

app.get('/api/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name as string ;

    const response = {
        message: `Bonjour ${name}`,
        timestamp: new Date()
    };
    res.json(response);
})

let message = greet("Ethan");
console.log(message); // Affiche: Hello, Ethan!