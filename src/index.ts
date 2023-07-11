import express from 'express';
import session from 'express-session';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieSession from "cookie-session";
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import passport from 'passport';

import { config } from 'dotenv';
config();

import authRoutes from '@routes/authentication.route';
import { logger } from '@shared/logging.shared';

const NAMESPACE = 'Server';

require('./strategies/google');

async function bootstrap() {
    const app = express();

    app.use(cors({credentials: true}));
    app.use(compression());
    // app.use(cookieParser());
    app.use(bodyParser.json());

    app.use(session({
        secret: 'manage-inspection',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    }));

    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGO_URL || '').then(() => {
        console.log('MongoDB connected');
        logger.info('MongoDB connected.', { label: NAMESPACE });
    }).catch((error) => {
        console.error('Data error connection:', error);
        logger.error(`Data error connection: ${error}`, { label: NAMESPACE });
    });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
            return res.status(200).json({});
        }
    
        next();
    });

    // app.use(
    //     cookieSession({
    //       name:"google-auth-session",
    //       maxAge: 24 * 60 * 60 * 1000,
    //       keys: ['key1', 'key2'],
    //     })
    //   );

    const PORT = process.env.PORT;

    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', authRoutes);

    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            logger.info(`Server running on port ${PORT}`, { label: NAMESPACE });
        });
    } catch (err) {
        console.log(err);
    }
}

bootstrap();