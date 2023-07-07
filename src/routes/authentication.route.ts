import { Router, Request, Response } from 'express';
import passport from 'passport';

import isLoggedIn from '../middleware/authentication.middleware';
import authenticationController from '../controller/authentication.controller';

const router = Router();

router.get('/google', passport.authenticate('google'), authenticationController.login);
router.get('/google/redirect', passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
    successRedirect: '/auth/success'    
}));
router.get('/success', isLoggedIn, authenticationController.successLogIn);
router.get('/google/failure', authenticationController.failureLogIn);
router.get('/logout',authenticationController.logout)
export default router;