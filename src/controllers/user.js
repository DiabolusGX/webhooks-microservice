import User from '../database/Models/User.js';
import bcrypt from 'bcrypt';

// create new user
export const signup = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const dbUser = await User.findOne({ username });
    if (dbUser) {
        return res.status(409).json({
            message: 'Username already exists'
        });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hash,
        isAdmin: isAdmin === 'true'
    });
    await newUser.save();
    return res.status(201).json({
        message: 'User created',
        user: newUser
    });
}

// user log in
export const login = async (req, res) => {
    const { username, password } = req.body;
    const dbUser = await User.findOne({ username });
    if (!dbUser) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
        return res.status(401).json({
            message: 'Incorrect password'
        });
    }
    return res.status(200).json({
        message: 'User logged in',
        user: dbUser
    });
}

// user log out
export const logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out' });
}

// update user
export const update = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const dbUser = awaitUser.findOne({ username });
    if (!dbUser) {
        return res.status(401).json({
            message: 'User not found'
        });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hash,
        isAdmin: isAdmin === 'true'
    });
    await newUser.save();
    return res.status(200).json({
        message: 'User updated',
        user: newUser
    });
}

// delete user
export const deleteUser = async (req, res) => {
    const { username } = req.body;
    const dbUser = await User.findOne({ username });
    if (!dbUser) {
        return res.status(401).json({
            message: 'User not found'
        });
    }
    await dbUser.remove();
    return res.status(200).json({
        message: 'User deleted',
        user: dbUser
    });
}