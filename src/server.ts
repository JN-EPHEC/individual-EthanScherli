import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

function greet(name: string): string {
    return `Hello, ${name}!`;
}

let message = greet("Ethan");
console.log(message); // Affiche: Hello, Ethan!