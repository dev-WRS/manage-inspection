import { Router } from 'express';
import passport from 'passport';

import authenticationController from '@controllers/authentication.controller';
import { isAuthenticated } from '@middleware/authentication.middleware';

const router = Router();

router.get('/google', passport.authenticate('google'), authenticationController.login);
router.get('/google/redirect', passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
    successRedirect: '/auth/success'    
}));
router.get('/success', isAuthenticated,  authenticationController.successLogIn);
router.get('/google/failure', authenticationController.failureLogIn);
router.get('/logout', isAuthenticated,authenticationController.logout)
export default router;