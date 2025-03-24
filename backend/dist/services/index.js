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
class Service {
    addBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.default.query('INSERT INTO banner (url, title, content) VALUES ($1, $2, $3) RETURNING *', [banner.url, banner.title, banner.content]);
            return result.rows[0];
        });
    }
    updateBanner(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = [];
            const values = [];
            let index = 1;
            for (const key in updatedData) {
                fields.push(`${key} = $${index}`);
                values.push(updatedData[key]);
                index++;
            }
            const query = `UPDATE banner SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
            values.push(id);
            const result = yield index_1.default.query(query, values);
            return result.rows[0] || null;
        });
    }
    deleteBanner(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.default.query('DELETE FROM banner WHERE id = $1', [id]);
            return ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
        });
    }
    getBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.default.query('SELECT * FROM banner');
            return result.rows;
        });
    }
}
exports.Service = Service;
