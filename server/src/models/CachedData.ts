// import mongoose, { Schema, Document } from "mongoose";

// export interface ICachedData extends Document {
//   key: string;
//   data: any;
//   expiresAt: Date;
// }

// const CachedDataSchema: Schema = new Schema({
//   key: { type: String, required: true, unique: true, index: true },
//   data: { type: Schema.Types.Mixed, required: true },
//   expiresAt: { type: Date, required: true, index: { expires: "1m" } }
// });

// export default mongoose.model<ICachedData>("CachedData", CachedDataSchema);
