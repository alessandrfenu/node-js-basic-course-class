require("dotenv").config();

const envalid = require("envalid");

module.exports = envalid.cleanEnv(process.env, {
    POSTGRES_DB_COLLECTION: envalid.str({}),
    POSTGRES_DB_AUTH: envalid.str({})
});