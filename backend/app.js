import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import jobSheets from '../backend/routes/JobSheets.js'; 
import dotenv from 'dotenv';


dotenv.config();

const app = express();


connectDB();


app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


app.use('/api', jobSheets);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
