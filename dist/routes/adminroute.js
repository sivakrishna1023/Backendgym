"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const admin_1 = require("../controllers/admin");
router.route('/rigister').post(admin_1.rigisteruser);
router.route('/login').post(admin_1.loginuser);
router.route('/allusers').get(auth_1.isAuthenticatedUser, admin_1.getallusers);
router.route('/update/:id').post(auth_1.isAuthenticatedUser, admin_1.updateuser);
router.route('/delete/:id').delete(auth_1.isAuthenticatedUser, admin_1.deleteuser);
router.route('/create/:id').post(auth_1.isAuthenticatedUser, admin_1.createuser);
exports.default = router;
