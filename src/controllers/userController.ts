import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error: any) {
        next(error);
    }
};

export const createUsers = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUsers = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Supprimé" });
    } catch (error) {
        next(error);
    }
}