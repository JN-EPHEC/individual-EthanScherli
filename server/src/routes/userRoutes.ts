import { Router} from 'express';
import User from '../models/User'; // Le nouveau : Import du modèle DB
import * as userController from '../controllers/userController';
import { checkIdParam } from '../middlewares/checkIdParams';



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
router.get("/", userController.getAllUsers)
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur dans les données envoyées
 */
router.post("/", userController.createUsers)
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur via son ID
 *     tags: [Users]
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: L'ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       400:
 *         description: ID invalide
 */
router.delete("/:id",checkIdParam , userController.deleteUsers)

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


