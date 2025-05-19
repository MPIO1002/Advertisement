"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const redisClient_1 = __importDefault(require("../utils/redisClient"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
class IndexController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.service = new services_1.Service();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/banners', this.getBanners.bind(this));
        this.router.post('/banners', upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'logo', maxCount: 1 },
            { name: 'video', maxCount: 1 },
            { name: 'horizon_img', maxCount: 1 },
        ]), this.addBanner.bind(this));
        this.router.put('/banners/:id', upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'logo', maxCount: 1 },
            { name: 'video', maxCount: 1 },
            { name: 'horizon_img', maxCount: 1 },
        ]), this.updateBanner.bind(this));
        this.router.delete('/banners/:id', this.deleteBanner.bind(this));
    }
    //Ứng dụng cache để tối ưu memory usage
    getBanners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = 'banners';
                const cachedData = yield redisClient_1.default.get(cacheKey);
                if (cachedData) {
                    console.log('Banners from Redis');
                    res.status(200).json(JSON.parse(cachedData));
                    return;
                }
                const banners = yield this.service.getBanners();
                yield redisClient_1.default.set(cacheKey, JSON.stringify(banners), 'EX', 300); // cache 5 phút
                res.status(200).json(banners);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch banners' });
            }
        });
    }
    addBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Upload từng file lên Cloudinary nếu có
                const uploadToCloudinary = (file) => __awaiter(this, void 0, void 0, function* () {
                    if (!file)
                        return undefined;
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: file.mimetype.startsWith('video') ? 'video' : 'image' }, (error, result) => {
                            if (error)
                                reject(error);
                            else
                                resolve((result === null || result === void 0 ? void 0 : result.secure_url) || '');
                        });
                        stream.end(file.buffer);
                    });
                });
                const files = req.files;
                const imageUrl = (files === null || files === void 0 ? void 0 : files.image) ? yield uploadToCloudinary(files.image[0]) : req.body.image;
                const videoUrl = (files === null || files === void 0 ? void 0 : files.video) ? yield uploadToCloudinary(files.video[0]) : req.body.video;
                const logoUrl = (files === null || files === void 0 ? void 0 : files.logo) ? yield uploadToCloudinary(files.logo[0]) : req.body.logo;
                const horizonImgUrl = (files === null || files === void 0 ? void 0 : files.horizon_img) ? yield uploadToCloudinary(files.horizon_img[0]) : req.body.horizon_img;
                // Lưu thông tin banner vào DB
                const banner = yield this.service.addBanner(Object.assign(Object.assign({}, req.body), { image: imageUrl, video: videoUrl, logo: logoUrl, horizon_img: horizonImgUrl }));
                yield redisClient_1.default.del('banners'); // Xóa cache sau khi thêm banner mới
                res.status(201).json(banner);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to add banner' });
            }
        });
    }
    updateBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadToCloudinary = (file) => __awaiter(this, void 0, void 0, function* () {
                    if (!file)
                        return undefined;
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: file.mimetype.startsWith('video') ? 'video' : 'image' }, (error, result) => {
                            if (error)
                                reject(error);
                            else
                                resolve((result === null || result === void 0 ? void 0 : result.secure_url) || '');
                        });
                        stream.end(file.buffer);
                    });
                });
                const files = req.files;
                const imageUrl = (files === null || files === void 0 ? void 0 : files.image) ? yield uploadToCloudinary(files.image[0]) : req.body.image;
                const videoUrl = (files === null || files === void 0 ? void 0 : files.video) ? yield uploadToCloudinary(files.video[0]) : req.body.video;
                const logoUrl = (files === null || files === void 0 ? void 0 : files.logo) ? yield uploadToCloudinary(files.logo[0]) : req.body.logo;
                const horizonImgUrl = (files === null || files === void 0 ? void 0 : files.horizon_img) ? yield uploadToCloudinary(files.horizon_img[0]) : req.body.horizon_img;
                const id = Number(req.params.id);
                const updatedBanner = yield this.service.updateBanner(id, Object.assign(Object.assign({}, req.body), { image: imageUrl, video: videoUrl, logo: logoUrl, horizon_img: horizonImgUrl }));
                yield redisClient_1.default.del('banners'); // Xóa cache sau khi cập nhật banner
                res.status(200).json(updatedBanner);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to update banner' });
            }
        });
    }
    deleteBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.service.deleteBanner(id);
                yield redisClient_1.default.del('banners'); // Xóa cache sau khi xóa banner
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete banner' });
            }
        });
    }
}
exports.default = IndexController;
