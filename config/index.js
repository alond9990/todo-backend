/**
 * Created by alond9990 on 12/09/2018.
 */

const configs = require(`./config.${process.env.NODE_ENV || "dev"}`);

module.exports.getDatabaseConfig = function () {
    return configs.database;
};

module.exports.getJWTSecret = function () {
    return configs.JWT_SECRET;
};

module.exports.getDBTableNames = function () {
    return configs.DB_TABLE_NAMES;
};
