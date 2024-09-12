const build = require('./app');
const env = require("./config/env")

const app = build({ logger: true },
    {
        openapi: {
            openapi: "3.0.3",
            info: {
                title: "Library API",
                description: "Library Management API",
                version: "0.1.0"
            },
            servers: [{
                url: "https://humble-zebra-vr9x9g55wj63prwv-3000.app.github.dev",
                description: "Develpement Server"
            }],
            "security": [{ "bearerAuth": [] }],
            "components": {
                "securitySchemes": {
                    "bearerAuth": {
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                    }
                }
            }
        }
    },
    {
        routePrefix: "/docs",
        security: [{ bearerAuth: [] }],
        uiConfig: {
            docExpansion: "full",
            deepLinking: "false"
        }
    },
    {
        connectionString: env.POSTGRES_DB_COLLECTION
    }
);

/*
app.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
})

app.post('/', (request, reply) => {
    reply.send({ hello: 'world POST' });
  })
*/

app.listen({ port: 3000, host: 'localhost' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
})