"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// 2. creating a schema corresponding to document interface
const iconSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
// 3. create model
const Icon = mongoose_1.default.model('Icon', iconSchema);
exports.default = Icon;
