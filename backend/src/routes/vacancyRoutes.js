import express from "express"
import {
  deleteSubmission,
  createSubmission,
  getStudentSubmissions,
  getAllStudents,
  createStudent,
  getAllEmployers,
  createEmployer,
  registerUser,
  loginUser,
  createVacancy,
  deleteVacancy,
  getAllVacancies,
  updateVacancy,
  getVacancyById,
  getAllCategories,
  createCategory,
} from "../controllers/vacancyController.js";
import { registerValidation, vacancyValidation, loginValidation } from "../validators/authValidators.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Роуты для работодателей
router.get("/employers", getAllEmployers);
router.post("/employers", createEmployer);

// Роуты для студентов
router.get("/students", getAllStudents);
router.post("/students", createStudent);

// Роуты для пользователей
router.post("/register", registerValidation, handleValidationErrors, registerUser);
router.post("/login", loginValidation, handleValidationErrors, loginUser)


// Роуты для категорий
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);

// Роуты для откликов
router.post("/submissions", createSubmission);
router.get("/students/:studentId/submissions", getStudentSubmissions);
router.delete("/submissions/:id", deleteSubmission);

// Роуты для вакансий
router.get("/", getAllVacancies);
router.get("/:id", getVacancyById);
router.post("/", vacancyValidation, handleValidationErrors, createVacancy);
router.put("/:id", vacancyValidation, handleValidationErrors, updateVacancy);
router.delete("/:id", deleteVacancy);

export default router;