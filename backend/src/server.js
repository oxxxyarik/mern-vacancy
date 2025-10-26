import express from "express"
import vacancyRoutes from "./routes/vacancyRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

//Middleware
app.use(express.json());

connectDB();

app.use("/api/vacancies", vacancyRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// # Проверить что изменилось
// git status
// # Добавить все изменения
// git add .
// # Создать коммит с описанием
// git commit -m "Add user registration feature"
// # Запушить на GitHub
// git push origin main