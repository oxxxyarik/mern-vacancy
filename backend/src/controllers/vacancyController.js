import Vacancy from "../models/Vacancy.js"

export async function getAllVacancies(req, res){
    try{
        const vacancies = await Vacancy.find().sort({createdAt: -1}) //newest First
        res.status(200).json(vacancies)
    }
    catch(error){
        console.error("Error in getAllVacancies controller", error)
        res.status(500).json({message: "internal server error"})
    }
};

export async function getVacancyById(req, res){
    try{
        const vacancyId = req.params.id;
        const vacancy = await Vacancy.findById(
            vacancyId
        )

        res.status(200).json(vacancy)
    }
    catch(error){
        console.error("Error in getVacancyById controller", error)
        if (error.name === 'CastError') {
            return res.status(404).json({message: "Vacancy not found!"});
        }
        res.status(500).json({message: "internal server error"})
    }
};

export async function createVacancy(req, res){
    try {
       const {title, description, salary} = req.body
       const newVacancy = new Vacancy({title: title, description: description, salary: salary})

       const savedVacancy = await newVacancy.save()
       res.status(201).json({message: savedVacancy})
    } 
    catch (error) {
        console.error("Error in createVacancy controller", error)
        res.status(500).json({message: "internal server error"})
    }
};

export async function updateVacancy(req, res){
    try {
        const {title, description, salary} = req.body;
        //req.params.id - из router.put("/:id") 
        const vacancyId = req.params.id;

        const updatedVacancy = await Vacancy.findByIdAndUpdate(
            vacancyId, 
            {title, description, salary},
            {
                new: true,
            }
        );
        
        res.status(200).json(updatedVacancy)
    } 
    catch (error) {
        console.error("Error in updateVacancy controller", error)
        if (error.name === 'CastError') {
            return res.status(404).json({message: "Vacancy not found!"});
        }
        res.status(500).json({message: "internal server error"})
    }
};

export async function deleteVacancy(req, res){
    try {
        const vacancyId = req.params.id;
        const deletedVacancy = await Vacancy.findByIdAndDelete(
            vacancyId
        );

        res.status(200).json(deletedVacancy);
    } 
    catch (error) {
        console.error("Error in deleteVacancy controller", error)
        if (error.name === 'CastError') {
            return res.status(404).json({message: "Vacancy not found!"});
        }
        res.status(500).json({message: "internal server error"})
    }
};