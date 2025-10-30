import mongoose, { Schema, Document } from "mongoose";

export interface IDistrict extends Document {
    name: string;
    code: string;
    state: string;
    performanceIndex: number;
    lastUpdated: Date;
}

const DistrictSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    performanceIndex: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model<IDistrict>("District", DistrictSchema);
