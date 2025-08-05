const app = require('./teach');
module.exports = (req, res) => {
  app(req, res); // Let Express handle the request
};
