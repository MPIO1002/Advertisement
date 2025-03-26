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
    async addBanner(banner: Omit<Banner, 'id'>): Promise<Banner> {
        const result = await pool.query(
            'INSERT INTO banner (url, title, content) VALUES ($1, $2, $3) RETURNING *',
            [banner.url, banner.title, banner.content]
        );
        return result.rows[0];
    }

    async updateBanner(id: number, updatedData: Partial<Banner>): Promise<Banner | null> {
        const fields = [];
        const values = [];
        let index = 1;

        for (const key in updatedData) {
            fields.push(`${key} = $${index}`);
            values.push((updatedData as any)[key]);
            index++;
        }

        const query = `UPDATE banner SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
        values.push(id);

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async deleteBanner(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM banner WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }

    async getBanners(): Promise<Banner[]> {
        try {
            const result = await pool.query('SELECT * FROM banner');
            return result.rows;
        } catch (error) {
            console.error('Error fetching banners:', error);
            throw new Error('Failed to fetch banners');
        }
    }
}