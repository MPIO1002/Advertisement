import express from 'express';
import IndexController from './controllers';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import request from 'request';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(cors({
    exposedHeaders: ['Content-Range', 'Accept-Ranges'],
}));

// Proxy video
app.get('/proxy', (req, res) => {
    const videoUrl = typeof req.query.url === 'string' ? req.query.url : null;
    if (!videoUrl || typeof videoUrl !== 'string') {
        return res.status(400).send('Missing video URL');
    }

    const options = {
        url: videoUrl,
        headers: {
            'Range': req.headers['range'] || '',
        },
    };

    request(options)
        .on('response', (response) => {
            res.setHeader('Content-Type', response.headers['content-type'] || 'video/mp4');
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Range', response.headers['content-range'] || '');
            res.status(response.statusCode);
        })
        .pipe(res);
});

// Routes
const indexController = new IndexController();
app.use('/', indexController.router);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
