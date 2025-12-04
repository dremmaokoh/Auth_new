import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

// Load environment variables from .env file
dotenv.config(
    {
        path: './.env'
    }
);

const startServer = () => { }
    try {
        await connectDB();

        app.on('error', (error) => {
            console.log('Error starting server:', error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT}`);
        });
    } catch (error) {
        console.log('Mongodb connection failed',error);
};
    
startServer();