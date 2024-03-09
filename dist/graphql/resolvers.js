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
const User_1 = __importDefault(require("../models/User"));
const Icon_1 = __importDefault(require("../models/Icon"));
const Marker_1 = __importDefault(require("../models/Marker"));
const resolvers = {
    Query: {
        user(_, { ID }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield User_1.default.findById(ID);
            });
        },
        // getUsers is used to get users, search users and sort users
        getUsers(_, { pageNumber, number, name, sort }) {
            return __awaiter(this, void 0, void 0, function* () {
                let filter = {};
                // where number is number of data we want in pagination and skip is number of data to skip
                const skip = (pageNumber - 1) * number;
                // If name is provided, add it to the filter
                if (name) {
                    filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
                }
                return yield User_1.default.find(filter)
                    .sort({ createdAt: sort == "asc" ? 1 : -1 })
                    .skip(skip)
                    .limit(number);
            });
        },
        getIcons(_) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Icon_1.default.find();
            });
        },
        icon(_, { ID }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Icon_1.default.findById(ID);
            });
        },
        getMarkers(_) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Marker_1.default.find();
            });
        },
    },
    Mutation: {
        // create new user
        createUser(_, { userInput: { name, age, bio } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const createdUser = new User_1.default({
                    name: name,
                    age: age,
                    bio: bio
                });
                const res = yield createdUser.save(); //saving to mongodb
                return Object.assign({ id: res.id }, res.toObject() // Use toObject to get plain JavaScript object representation
                );
            });
        },
        // deleting user
        deleteUser(_, { ID }) {
            return __awaiter(this, void 0, void 0, function* () {
                const wasDeleted = (yield User_1.default.deleteOne({ _id: ID })).deletedCount;
                return wasDeleted; //1 if user has been deleted and, 0 if nothing has been deleted!
            });
        },
        //updating user
        editUser(_, { ID, userInput: { name, age, bio, createdAt } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const wasEdited = (yield User_1.default.updateOne({ _id: ID }, { name: name, age: age, bio: bio, createdAt: createdAt })).modifiedCount;
                return wasEdited; //1 if user has been edited and , 0 if nothing has been edited!
            });
        },
        createIcon(_, { iconInput: { name } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const createdIcon = new Icon_1.default({
                    name: name,
                    path: "xxx"
                });
                const res = yield createdIcon.save(); //saving to mongodb
                return Object.assign({ id: res.id }, res.toObject() // Use toObject to get plain JavaScript object representation
                );
            });
        },
        editIcon(_, { ID, iconInput: { name } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const wasEdited = (yield Icon_1.default.updateOne({ _id: ID }, { name: name })).modifiedCount;
                return wasEdited; //1 if icon has been edited and , 0 if nothing has been edited!
            });
        },
        // deleting icon
        deleteIcon(_, { ID }) {
            return __awaiter(this, void 0, void 0, function* () {
                const wasDeleted = (yield Icon_1.default.deleteOne({ _id: ID })).deletedCount;
                return wasDeleted; //1 if marker has been deleted and, 0 if nothing has been deleted!
            });
        },
        createMarker(_, { markerInput: { title, lat, long, rotation, color, icon } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const createdMarker = new Marker_1.default({
                    title,
                    lat,
                    long,
                    rotation,
                    color,
                    icon
                });
                const res = yield createdMarker.save(); //saving to mongodb
                return Object.assign({ id: res.id }, res.toObject() // Use toObject to get plain JavaScript object representation
                );
            });
        },
        editMarker(_, { ID, markerInput: { title, lat, long, rotation, color, icon } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const wasEdited = (yield Marker_1.default.updateOne({ _id: ID }, { title: title, lat: lat, long: long, rotation: rotation, color: color, icon: icon })).modifiedCount;
                return wasEdited; //1 if user has been edited and , 0 if nothing has been edited!
            });
        },
        deleteMarker(_, { ID }) {
            return __awaiter(this, void 0, void 0, function* () {
                const wasDeleted = (yield Marker_1.default.deleteOne({ _id: ID })).deletedCount;
                return wasDeleted; //1 if marker has been deleted and, 0 if nothing has been deleted!
            });
        },
    }
};
exports.default = resolvers;
