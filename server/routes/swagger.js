const express = require('express');
const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: 'Bike Usage Swagger',
      version: '1.0.0',
      description: 'Bike Usage RESTful API',
      contact: {
        email: 'rmahajan@palo-it.com'
      }
    },
    tags: [
      {
        name: 'usage',
        description: 'Bike Usage API'
      }
    ],
    schemes: ['http'],
    host: 'localhost:3000',
    basePath: '/usages'
  },
  apis: ['./server/routes/query.js']
};

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options);

router.get('/json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = {
  router
};
