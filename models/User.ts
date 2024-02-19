import mongoose, { Document, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
    name: string;
    age: number;
    bio?: string;
    createdAt: Date;
}

// 2. creating a schema corresponding to document interface
const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

// 3. create model
const User = mongoose.model<User>('User', userSchema);
export default User;