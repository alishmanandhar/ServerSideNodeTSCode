"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// 2. creating a schema corresponding to document interface
const markerSchema = new mongoose_1.default.Schema({
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    rotation: { type: Number, required: true },
    iconID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
// 3. create model
const Marker = mongoose_1.default.model('Marker', markerSchema);
exports.default = Marker;
