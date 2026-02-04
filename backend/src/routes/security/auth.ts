import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../../models/auth';

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // TO DO: Use environment variable

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        });

        res.status(201).json({ message: 'User created', userId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user || user.password === undefined) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

export default router;
