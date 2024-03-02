import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Marker {
    _id:string;
    title: string;
    lat: number;
    long: number;
    rotation: number;
    color: string;//foreign key from Icon
    createdAt: Date;
}

// 2. creating a schema corresponding to document interface
const markerSchema = new mongoose.Schema<Marker>({
    title: {type: String, required:true},
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    rotation: { type: Number, required: true },
    color: {type: String, required:true},
    createdAt: { type: Date, default: Date.now }
});

// 3. create model
const Marker = mongoose.model<Marker>('Marker', markerSchema);
export default Marker;