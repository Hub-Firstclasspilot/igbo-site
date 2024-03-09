import express from 'express';
import mongoose from 'mongoose';
import { connectToMongoDB } from './db/dbConfig.js';
import adminRoute from './db/routes/adminRoute.js';
import userRoute from './db/routes/userRoute.js';
import lessonRoute from './db/routes/lessonRoute.js';
import testRoute from './db/routes/testRoute.js';
import cors from 'cors';

connectToMongoDB();

const app = express();
const PORT = process.env.PORT || 3600;

app.use(cors({
  origin: 'https://igbo-learning.vercel.app',
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// routes
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// main Routes
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/lesson', lessonRoute);
app.use('/api/test', testRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
