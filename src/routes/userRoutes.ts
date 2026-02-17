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
