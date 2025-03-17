import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { db } from './config/db.config.js';
import cors from 'cors';
import authRoutes from './routes/auth/auth.routes.js';
import bookRoutes from './routes/books/books.routes.js';
const app = express();
db();
app.use(cors());
app.use(cors({
    origin: '*', // React app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // If using cookies/auth headers
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 

app.listen(process.env.PORT || 4000, () => {
    console.log('App is running on PORT', process.env.PORT);
})