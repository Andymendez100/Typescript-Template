import 'module-alias/register';
import express, { Express } from 'express';

require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const credentials = require('@middleware/credentials');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');

const app: Express = express();
const port = process.env.PORT || 5000;

// eslint-disable-next-line no-underscore-dangle
global.__basedir = __dirname;
// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
