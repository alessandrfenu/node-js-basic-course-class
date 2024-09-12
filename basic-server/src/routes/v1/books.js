
const { getBooksOpts, getBookOpts, deleteBookOpts, updateBookOpts } = require("../../schemas/v1/books");
const authMiddleware = require('../../middleware/auth');
// codefastify.get('/', getBooksOpts, async (request, reply) => {fastify.get('/:id', getBookOpts, async (request, reply) => {

const bookRoutes = async (fastify) => {

    fastify.addHook('onRequest', authMiddleware);
    console.log("connect2")
    fastify.get('/', getBooksOpts, async (request, reply) => {
        console.log("connect1")
        const author = request.query.author;
        const published_year = request.query.published_year;
        const from = request.query.from;
        const id = request.query.id;

        const client = await fastify.pg.connect()
        console.log("connect")
        try {
            if (author || published_year || from || id) {
                let query = 'SELECT * FROM books WHERE 1=1';
                const params = [];
                let paramIndex = 1;

                if (author) {
                    query += ` AND author = $${paramIndex}`;
                    params.push(author);
                    paramIndex++;
                }

                if (published_year) {
                    query += ` AND published_year = $${paramIndex}`;
                    params.push(published_year);
                    paramIndex++;
                }

                if (from) {
                    query += ` AND id > $${paramIndex}`;
                    params.push(from);
                    paramIndex++;
                }
                if (id) {
                    query += ` AND id = $${paramIndex}`;
                    params.push(id);
                    paramIndex++;
                }

                query += ' ORDER BY id ASC LIMIT 5';

                console.log(query, params);
                const { rows } = await client.query(query, params);
                reply.send(rows ?? []);

            } else {
                const { rows } = await client.query('SELECT * FROM books ORDER BY id ASC');
                reply.send(rows ?? []);
            }
        } catch (error) {
            console.log(error)
            reply.code(500).send("Error connecting to database")
        }
        finally {
            client.release()
        }
    })

    fastify.delete('/:id', deleteBookOpts, async (request, reply) => {
        const { id } = request.params;
        if (request.user.role !== 'admin') {
            return reply.status(403).json({ message: 'Forbidden' });
        }
        if (id) {
            const client = await fastify.pg.connect()
            try {
                await client.query('DELETE from books WHERE id = $1', [id], (error, resolve) => {
                    if (error) {
                        console.log('error');
                        throw error;
                    }
                    if (resolve.rowCount === 0) {
                        // reply.code(404).send("Error connecting to database")
                        console.log('Book not found');
                    }
                })
                //reply.send(rows[0] ?? [])
            } catch (error) {
                console.log('error 2')
                reply.code(500).send("Error connecting to database")
            }
            finally {
                client.release()
            }
        } else {
            console.log('sent');
            reply.code(500).send("Missing parameters")
        }
    })

    fastify.put('/:id', updateBookOpts, async (request, reply) => {
        const { id } = request.params;
        const { title, author, isbn, published_year } = request.body;
        if (request.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (title && author && isbn && published_year && id) {
            const client = await fastify.pg.connect()
            try {
                await client.query('UPDATE books SET title = $1, author = $2, isbn = $3, published_year = $4 WHERE id = $5', [title, author, isbn, published_year, id], (error, resolve) => {
                    if (error) {
                        throw error;
                    }
                    if (resolve.rowCount === 0) {
                        reply.code(404).send("NOT found")
                    }
                })
                //reply.send(rows[0] ?? [])
            } catch (error) {
                reply.code(500).send("Error connecting to database")
            }
            finally {
                client.release()
            }
        } else {
            reply.code(500).send("Missing parameters")
        }
    })

    fastify.post('/', updateBookOpts, async (request, reply) => {
        const { title, author, isbn, published_year } = request.body;
        if (request.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (title && author && isbn && published_year) {
            const client = await fastify.pg.connect()
            try {
                await client.query('INSERT INTO books (title, author, isbn, published_year) VALUES ($1, $2, $3, $4)', [title, author, isbn, published_year], (error, resolve) => {
                    if (error) {
                        throw error;
                    }
                })
            } catch (error) {
                reply.code(500).send("Error connecting to database")
            }
            finally {
                client.release()
            }
        } else {
            reply.code(500).send("Missing parameters")
        }
    }
    )

}
module.exports = bookRoutes;