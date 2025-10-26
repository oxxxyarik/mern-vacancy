export function getAllVacancies(req, res){
    res.status(200).send("you just fetched the vacancies");
};

export function createVacancy(req, res){
    res.status(201).json({message:"Vacancy created succesfully!"})
};

export function updateVacancy(req, res){
    res.status(201).json({message:"Vacancy updated succesfully!"})
};

export function deleteVacancy(req, res){
    res.status(201).json({message:"Vacancy deleted succesfully!"})
};