import mongoose, { Schema, Document } from "mongoose";

export interface IMetrics {
  beneficiaries: number;
  fundsReleased: number;
  daysWorked: number;
  paymentsOnTimePct?: number;
  [key: string]: any;
}

export interface IDistrictSnapshot extends Document {
  state: string;
  districtId: string;
  districtName: string;
  year: number;
  month: number;
  metrics: IMetrics;
  sourceUrl?: string;
  fetchedAt: Date;
  raw?: any;
}

const MetricsSchema: Schema = new Schema({
  beneficiaries: { type: Number, default: 0 },
  fundsReleased: { type: Number, default: 0 },
  daysWorked: { type: Number, default: 0 },
  paymentsOnTimePct: { type: Number, default: 0 }
}, { _id: false });

const DistrictSnapshotSchema: Schema = new Schema({
  state: { type: String, required: true },
  districtId: { type: String, required: true, index: true },
  districtName: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  metrics: { type: MetricsSchema, required: true },
  sourceUrl: { type: String },
  fetchedAt: { type: Date, default: Date.now },
  raw: { type: Schema.Types.Mixed }
});

DistrictSnapshotSchema.index({ districtId: 1, year: -1, month: -1 });

export default mongoose.model<IDistrictSnapshot>("DistrictSnapshot", DistrictSnapshotSchema);
