import mongoose, { Schema, Document } from "mongoose";

export interface IMetrics {
  beneficiaries: number;
  fundsReleased: number;
  daysWorked: number;
  paymentsOnTimePct: number;
}

export interface IDistrictSnapshot extends Document {
  districtId: string;
  districtName: string;
  state: string;
  year: number;
  month: number;
  fetchedAt: Date;
  metrics: IMetrics;
}

const MetricsSchema: Schema = new Schema({
  beneficiaries: { type: Number, required: true },
  fundsReleased: { type: Number, required: true },
  daysWorked: { type: Number, required: true },
  paymentsOnTimePct: { type: Number, required: true },
}, { _id: false });

const DistrictSnapshotSchema: Schema = new Schema({
  districtId: { type: String, required: true, index: true },
  districtName: { type: String, required: true },
  state: { type: String, required: true },
  year: { type: Number, required: true, index: true },
  month: { type: Number, required: true, index: true },
  fetchedAt: { type: Date, default: Date.now },
  metrics: { type: MetricsSchema, required: true }
});

DistrictSnapshotSchema.index({ districtId: 1, year: 1, month: 1 }, { unique: true });

export default mongoose.model<IDistrictSnapshot>("DistrictSnapshot", DistrictSnapshotSchema);
