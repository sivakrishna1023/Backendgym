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
exports.Members = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const membersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        //required: true,
    },
    gmail: {
        type: String,
        //required: true,
    },
    Password: {
        type: String,
        //required: true,
    },
    joinedat: {
        type: Date,
        default: Date.now(),
    },
});
membersSchema.methods.getJWTToken = function () {
    const Secret = process.env.SECRET;
    return jsonwebtoken_1.default.sign({ id: this._id }, "123", { expiresIn: `1h` });
};
membersSchema.methods.comparepassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.Password === password;
    });
};
exports.Members = mongoose_1.default.model('member', membersSchema);
