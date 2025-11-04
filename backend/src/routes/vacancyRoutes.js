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
/**
 * @swagger
 * /api/vacancies/employers:
 *   get:
 *     summary: Получить список всех работодателей
 *     tags: [Employers]
 *     responses:
 *       200:
 *         description: Список работодателей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   company:
 *                     type: string
 */
router.get("/employers", getAllEmployers)

/**
 * @swagger
 * /api/vacancies/employers:
 *   post:
 *     summary: Создать нового работодателя
 *     tags: [Employers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - company
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               company:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Работодатель создан
 *       400:
 *         description: Ошибка валидации
 */
router.post("/employers", createEmployer)

// Роуты для студентов
/**
 * @swagger
 * /api/vacancies/students:
 *   get:
 *     summary: Получить список всех студентов
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Список студентов
 */
router.get("/students", getAllStudents)

/**
 * @swagger
 * /api/vacancies/students:
 *   post:
 *     summary: Создать нового студента
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - group
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               group:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Студент создан
 */
router.post("/students", createStudent)

// Роуты для пользователей
/**
 * @swagger
 * /api/vacancies/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [student, employer]
 *                 default: student
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Ошибка валидации или пользователь уже существует
 */
router.post("/register", registerValidation, handleValidationErrors, registerUser)

/**
 * @swagger
 * /api/vacancies/login:
 *   post:
 *     summary: Вход в систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Неверные учетные данные
 *       500:
 *         description: Ошибка сервера
 */
router.post("/login", loginValidation, handleValidationErrors, loginUser)

// Роуты для категорий
/**
 * @swagger
 * /api/vacancies/categories:
 *   get:
 *     summary: Получить список категорий вакансий
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Список категорий
 */
router.get("/categories", getAllCategories)

/**
 * @swagger
 * /api/vacancies/categories:
 *   post:
 *     summary: Создать новую категорию
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категория создана
 */
router.post("/categories", createCategory)

// Роуты для откликов
/**
 * @swagger
 * /api/vacancies/submissions:
 *   post:
 *     summary: Создать отклик на вакансию
 *     tags: [Submissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - vacancyId
 *             properties:
 *               studentId:
 *                 type: string
 *               vacancyId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Отклик создан
 *       409:
 *         description: Отклик уже существует
 */
router.post("/submissions", createSubmission)

/**
 * @swagger
 * /api/vacancies/students/{studentId}/submissions:
 *   get:
 *     summary: Получить отклики студента
 *     tags: [Submissions]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список откликов студента
 */
router.get("/students/:studentId/submissions", getStudentSubmissions)

/**
 * @swagger
 * /api/vacancies/submissions/{id}:
 *   delete:
 *     summary: Удалить отклик
 *     tags: [Submissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Отклик удален
 *       404:
 *         description: Отклик не найден
 */
router.delete("/submissions/:id", deleteSubmission)

// Роуты для вакансий
/**
 * @swagger
 * /api/vacancies:
 *   get:
 *     summary: Получить список всех вакансий
 *     tags: [Vacancies]
 *     responses:
 *       200:
 *         description: Список вакансий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacancy'
 */
router.get("/", getAllVacancies)

/**
 * @swagger
 * /api/vacancies/{id}:
 *   get:
 *     summary: Получить вакансию по ID
 *     tags: [Vacancies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные вакансии
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *       404:
 *         description: Вакансия не найдена
 */
router.get("/:id", getVacancyById)

/**
 * @swagger
 * /api/vacancies:
 *   post:
 *     summary: Создать новую вакансию
 *     tags: [Vacancies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - employerId
 *               - categoryId
 *               - salary
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               employerId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Вакансия создана
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", vacancyValidation, handleValidationErrors, createVacancy)

/**
 * @swagger
 * /api/vacancies/{id}:
 *   put:
 *     summary: Обновить вакансию
 *     tags: [Vacancies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               salary:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Вакансия обновлена
 *       404:
 *         description: Вакансия не найдена
 */
router.put("/:id", vacancyValidation, handleValidationErrors, updateVacancy)

/**
 * @swagger
 * /api/vacancies/{id}:
 *   delete:
 *     summary: Удалить вакансию
 *     tags: [Vacancies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Вакансия удалена
 *       404:
 *         description: Вакансия не найдена
 */
router.delete("/:id", deleteVacancy)

export default router