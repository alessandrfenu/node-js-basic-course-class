const { postAuthSignup, postAuthSignin } = require('../../schemas/v1/auth');
const jwt = require('jsonwebtoken');

const authRoutes = async (fastify) => {
    fastify.get('/', async (request, reply) => {
        reply.send({ hello: 'world' });
    });

    fastify.post('/signup', postAuthSignup, async (req, res) => {
        const { username, password, role } = req.body;
        const client = await fastify.pg.connect()
        try {
            // Validate input
            if (!username || !password || (role !== 'admin' && role !== 'normal')) {
                return res.status(400).send('Invalid input');
            }

            // Hash password and store in DB
            const hashedPassword = await fastify.bcrypt.hash(password, 10);


            await client.query('INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)', [username, hashedPassword, role], (error, resolve) => {
                if (error) {
                    throw error;
                }
            })

            res.status(201).send('User registered');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        } finally {
            client.release();
        }
    });

    fastify.post('/signin', postAuthSignin, async (req, res) => {
        const { username, password } = req.body;
        const client = await fastify.pg.connect()
        let token;

        try {
            const { rows, rowCount, error } = await client.query('SELECT * from users WHERE username = $1', [username]);
            if (rowCount === 0) {
                // reply.code(404).send("Error connecting to database")
                console.log('User not found');
                return;
            }
            if (!username || !(await fastify.bcrypt.compare(password, rows[0].password_hash))) {
                console.log("password error")
                return;
                //return res.status(401).send('Invalid credentials');
            }

            if (error) {
                console.log('error');
                throw error;
            }

            // Generate JWT token
            const options = {
                userId: rows[0].username,
                role: rows[0].role,
                actions: rows[0].role === 'admin' ? ['read', 'write', 'delete'] : ['read']
            }

            token = jwt.sign(options, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION }); //{ expiresIn: '1h' }

            res.status(200).send({ token });

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        } finally {
            client.release();
        }
    });
}

module.exports = authRoutes;

