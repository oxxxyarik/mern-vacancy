import express from "express"
import { createVacancy, deleteVacancy, getAllVacancies, updateVacancy } from "../controllers/vacancyController.js";

const router = express.Router();

router.get("/", getAllVacancies);
router.post("/", createVacancy);
//id - айди конкретной вакансии(обьекта в дб который мой обновляем)
router.put("/:id", updateVacancy);
router.delete("/:id", deleteVacancy);

export default router;