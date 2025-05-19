import pool from '../db/index';
import { Banner } from '../models';

(async () => {
    try {
        const result = await pool.query('SELECT 1');
        console.log('Database connection successful:', result.rows);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

export class Service {
    async getBanners(): Promise<Banner[]> {
        try {
            const result = await pool.query('SELECT * FROM banner');
            return result.rows;
        } catch (error) {
            console.error('Error fetching banners:', error);
            throw new Error('Failed to fetch banners');
        }
    }

    async addBanner(banner: Omit<Banner, 'id'>): Promise<Banner> {
        const { image, name, description, link, logo, video, horizon_img } = banner;
        const result = await pool.query(
            `INSERT INTO banner (image, name, description, link, logo, video, horizon_img)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [image, name, description, link, logo, video, horizon_img]
        );
        return result.rows[0];
    }

    async updateBanner(id: number, banner: Partial<Banner>): Promise<Banner> {
        const fields = Object.keys(banner);
        const values = Object.values(banner);
        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
        const result = await pool.query(
            `UPDATE banner SET ${setClause} WHERE id = $1 RETURNING *`,
            [id, ...values]
        );
        return result.rows[0];
    }

    async deleteBanner(id: number): Promise<void> {
        await pool.query('DELETE FROM banner WHERE id = $1', [id]);
    }
}