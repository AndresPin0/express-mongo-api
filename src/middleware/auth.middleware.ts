import { Request, Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserRole } from "../models";
import { JwtRequest } from "../interfaces/JwtRequest.interface";

export const auth = async (req:Request, res:Response, next:NextFunction) => {

    try{
        let token = req.header('Authorization');
        if(!token){
             res.status(401).json({message: 'not authorized'});
            return;
        }
        token = token.replace('Bearer ','');
        const decoded = jwt.verify(token,'secret');
        req.body.user = decoded;
        next();
    }catch(error){
        res.status(500).json({message: 'error'});
    }
}

export const authorizeRoles = (allowedRoles: UserRole[]) => {
    return (req: JwtRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        console.log(user);
        if(user && allowedRoles.includes(user.role)){
            res.status(403).json({message: `forbidden, ypu are ${user.role} role and this service is restricted for you` });
        }
        next();
    }
}