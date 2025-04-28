"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("./controllers"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const request_1 = __importDefault(require("request"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)({
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
    (0, request_1.default)(options)
        .on('response', (response) => {
        res.setHeader('Content-Type', response.headers['content-type'] || 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Range', response.headers['content-range'] || '');
        res.status(response.statusCode);
    })
        .pipe(res);
});
// Routes
const indexController = new controllers_1.default();
app.use('/', indexController.router);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
