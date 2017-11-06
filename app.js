'use strict';

const path = require('path');
global.appRoot = path.resolve(__dirname);

const SwaggerTools = require('swagger-tools'),
  app = require('express')(),
  config = require('./config'),
  SwaggerParser = require("swagger-parser"),
  swaggerUi = require('swagger-ui-express'),
  errorParser = require(appRoot + '/lib/mongooseErrorStatusCode');

module.exports = app; // for testing

const swaggerDocument = appRoot + "/api/swagger/swagger.yaml";

const swaggerConfig = {
  appRoot: __dirname // required config
};


SwaggerParser.validate(swaggerDocument, function(err, api) {
  if (err) {
    console.error(err);
  } else {
    console.log("API name: %s, Version: %s", api.info.title, api.info.version);
    // Initialize the Swagger Middleware
    SwaggerTools.initializeMiddleware(api, function (middleware) {
      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(middleware.swaggerMetadata());

      // Validate Swagger requests
      app.use(middleware.swaggerValidator({
        validateResponse: true
      }));

      app.use(middleware.swaggerRouter({useStubs: true, controllers: appRoot + '/api/controllers'}));


      // Serve the Swagger documents and Swagger UI
      //   http://localhost:3000/docs => Swagger UI
      //   http://localhost:3000/api-docs => Swagger document
      // app.use(middleware.swaggerUi());

      // use swagger-ui-express for docs in swagger 3.17 format enabling authentication
      const showExplorer = false;
      const options = {
        validatorUrl: null
      };

      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(api, showExplorer, options));

      // Start the server
      const port = process.env.PORT || config.get('port');
      app.listen(port);
    });
  }
});