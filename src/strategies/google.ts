import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback, _StrategyOptionsBase } from "passport-google-oauth20";

const options: _StrategyOptionsBase = {
    clientID: process.env.GOOGLE_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
    callbackURL: process.env.GOOGLE_REDIRECT_URL || '',
    scope:['email', 'profile']
}
passport.use(
    new GoogleStrategy(options,
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            console.log(`profile-: ${profile}`);
            console.log(`accessToken-: ${accessToken}`);
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