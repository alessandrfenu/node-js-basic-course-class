const fastify = require('fastify');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const fastifyPostgres = require('@fastify/postgres');

const bookRoutes = require("./routes/v1/books");
const healthCheck = require("./routes/v1/healthCheck");

const build = (opts = {}, swaggerOpts = {}, swaggerUiOpts = {}, fastifyPostgresOpts = {}) => {
    const app = fastify(opts);
    app.register(fastifySwagger, swaggerOpts);
    app.register(fastifySwaggerUi, swaggerUiOpts);
    app.register(fastifyPostgres, fastifyPostgresOpts);
    app.register(bookRoutes, {prefix: "/books"});
    app.register(healthCheck, {prefix: "/healthCheck"});
    return app;
};

module.exports = build;