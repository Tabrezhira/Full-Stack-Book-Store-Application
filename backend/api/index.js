// Vercel serverless entrypoint for Express
const app = require('../app');

module.exports = (req, res) => {
  // Vercel will invoke this function per request
  return app(req, res);
};
