import pool from '../db/index';
import { Banner } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

(async () => {
    try {
        const result = await pool.query('SELECT 1');
        console.log('Database connection successful:', result.rows);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

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
        const { image, name, description, link_ios, logo, video, horizon_img, link_android } = banner;
        const result = await pool.query(
            `INSERT INTO banner (image, name, description, link_ios, logo, video, horizon_img, link_android)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [image, name, description, link_ios, logo, video, horizon_img, link_android]
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

    async login(username: string, password: string): Promise<{ accessToken: string }> {
        const result = await pool.query('SELECT * FROM account WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('Invalid username or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid username or password');
        }

        const payload = { id: user.id, username: user.username };
        const accessToken = jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' });

        return { accessToken };
    }
}