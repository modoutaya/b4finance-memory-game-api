
import  express from 'express';
import  cors from 'cors';
import knex, { Knex } from 'knex';
import { Request, Response } from 'express';
import { config } from './config';
import { addNewScore, getBestScore, getScores } from './game-score/score';
import { getImages } from './images/image';

const connection: Knex = knex({
    client: 'pg',
    connection: {
        host: config.get('db').host,
        port: config.get('db').port,
        database: config.get('db').database,
        user: config.get('db').username,
        password: config.get('db').password,
        multipleStatements: true
      },
  });

const app = express();

app.use(cors({origin: /memory-game|localhost(:[0-9]+)?$/}))
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('is working');
});

app.post('/scores', async(req: Request, res: Response) => {
    const [addedScore] = await addNewScore(connection, req.body);

    res.json({ ...req.body, ...addedScore });
});

app.get('/scores/best', async(req: Request, res: Response) => {
    const scores = await getBestScore(connection);
    
    res.json(scores);
});
app.get('/scores', async(req: Request, res: Response) => {
    const scores = await getScores(connection);
    
    res.json(scores);
});

app.get('/images', (req: Request, res: Response) => res.json(getImages()));

app.listen(config.get('http').port || 5000, () => { console.log('app is running') });
