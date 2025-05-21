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
exports.Service = void 0;
const index_1 = __importDefault(require("../db/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_1.default.query('SELECT 1');
        console.log('Database connection successful:', result.rows);
    }
    catch (error) {
        console.error('Database connection failed:', error);
    }
}))();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
class Service {
    getBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.default.query('SELECT * FROM banner');
                return result.rows;
            }
            catch (error) {
                console.error('Error fetching banners:', error);
                throw new Error('Failed to fetch banners');
            }
        });
    }
    addBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, name, description, link, logo, video, horizon_img } = banner;
            const result = yield index_1.default.query(`INSERT INTO banner (image, name, description, link, logo, video, horizon_img)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [image, name, description, link, logo, video, horizon_img]);
            return result.rows[0];
        });
    }
    updateBanner(id, banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = Object.keys(banner);
            const values = Object.values(banner);
            const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
            const result = yield index_1.default.query(`UPDATE banner SET ${setClause} WHERE id = $1 RETURNING *`, [id, ...values]);
            return result.rows[0];
        });
    }
    deleteBanner(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.default.query('DELETE FROM banner WHERE id = $1', [id]);
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.default.query('SELECT * FROM account WHERE username = $1', [username]);
            const user = result.rows[0];
            if (!user) {
                throw new Error('Invalid username or password');
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid username or password');
            }
            const payload = { id: user.id, username: user.username };
            const accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return { accessToken };
        });
    }
}
exports.Service = Service;
