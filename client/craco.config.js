const path = require(`path`);
const cracoAlias = require("craco-alias");

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
    },
};