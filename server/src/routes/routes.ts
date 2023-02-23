import { Application } from 'express';

const verifyJWT = require('../middleware/verifyJWT');

module.exports = (app: Application) => {
  // Unprotected
  app.use('/register', require('./register'));
  app.use('/auth', require('./auth'));
  app.use('/refresh', require('./refresh'));
  app.use('/logout', require('./logout'));

  app.get('/', (req, res) => {
    res.send('server is running');
  });

  // app.all("*", (req, res) => {
  //   res.status(404);
  //   if (req.accepts("html")) {
  //     res.sendFile(path.join(__dirname, "views", "404.html"));
  //   } else if (req.accepts("json")) {
  //     res.json({ error: "404 Not Found" });
  //   } else {
  //     res.type("txt").send("404 Not Found");
  //   }
  // });

  // Middleware to protect routes
  app.use(verifyJWT);

  // Protected
  require('./protected/index')(app);
};
