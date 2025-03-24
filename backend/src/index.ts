import express from 'express';
import  IndexController  from './controllers';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(json());

// Routes
// const indexController = new IndexController();
// app.use('/', indexController.router);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});