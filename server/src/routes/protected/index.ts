import { Application } from 'express';

module.exports = (app: Application) => {
  app.use('/', require('./report'));
  app.use('/', require('./files'));
};
