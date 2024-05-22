/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Create a new character
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - episodes
 *             properties:
 *               name:
 *                 type: string
 *               episodes:
 *                 type: array
 *                 items:
 *                   type: string
 *               planet:
 *                 type: string
 *     responses:
 *       201:
 *         description: Character created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
export {};
