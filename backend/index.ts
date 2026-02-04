import express, { Request, Response } from 'express';
import './src/database/db'; // Initialize DB
import authRoutes from './src/routes/security/auth';

const app = express();
const port = 3306;

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.send('Lanna Livia é a mulher mais linda do mundo');
});

app.listen(port, () => {
    console.log(`SimplERP Backend rodando na porta ${port}`);
});
