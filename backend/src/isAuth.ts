import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { ExtendedRequest, RequestAuth } from "./types";

const error = (req: ExtendedRequest, next: NextFunction) => {
    req.isAuth = false;
    return next();
}
export const isAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) return error(req, next);

    const token = authHeader.split(' ')[1];
    if(!token) return error(req, next);

    // Verifying token
    let decodedToken: RequestAuth;
    try {
        decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY as string) as RequestAuth;
    } catch(e) {
        return error(req, next);
    }

    // Setting context values
    req.isAuth = true;
    req.userId = decodedToken.userId;
    return next();
}