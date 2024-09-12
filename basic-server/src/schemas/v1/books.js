// codefastify.get('/', getBooksOpts, async (request, reply) => {fastify.get('/:id', getBookOpts, async (request, reply) => {
const book = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    author: { type: "string" },
    isbn: { type: "number" },
    published_year: { type: "number" },
  },
};
const bookNotFoundResponse = {
  type: "object",
  properties: {
    statusCode: { type: "integer" },
    error: { type: "string" },
    message: { type: "string" },
  },
  example: {
    statusCode: 404,
    error: "Not Found",
    message: "The book you r are looking for does not exist",
  },
};
const bookDeletedConfirmResponse = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  example: {
    message: "The book was deleted",
  },
};

const bookUpdatedConfirmResponse = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  example: {
    message: "The book was updated",
  },
};

const getBookOpts = {  response: { 200: book, 404: bookNotFoundResponse } };
const getBooksOpts = {
  schema: {
    query: {
      id: { type: "number" },
      author: { type: "string" },
      published_year: { type: "number" },
      from: { type: "number" },
    },
  },
  response: { 200: { type: "array", items: book } }
};

const deleteBookOpts = {  response: { 200: bookDeletedConfirmResponse, 404: bookNotFoundResponse } };
const updateBookOpts = {
  schema: {
    body: {
      author: { type: "string" },
      published_year: { type: "number" },
      isbn: { type: "number", minimum: 10 },
      title: { type: "string" }
    },
  },


  response: { 200: bookUpdatedConfirmResponse, 404: bookNotFoundResponse }
};

module.exports = { getBooksOpts, getBookOpts, deleteBookOpts, updateBookOpts };
