import { Router} from 'express';
import User from '../models/User'; // Le nouveau : Import du modèle DB
import * as userController from '../controllers/userController';



const router = Router();
/**
* @swagger
* /api/users:
*  get:
*    summary: Récupère la liste des utilisateurs
*    tags: [Users]
*    responses:
*      200:
*      description: Succès
*/
router.get('/', userController.getAllUsers);
router.get("/", userController.getAllUsers)
router.post("/", userController.createUsers)
router.delete("/:id", userController.deleteUsers)

export default router;
/*
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
*/


