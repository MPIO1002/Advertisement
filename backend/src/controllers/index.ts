import { Request, Response, Router } from 'express';
import { Service } from '../services';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

class IndexController {
    public router: Router;
    private service: Service;

    constructor() {
        this.router = Router();
        this.service = new Service();
        this.initializeRoutes();
    }

    private initializeRoutes() {
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

    private async updateBanner(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            if (updatedData.image) {
                // Upload new image to Cloudinary
                const uploadResponse = await cloudinary.uploader.upload(updatedData.image, {
                    folder: 'banners',
                });
                updatedData.url = uploadResponse.secure_url;
            }

            const updatedBanner = await this.service.updateBanner(Number(id), updatedData);
            if (!updatedBanner) {
                res.status(404).json({ error: 'Banner not found' });
                return;
            }

            res.status(200).json(updatedBanner);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update banner' });
        }
    }

    private async deleteBanner(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const success = await this.service.deleteBanner(Number(id));

            if (!success) {
                res.status(404).json({ error: 'Banner not found' });
                return;
            }

            res.status(200).json({ message: 'Banner deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete banner' });
        }
    }

    private async getBanners(req: Request, res: Response): Promise<void> {
        try {
            const banners = await this.service.getBanners();
            res.status(200).json(banners);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch banners' });
        }
    }
}

export default IndexController;