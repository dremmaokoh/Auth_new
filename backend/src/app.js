import express from 'express';
// Create an Express application
const app = express();

//middleware to parse JSON requests from clients
app.use(express.json());

//routes import
import userRouter from './routes/user.route.js';
// import postRouter from './routes/post.route.js';

//routes middleware
app.use('/api/v1/users', userRouter);
// app.listen('/api/v1/posts', postRouter);

//example route: http://localhost:8000/api/v1/users/register

// export the app
export default app;