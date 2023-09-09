"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_to_db = void 0;
// // npm i -g typescript
// // tsc init
const mongoose_1 = __importDefault(require("mongoose"));
// import dotenv from 'dotenv';
// // Load environment variables from .env file
// dotenv.config();
const connect_to_db = () => {
    // console.log(process.env);
    // const url = process.env.DATABASEURL;
    // const name = process.env.DATABASENAME;
    // if (!url || !name) {
    //     console.error('Environment variables "DATABASEURL" and "DATABASENAME" are not defined.');
    //     return;
    // }
    mongoose_1.default.connect(`mongodb+srv://sivakrishna:qb4GwFPjiNNJTZ04@cluster0.7fc7lzg.mongodb.net/forgym`, {
        dbName: `forgym`, // Use the defined DATABASENAME
    }).then((data) => {
        console.log(`Mongoose database is connected to: ${data.connection.host}`);
    }).catch(error => {
        console.error(`Exiting due to error:`, error);
    });
};
exports.connect_to_db = connect_to_db;
