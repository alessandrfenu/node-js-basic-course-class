const fastify = require('fastify');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const fastifyPostgres = require('@fastify/postgres');
const fatifyBcrypt = require('fastify-bcrypt');

const authRoutes = require("./routes/v1/auth");


const build = (opts = {}, swaggerOpts = {}, swaggerUiOpts = {}, fastifyPostgresOpts = {}) => {
    const app = fastify(opts);
    app.register(fastifySwagger, swaggerOpts);
    app.register(fastifySwaggerUi, swaggerUiOpts);
    app.register(fastifyPostgres, fastifyPostgresOpts);
    app.register(fatifyBcrypt, { saltWorkFactor: 12 });
    app.register(authRoutes, { prefix: "/auth" });
    
    return app;
};

module.exports = build;