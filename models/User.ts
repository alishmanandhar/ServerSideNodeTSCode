import mongoose, { Document, Model } from 'mongoose';

// USER schema and data types
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    bio: String,
    createdAt: Date
})

// Define the User document interface to provide type safety
interface UserDocument extends Document{
    name?:String;
    age?: number;
    bio?: string;
    createdAt?: Date;
}

// Defining User Model
const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export default User;