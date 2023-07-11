import { NextFunction, Request, Response } from 'express';

import { getErrorMessage } from '@shared/error.shared';
import { logger } from '@shared/logging.shared';

const NAMESPACE = 'Auth Controller';

const login = (req: Request, res: Response) => {
    try {
        logger.info('Login process started.', { label: NAMESPACE });
        res.status(200).json(req.user).end(); 
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        logger.error(`Error occurred while logging in user - ${errorMessage}`, { label: NAMESPACE });
        return res.status(400).send({ message: `Error occurred while logging in user - ${errorMessage}` });
    }
}

const successLogIn = (req: Request, res: Response) => {
    try {
        logger.info('Login process success.', { label: NAMESPACE });
        res.status(200).json(req.user).end(); 
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        logger.error(`Error occurred while logging in user - ${errorMessage}`, { label: NAMESPACE });
        return res.status(400).send({ message: `Error occurred while logging in user - ${errorMessage}` });
    }
}

const failureLogIn = (req: Request, res: Response) => {
    try {
        logger.error('Login process failed.', { label: NAMESPACE });
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
                logger.error('Logout process end with some errors.', { label: NAMESPACE });
                return next(error);
            }
            res.status(200).send('Logout successfully.');
        }
        );
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        // logger.error(`Error occurred while logging in user - ${errorMessage}`, { label: NAMESPACE });
        return res.status(400).send({ message: `Error occurred while logging out user - ${errorMessage}` });
    }
}

export default { login, successLogIn, failureLogIn, logout };