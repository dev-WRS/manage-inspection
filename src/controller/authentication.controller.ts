import { NextFunction, Request, Response } from 'express';
import { getErrorMessage } from '../shared/error.shared';

const NAMESPACE = 'Auth Controller';

const login = (req: Request, res: Response) => {
    try {
        res.status(200).json(req.user).end(); 
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        // logger.error(`Error occurred while logging in user - ${errorMessage}`, { label: NAMESPACE });
        return res.status(400).send({ message: `Error occurred while logging in user - ${errorMessage}` });
    }
}

const successLogIn = (req: Request, res: Response) => {
    try {
        res.status(200).json(req.user).end(); 
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        // logger.error(`Error occurred while logging in user - ${errorMessage}`, { label: NAMESPACE });
        return res.status(400).send({ message: `Error occurred while logging in user - ${errorMessage}` });
    }
}

const failureLogIn = (req: Request, res: Response) => {
    try {
        res.status(400).json({message: 'Failed Log In'}).end(); 
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        // logger.error(`Error occurred while logging in user - ${errorMessage}`, { label: NAMESPACE });
        return res.status(400).send({ message: `Error occurred while logging in user - ${errorMessage}` });
    }
}

const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.logout((error: any) => {
            if (error) {
                return next(error);
            }
            res.send('bye');
        }
        );
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        // logger.error(`Error occurred while logging in user - ${errorMessage}`, { label: NAMESPACE });
        return res.status(400).send({ message: `Error occurred while logging out user - ${errorMessage}` });
    }
}

export default { login, successLogIn, failureLogIn, logout };