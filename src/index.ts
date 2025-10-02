import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import db from './config/db';
import router from './api';

const app: Application = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', router);

app.listen(port, ()=>{
    console.log(`Server is running at PORT: ${port as string}`);
});