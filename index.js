import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/usersRouter.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/errorMiddleware.js"
import postsRouter from "./routes/postsRouter.js";
import {authMiddleware} from "./middleware/authMiddleware.js";
import * as path from "path";
import { fileURLToPath } from "url";


const PORT = 3005;
const DB_URL = 'mongodb+srv://jesterowtf:M9ESeaROO1lbW0ko@cluster0.cudpkk6.mongodb.net/?retryWrites=true&w=majority'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors({
  origin: ["http://localhost:3000", "https://social-network-rho-azure.vercel.app"],
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/api', authRouter)
app.use('/api', authMiddleware, usersRouter)
app.use('/api', authMiddleware, postsRouter)

app.use('/api/upload', async (req, res) => {
  try {
    const file = req.body.image;
    console.log(`file`, req.body)

    res.json( file)

  } catch (e) {
    res.status(500).json(e)
  }
})

app.get('*', function (req, res) {
  res.sendFile('/', path.join(__dirname, 'static', 'index.html'));
});

app.use(errorMiddleware)

async function appStart() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      console.log('Прослушиваем порт:' + PORT);
    })
  } catch (e) {
    console.log(e);
  }
}

appStart();
