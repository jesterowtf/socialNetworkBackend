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

const PORT = 3005;
const DB_URL = 'mongodb+srv://jesterowtf:M9ESeaROO1lbW0ko@cluster0.cudpkk6.mongodb.net/?retryWrites=true&w=majority'

const app = express();


app.use(cors({
  origin: ["https://social-network-rho-azure.vercel.app"],
  credentials: true
}));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'static/files/postImages')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage})

app.use(express.json())
app.use(cookieParser())
app.use('/static', express.static('static'))
app.use('/api', authMiddleware, usersRouter)
app.use('/api', authMiddleware, postsRouter)
app.use('/auth', authRouter)
app.use('/upload', upload.single('image'), uploadRouter)
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
