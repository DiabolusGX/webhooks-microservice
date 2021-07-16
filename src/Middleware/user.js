import passport from 'passport';

// check if logged in user us is admin
export const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// check if logged in
export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// passport login middleware
export const loginMiddleware = passport.authenticate('local');