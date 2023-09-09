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
exports.loginusers = exports.rigisternew = void 0;
const user_1 = require("../models/user");
const errorhandle_1 = __importDefault(require("../helpers/errorhandle"));
const sendtoken_1 = require("../helpers/sendtoken");
const rigisternew = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isexits = yield user_1.Users.findOne({ gmail: email });
    if (isexits) {
        return next(new errorhandle_1.default(`The User with this email already exists`, 401));
    }
    const newone = yield user_1.Users.create({
        gmail: email,
        password: password,
    });
    res.status(200).json({
        success: true,
        newone,
    });
});
exports.rigisternew = rigisternew;
const loginusers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.Users.findOne({ gmail: email });
    if (!user) {
        return next(new errorhandle_1.default(`The User with this email is not exists`, 401));
    }
    const istrue = user.comparepassword(password);
    if (!istrue) {
        return next(new errorhandle_1.default(`Entered the wrong Password`, 403));
    }
    (0, sendtoken_1.sendtoken)(user, 200, res);
});
exports.loginusers = loginusers;
