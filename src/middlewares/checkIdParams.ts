import { Request, Response, NextFunction } from "express";

export const checkIdParam = (req : Request, res : Response, next : NextFunction) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)){
        return res.status(400).json({error: "L'id doit être un nombre entier"});
    }
    next(); 
}