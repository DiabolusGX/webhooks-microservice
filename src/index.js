import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import Database from './database/index.js';
import Routers from './routers/index.js';

import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import sessions from 'client-sessions';
import User from './database/Models/User.js';

// create app
const app = express();
// json encoding
app.use(json());
app.use(urlencoded({ extended: false }));

// configure session
app.use(sessions({
    cookieName: 'session',
    secret: process.env.SESSION_SECRET,
    duration: 2 * 30 * 60 * 1000, // valid session for 1 hour
    activeDuration: 10 * 60 * 1000, // active session for 10 minutes
    active: true, // enable session
    cookie: {
        httpOnly: true, // not accessible from javascript
        ephemeral: true, // expires when browser is closed
        secure: process.env.NODE_ENV === 'production' // if secure, cookie will only be sent over HTTPS
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const dbUser = await User.findOne({ username: username });
        if (!dbUser) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        try {
            const isValid = await bcrypt.compare(password, dbUser.password);
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, dbUser);
        } catch (err) {
            return done(err);
        }
    }
));


// use routers
app.use(Routers);


// connect to database and start server
const port = process.env.PORT || 3000;
Database.then((connection) => {
    console.log(`Connected to database ${connection.connections[0].name}`);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});