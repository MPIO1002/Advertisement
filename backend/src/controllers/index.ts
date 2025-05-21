import { Request, Response, Router } from 'express';
import { Service } from '../services';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import redis from '../utils/redisClient'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

class IndexController {
    public router: Router;
    private service: Service;

    constructor() {
        this.router = Router();
        this.service = new Service();
        this.initializeRoutes();
    }

    private initializeRoutes() {
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
        this.router.post('/login', this.login.bind(this));
    }

    //Ứng dụng cache để tối ưu memory usage
    private async getBanners(req: Request, res: Response): Promise<void> {
        try {
            const cacheKey = 'banners';
            const cachedData = await redis.get(cacheKey);

            if (cachedData) {
                res.status(200).json(JSON.parse(cachedData));
                return;
            }

            const banners = await this.service.getBanners();

            await redis.set(cacheKey, JSON.stringify(banners), 'EX', 300); // cache 5 phút

            res.status(200).json(banners);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch banners' });
        }
    }

    private async addBanner(req: Request, res: Response) {
        try {
            // Upload từng file lên Cloudinary nếu có
            const uploadToCloudinary = async (file?: Express.Multer.File) => {
                if (!file) return undefined;
                return new Promise<string>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: file.mimetype.startsWith('video') ? 'video' : 'image' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result?.secure_url || '');
                        }
                    );
                    stream.end(file.buffer);
                });
            };

            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const imageUrl = files?.image ? await uploadToCloudinary(files.image[0]) : req.body.image;
            const videoUrl = files?.video ? await uploadToCloudinary(files.video[0]) : req.body.video;
            const logoUrl = files?.logo ? await uploadToCloudinary(files.logo[0]) : req.body.logo;
            const horizonImgUrl = files?.horizon_img ? await uploadToCloudinary(files.horizon_img[0]) : req.body.horizon_img;

            // Lưu thông tin banner vào DB
            const banner = await this.service.addBanner({
                ...req.body,
                image: imageUrl,
                video: videoUrl,
                logo: logoUrl,
                horizon_img: horizonImgUrl,
            });
            await redis.del('banners'); // Xóa cache sau khi thêm banner mới
            res.status(201).json(banner);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add banner' });
        }
    }

    private async updateBanner(req: Request, res: Response) {
        try {
            const uploadToCloudinary = async (file?: Express.Multer.File) => {
                if (!file) return undefined;
                return new Promise<string>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: file.mimetype.startsWith('video') ? 'video' : 'image' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result?.secure_url || '');
                        }
                    );
                    stream.end(file.buffer);
                });
            };

            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const imageUrl = files?.image ? await uploadToCloudinary(files.image[0]) : req.body.image;
            const videoUrl = files?.video ? await uploadToCloudinary(files.video[0]) : req.body.video;
            const logoUrl = files?.logo ? await uploadToCloudinary(files.logo[0]) : req.body.logo;
            const horizonImgUrl = files?.horizon_img ? await uploadToCloudinary(files.horizon_img[0]) : req.body.horizon_img;

            const id = Number(req.params.id);
            const updatedBanner = await this.service.updateBanner(id, {
                ...req.body,
                image: imageUrl,
                video: videoUrl,
                logo: logoUrl,
                horizon_img: horizonImgUrl,
            });
            await redis.del('banners'); // Xóa cache sau khi cập nhật banner
            res.status(200).json(updatedBanner);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update banner' });
        }
    }

    private async deleteBanner(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.service.deleteBanner(id);
            await redis.del('banners'); // Xóa cache sau khi xóa banner
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete banner' });
        }
    }
    
    private async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }
            const result = await this.service.login(username, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    }
}

export default IndexController;