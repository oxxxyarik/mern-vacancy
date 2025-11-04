import express from "express"
import vacancyRoutes from "./routes/vacancyRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StudWork API',
      version: '1.0.0',
      description: 'API для платформы поиска работы в кампусе',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server',
      },
    ],
  },
  apis: [
    path.join(__dirname, './routes/*.js'),
    path.join(__dirname, './swagger/schemas.js'),    
    path.join(__dirname, './swagger/responses.js')   
  ],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions)

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());
app.use(rateLimiter)

// Логирование запросов
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and Req URL is ${req.url}`)
    next();
})

// Роуты
app.use("/api/vacancies", vacancyRoutes);

// Swagger документация
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Запуск сервера
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
})