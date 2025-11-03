import {body} from 'express-validator'

export const registerValidation = [
    body('email')
    .isEmail()
    .withMessage('Введите корректный email')
    .normalizeEmail(),

    body('password')
    .isLength({min: 6})
    .withMessage('Пароль должен быть минимум 6 символов')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/) 
    //проверка что в строке есть хотя бы одна латинская буква, 
    //есть хотя бы одна цифра
    .withMessage('Пароль должен содержать латинские буквы и цифры'),

    body('role')
    .optional()
    .isIn(['student', 'employer'])
    .withMessage('Роль должна быть student или employer')
]

export const vacancyValidation = [
    body('title')
    .notEmpty()
    .withMessage('Название вакансии обязательно')
    .isLength( {min: 3, max: 100})
    .withMessage('Название должно быть от 3 до 100 символов'),

    body('description')
    .notEmpty()
    .withMessage('Описание вакансии обязательно')
    .isLength({min: 10, max: 2000})
    .withMessage('Описание должно быть от 10 до 2000 символов')
]

export const loginValidation = [
    body('email')
    .isEmail()
    .withMessage('Введите корректный email')
    .normalizeEmail(),

    body('password')
    .notEmpty()
    .withMessage('Пароль обязателен')
    .isLength({min: 6})
    .withMessage('Пароль должен быть минимум 6 символов')
]
