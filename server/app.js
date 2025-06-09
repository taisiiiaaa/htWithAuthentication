import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const habits = [
  {
    id: 1,
    title: 'Meditate',
    completed: false
  }
];

// const password = '12345678'; 
// const saltRounds = 10;

// bcrypt.hash(password, saltRounds).then(hash => {
//   console.log(hash);
// });

const users = [{ username: 'admin', password: '$2b$10$YikybmmZLW3oM3g0/SlAsOszZ54dt7elT4FX1yP6nrQYoezfKWAaq' }]
const SECRET_KEY = 'hillel_fullstack';

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(usr => usr.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // payload, secretKey, config
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '15min' });

  res.json({ token });
});

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     res.sendStatus(401);
//   }

//   const token = authHeader.split(' ')[1];
//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     next();
//   });
// }

app.get('/api/habits', (req, res) => {
  console.log('Sending habits:', habits);
  res.json(habits);
});

app.post('/api/habits', (req, res) => {
  const { habit } = req.body;
  const newHabit = { ...habit, id: habits.length + 1 };
  habits.push(newHabit);
  res.send({ habit: newHabit });
});

app.delete('/api/habits/:habitId', (req, res) => {
  const habitId = parseInt(req.params.habitId);
  const index = habits.findIndex(h => h.id === habitId);
  if (index !== -1) {
    habits.splice(index, 1);
    return res.status(200).send({ message: 'Habit deleted' });
  }
  res.status(404).send({ message: 'Habit not found' });
});

app.put('/api/habits/:habitId', (req, res) => {
  const habitId = parseInt(req.params.habitId);
  const { title, completed } = req.body;

  const habit = habits.find(h => h.id === habitId);
  if (!habit) {
    return res.status(404).send({ message: 'Habit not found' });
  }

  if (title !== undefined) habit.title = title;
  if (completed !== undefined) habit.completed = completed;

  res.send({ habit });
});

app.listen(3000);