import express from 'express';
import cookieParser from 'cookie-parser';
import authController from './controllers/auth.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import postsController from './controllers/posts.js';
import commentsController from './controllers/comments.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(authController);
app.use(postsController);
app.use(commentsController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

//added comment to commit
