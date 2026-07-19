/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new customer
 *     description: Creates a new user and customer account with PENDING_APPROVAL status.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *
 *       '400':
 *         description: Validation failed.
 *
 *       '409':
 *         description: Email already exists.
 *
 *       '500':
 *         description: Internal server error.
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticates a user and returns a JWT token.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *
 *       '400':
 *         description: Validation failed.
 *
 *       '401':
 *         description: Invalid email or password.
 *
 *       '403':
 *         description: User is inactive or pending approval.
 *
 *       '500':
 *         description: Internal server error.
 */