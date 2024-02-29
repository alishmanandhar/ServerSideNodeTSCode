import mongoose, { Document, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Icon {
    name: string;
    path: string;
    createdAt: Date;
}

// 2. creating a schema corresponding to document interface
const iconSchema = new mongoose.Schema<Icon>({
    name: { type: String, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// 3. create model
const Icon = mongoose.model<Icon>('Icon', iconSchema);
export default Icon;