import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './router/email.js';

dotenv.config({
  path: './.env'
});


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true
})); 


app.use(express.json());

app.use('/api/email', emailRoutes);



app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
