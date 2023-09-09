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
exports.createuser = exports.deleteuser = exports.updateuser = exports.getallusers = exports.loginuser = exports.rigisteruser = void 0;
const member_1 = require("../models/member");
const user_1 = require("../models/user");
const errorhandle_1 = __importDefault(require("../helpers/errorhandle"));
const sendtoken_1 = require("../helpers/sendtoken");
//Register a New Admin
const rigisteruser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const isexist = yield member_1.Members.findOne({ gmail: email });
    if (isexist) {
        return next(new errorhandle_1.default(`The Mail have already used try another`, 401));
    }
    else {
        const user = yield member_1.Members.create({
            name: name,
            gmail: email,
            Password: password
        });
        yield user.save();
        (0, sendtoken_1.sendtoken)(user, 200, res);
    }
});
exports.rigisteruser = rigisteruser;
// creating the admin login
const loginuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorhandle_1.default(`Please enter the Email and the Password`, 401));
    }
    const user = yield member_1.Members.findOne({ gmail: email }).select("+Password");
    if (!user) {
        return next(new errorhandle_1.default(`Please enter a valid email`, 401));
    }
    const ispasswordmatch = yield user.comparepassword(password);
    if (!ispasswordmatch) {
        return next(new errorhandle_1.default(`Password doesn't match`, 403));
    }
    (0, sendtoken_1.sendtoken)(user, 200, res);
});
exports.loginuser = loginuser;
//create the getting all users
const getallusers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.Users.find();
    res.status(200).json({
        success: true,
        users,
    });
});
exports.getallusers = getallusers;
//create each user update with given data
const updateuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = user_1.Users.findById(req.params.id);
    if (!user) {
        return next(new errorhandle_1.default(`User Not found to update details`, 403));
    }
    else {
        const data = req.body;
        var updated = yield user_1.Users.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            message: `Succefully updated`,
            success: true,
            updated,
        });
    }
});
exports.updateuser = updateuser;
//create a user can be deleted 
const deleteuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = user_1.Users.findById(req.params.id);
    if (!user) {
        return next(new errorhandle_1.default(`User Not found to delete operations`, 403));
    }
    else {
        yield user_1.Users.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: `Sucessfully deleted the user`,
            sucess: true,
        });
    }
});
exports.deleteuser = deleteuser;
//create a new user 
const createuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const isexisting = yield user_1.Users.findOne({ gmail: email });
    if (isexisting) {
        return next(new errorhandle_1.default(`The user of this mail already exists`, 403));
    }
    else {
        const user = yield user_1.Users.create(req.body);
        res.status(200).json({
            message: `The User Created successfully`,
            success: true,
        });
    }
});
exports.createuser = createuser;
