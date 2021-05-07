const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');

dotenv.config();

const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { customErrorMiddleware } = require('./middlewares/errorsHandler');
const ErrorHandler = require('./helpers/errorHandler');
const apiRoutes = require('./routes/api');

const { PORT } = process.env;
const ENV = process.env.NODE_ENV;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Show routes called in console during development
if (ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (ENV === 'production') {
  app.use(helmet());
}

app.use('/api', apiRoutes);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(customErrorMiddleware);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}, environment ${ENV}`); });

module.exports = app;

// Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  process.exit(1);
});
