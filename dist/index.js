"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const adminroute_1 = __importDefault(require("./routes/adminroute"));
const database_1 = require("./config/database");
const userroutes_1 = __importDefault(require("./routes/userroutes"));
(0, database_1.connect_to_db)();
app.use(express_1.default.json());
app.use("/api/v1", adminroute_1.default);
app.use("/api/v2", userroutes_1.default);
app.listen(port, () => {
    console.log(`Listing in the port ${port}`);
});
