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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class IndexController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.service = new services_1.Service();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // this.router.post('/banners', this.addBanner.bind(this));
        this.router.put('/banners/:id', this.updateBanner.bind(this));
        this.router.delete('/banners/:id', this.deleteBanner.bind(this));
        this.router.get('/banners', this.getBanners.bind(this));
    }
    // private async addBanner(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { name, description, image } = req.body;
    //         // Upload image to Cloudinary
    //         const uploadResponse = await cloudinary.uploader.upload(image, {
    //             folder: 'banners',
    //         });
    //         const newBanner = await this.service.addBanner({
    //             image: uploadResponse.secure_url,
    //             name,
    //             description,
    //             link: '',
    //             logo: '',
    //             video: ''
    //         });
    //         res.status(201).json(newBanner);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Failed to add banner' });
    //     }
    // }
    updateBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedData = req.body;
                if (updatedData.image) {
                    // Upload new image to Cloudinary
                    const uploadResponse = yield cloudinary_1.v2.uploader.upload(updatedData.image, {
                        folder: 'banners',
                    });
                    updatedData.url = uploadResponse.secure_url;
                }
                const updatedBanner = yield this.service.updateBanner(Number(id), updatedData);
                if (!updatedBanner) {
                    res.status(404).json({ error: 'Banner not found' });
                    return;
                }
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
                const { id } = req.params;
                const success = yield this.service.deleteBanner(Number(id));
                if (!success) {
                    res.status(404).json({ error: 'Banner not found' });
                    return;
                }
                res.status(200).json({ message: 'Banner deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete banner' });
            }
        });
    }
    getBanners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield this.service.getBanners();
                res.status(200).json(banners);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch banners' });
            }
        });
    }
}
exports.default = IndexController;
