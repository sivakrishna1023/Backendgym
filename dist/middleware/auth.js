"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorhandle_1 = __importDefault(require("../helpers/errorhandle"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isAuthenticatedUser = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return next(new errorhandle_1.default(`Token not found invalid auth`, 401));
    }
    else {
        const Secret = process.env.SECRET;
        jsonwebtoken_1.default.verify(token, "123", (err, payload) => {
            if (err) {
                return next(new errorhandle_1.default(`Error in verifying the token`, 403));
            }
            if (!payload || typeof payload === "string") {
                return next(new errorhandle_1.default(`Error in verifying the token`, 403));
            }
            req.headers["userId"] = payload.id;
            // req.userId = user.id;
            next();
        });
    }
};
exports.isAuthenticatedUser = isAuthenticatedUser;
