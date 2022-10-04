import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/usersRouter.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/errorMiddleware.js"
import postsRouter from "./routes/postsRouter.js";
import {authMiddleware} from "./middleware/authMiddleware.js";
import multer from "multer";
import uploadRouter from "./routes/uploadRouter.js";
import * as path from "path";
import { fileURLToPath } from 'url';

const PORT = 3005;
const DB_URL = 'mongodb+srv://jesterowtf:M9ESeaROO1lbW0ko@cluster0.cudpkk6.mongodb.net/?retryWrites=true&w=majority'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'static')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

app.use(express.json())
app.use(cookieParser())

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'build')));


app.use('/api', authRouter)
app.use('/api', authMiddleware, usersRouter)
app.use('/api', authMiddleware, postsRouter)
// app.use('/upload', upload.single('image'), uploadRouter)
app.use('/api/upload', upload.single('image'), async (req, res) => {
  try {

    res.json({
      url: path.join(__dirname, `/tmp/${req.file.originalname}`)
      // url: `/static/${req.file.originalname}`
    })

  } catch (e) {
    // res.status(444).json(e)
    res.json(__dirname)
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
