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

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       200:
 *         description: The character description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         description: Character not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: List characters with pagination
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           description: The number of characters to return
 *       - in: query
 *         name: lastKey
 *         schema:
 *           type: string
 *           description: The ID of the last character from the previous page
 *     responses:
 *       200:
 *         description: A list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 characters:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Character'
 *                 lastKey:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Update a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
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
 *       200:
 *         description: Character updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Character not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       204:
 *         description: Character deleted successfully
 *       404:
 *         description: Character not found
 *       500:
 *         description: Internal server error
 */
export {};
