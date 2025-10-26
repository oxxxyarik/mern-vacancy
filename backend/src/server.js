import express from "express"
import vacancyRoutes from "./routes/vacancyRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

connectDB();

app.use("/api/vacancies", vacancyRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Endpoint - это конкретный URL + HTTP метод для обработки запроса
// Route - это группа endpoint'ов с общим префиксом пути

// router.route('/users')
  // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .get((req, res) => { /* GET /users */ })
  // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .post((req, res) => { /* POST /users */ });

// Маршрут - это группа endpoint'ов с общим префиксом пути  
// router.route('/users/:id')
  // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .get((req, res) => { /* GET /users/123 */ })
  // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .put((req, res) => { /* PUT /users/123 */ })
