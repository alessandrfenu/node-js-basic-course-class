const build = require('./auth-app');
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
                url: "https://humble-zebra-vr9x9g55wj63prwv-3001.app.github.dev",
                description: "Develpement Server"
            }]
        }
    },
    {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "full",
            deepLinking: "false"
        }
    },
    {
        connectionString: env.POSTGRES_DB_AUTH
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

app.listen({ port: 3001, host: 'localhost' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Auth server listening on ${address}`);
})

