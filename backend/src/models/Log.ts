import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  method: string;
  url: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

export default mongoose.model<ILog>("Log", LogSchema);
