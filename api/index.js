import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'

import postRouter from './routes/posts.js'
import usersRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import { db } from "./db.js"

const app = express()

app.use(express.json())
app.use(cors(
    // {
    //     origin: ["https://blog-store-frontend.vercel.app/"],
    //     methods: ["POST", "GET", "PUT", "DELETE"],
    //     credentials: true
    // }
))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })


db.connect(function (err) {
    if (err) throw err
    console.log("Database connect")
})

app.get('/', (req, res) =>{
    res.json("Hello")
})

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/posts", postRoutes)

app.listen(8801, () => {
    console.log("connected to backend!!!!!!")
})