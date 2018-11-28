const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

const config = require('./libs/config');
const errorHandler = require('./handlers/error');

const routes = require('./routes/routes');

// Create Express app
const app = express();

// Server configuration
if (app.get('env') !== 'test') {
  app.use(morgan('combined'));
}

if (app.get('env') !== 'production') {
  app.use(cors({
    origin: config.clientURI,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
} else {
  app.use(cors());
}

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

// Routes
app.use('/api', routes);

// Error handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

// Start server
app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});

module.exports = app;
