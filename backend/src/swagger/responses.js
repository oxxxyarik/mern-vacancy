/**
 * @swagger
 * components:
 *   responses:
 *     NotFound:
 *       description: Ресурс не найден
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 * 
 *     ValidationError:
 *       description: Ошибка валидации
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     message:
 *                       type: string
 */