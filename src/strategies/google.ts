import passport from "passport";
import { Strategy, Profile, VerifyCallback,
        _StrategyOptionsBase } from "passport-google-oauth20";

import { successLogin } from "@services/authentication.service";

const options: _StrategyOptionsBase = {
    clientID: process.env.GOOGLE_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
    callbackURL: process.env.GOOGLE_REDIRECT_URL || '',
    scope:['email', 'profile']
}
passport.use(
    new Strategy(options,
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            successLogin(profile, accessToken);

            return done(null, profile);
        }
    )
);

passport.serializeUser((user: Express.User, done: VerifyCallback) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done: VerifyCallback) => {
    done(null, user);
});