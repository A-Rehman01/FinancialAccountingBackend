import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';

//Routes
import companyRoutes from './routes/companyRoutes.js';

//DB
import connectDB from './config/db.js';

dotenv.config();

//Conneect DB
connectDB();

const app = express();

//Except JSON data in body-parser
app.use(express.json());

// Allow Cors
app.use(cors({ origin: true }));

//APIs info
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Test Server
app.get('/', (req, res) => {
  res.send('API  is Running...');
});

// Routes
app.use('/api/company', companyRoutes);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running ${process.env.NODE_ENV} mode in ${PORT}`.yellow.bold
  )
);
