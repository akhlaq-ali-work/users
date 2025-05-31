import mongoose, { Schema, Document } from "mongoose";

export interface IProxyRule extends Document {
  loggingEnabled: boolean;
  whitelist: string[];
}

const ruleSchema = new Schema<IProxyRule>({
  loggingEnabled: { type: Boolean, default: true },
  whitelist: { type: [String], default: [] },
});

export default mongoose.model<IProxyRule>("ProxyRule", ruleSchema);
