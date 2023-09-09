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
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        //  required:true
    },
    Lastname: {
        type: String,
        // required:true
    },
    gmail: {
        type: String,
        // required:true,
    },
    contact: {
        type: Number,
        // required:true,
    },
    password: {
        type: String,
        // required:true,
    }
});
userSchema.methods.getJWTToken = function () {
    const Secret = process.env.SECRET;
    return jsonwebtoken_1.default.sign({ id: this._id }, "123", { expiresIn: `1h` });
};
userSchema.methods.comparepassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.Password === password;
    });
};
exports.Users = mongoose_1.default.model('users', userSchema);
