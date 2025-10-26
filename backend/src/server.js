import express from "express"
import vacancyRoutes from "./routes/vacancyRoutes.js"

const app = express();

app.use("/api/vacancy", vacancyRoutes)

app.listen(5001, () =>{
    console.log("Server started on PORT: 5001");
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
