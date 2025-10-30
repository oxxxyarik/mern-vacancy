import express from "express"
import vacancyRoutes from "./routes/vacancyRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";

import cors from "cors"

dotenv.config()

// numppad5 - save all files

const app = express();
const PORT = process.env.PORT || 5001;

//Middleware
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json()); //this mw will parse JSON bodies: req.body
app.use(rateLimiter)

// simple custom mw
// common - auth check?
// common - rate limiting (100 requests per 1 min)
// redis - noSQL db for key - value storage

app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and Req URL is ${req.url}`)
    next();
})

app.use("/api/vacancies", vacancyRoutes);

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

// # Проверить что изменилось
// git status
// # Добавить все изменения
// git add .
// # Создать коммит с описанием
// git commit -m "Add user registration feature"
// # Запушить на GitHub
// git push origin main