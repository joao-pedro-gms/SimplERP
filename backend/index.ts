import express, { Request, Response } from 'express';

const app = express();
const port = 3306;

app.get('/health', (req: Request, res: Response) => {
    res.send('Lanna Livia é a mulher mais linda do mundo');
});

app.listen(port, () => {
    console.log(`SimplERP Backend rodando na porta ${port}`);
});
