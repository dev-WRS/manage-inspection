import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { config } from 'dotenv';
config();

import authRoutes from './routes/authentication.route';

require('./strategies/google');

async function bootstrap() {
    const app = express();
    app.use(session({
        secret: 'manage-inspection',
        resave: false,
        saveUninitialized: false
    }));
    const PORT = process.env.PORT;

    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', authRoutes);

    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

bootstrap();