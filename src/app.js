import express from 'express';
import cors from 'cors';
import stringRouter from './routes/router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/strings', stringRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HNG Stage 1 String Analyzer API 🚀' });
});
app.get('/check', (req, res) => {
  res.json({message: 'API is up and running!'});
});


export default app;
