"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// USER schema and data types
const userSchema = new mongoose_1.default.Schema({
    name: String,
    age: Number,
    bio: String,
    createdAt: Date
});
// Defining User Model
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
