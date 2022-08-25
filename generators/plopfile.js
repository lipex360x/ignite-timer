/* eslint-disable */
const components = require("./components");
const pages = require("./pages");

module.exports = function (plop) {
  plop.setGenerator("Component", components);
  plop.setGenerator("Page", pages);
};
