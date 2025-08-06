const app = require('./teach');
module.exports = (req, res) => {
  app(req, res); // let express handle it
};
