const response400 = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  example: {
    message: "400",
  },
};

const response401 = {
    type: "object",
    properties: {
        message: { type: "string" },
    },
    example: {
        message: "401",
    },
};

const response201 = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  example: {
    message: "201",
  },
};

const response500 = {
    type: "object",
    properties: {
        message: { type: "string" },
    },
    example: {
        message: "500",
    },
};

const postAuthSignup = {
    schema: {
        body: {
            username: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string' }
        }
    },
    response: {201: response201, 400: response400, 500: response500}
}

const postAuthSignin = {
    schema: {
        body: {
            username: { type: 'string' },
            password: { type: 'string' }
        }
    },
    response: {401: response401}
}

module.exports = { postAuthSignup, postAuthSignin };