/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [student, employer]
 * 
 *     Vacancy:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - employerId
 *         - categoryId
 *         - salary
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         employerId:
 *           type: string
 *         categoryId:
 *           type: string
 *         salary:
 *           type: number
 *         isActive:
 *           type: boolean
 * 
 *     Submission:
 *       type: object
 *       required:
 *         - studentId
 *         - vacancyId
 *       properties:
 *         _id:
 *           type: string
 *         studentId:
 *           type: string
 *         vacancyId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected]
 */