import express from "express"

const app = express();


// Endpoint - это конкретный URL + HTTP метод для обработки запроса
// Route - это группа endpoint'ов с общим префиксом пути

// router.route('/users')
//   // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .get((req, res) => { /* GET /users */ })
//   // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .post((req, res) => { /* POST /users */ });

// // Маршрут - это группа endpoint'ов с общим префиксом пути  
// router.route('/users/:id')
//   // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .get((req, res) => { /* GET /users/123 */ })
//   // Endpoint - это конкретный URL + HTTP метод для обработки запроса
//   .put((req, res) => { /* PUT /users/123 */ })


//endpoint
app.get("/api/vacancy", (req, res) => {
    //send vacancy
    res.status(200).send("you got 6 vacancies");
});

app.post("/api/vacancy", (req, res) =>{
    res.status(201).json({message:"Vacancy created succesfully!"})
})

//id - айди конкретной вакансии(обьекта в дб который мой обновляем)
app.put("/api/vacancy/:id", (req, res) =>{
    res.status(200).json({message:"Vacancy updated succesfully!"})
})

//id - айди конкретной вакансии(обьекта в дб который мой обновляем)
app.delete("/api/vacancy/:id", (req, res) =>{
    res.status(200).json({message:"Vacancy deleted succesfully!"})
})

app.listen(5001, () =>{
    console.log("Server started on PORT: 5001");
});

