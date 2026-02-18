import { Router, Request, Response } from 'express';
import User from '../models/User'; // Le nouveau : Import du modèle DB

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Erreur création" });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Supprimé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur suppression" });
    }
});

router.get('/search/:email', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { email: req.params.email } });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur recherche" });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nom, prenom, email } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: "Format d'email invalide" });
        }

        if (!nom || !prenom) {
            return res.status(400).json({ error: "Nom et Prénom sont obligatoires" });
        }

        const newUser = await User.create({ nom, prenom, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la création (Email déjà utilisé ?)" });
    }
});

export default router;

/*import {Router, Request, Response } from 'express';
const router = Router();

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

router.get('/', (req: Request, res: Response) => {
    res.json(users);
});

export default router;

*/
