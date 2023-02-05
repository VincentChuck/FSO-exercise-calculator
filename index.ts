import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  res.send(bmiCalculator(height, weight));
});

app.post('/exercises', (req, res) => {
  /* eslint-disable*/
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (isNaN(target)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(daily_exercises[i])) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }
  }

  return res.send(exerciseCalculator(Number(target), daily_exercises));
  /* eslint-enable*/
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
