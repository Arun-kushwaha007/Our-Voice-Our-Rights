"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const MetricsSchema = new mongoose_1.Schema({
    beneficiaries: { type: Number, default: 0 },
    fundsReleased: { type: Number, default: 0 },
    daysWorked: { type: Number, default: 0 },
    paymentsOnTimePct: { type: Number, default: 0 }
}, { _id: false });
const DistrictSnapshotSchema = new mongoose_1.Schema({
    state: { type: String, required: true },
    districtId: { type: String, required: true, index: true },
    districtName: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    metrics: { type: MetricsSchema, required: true },
    sourceUrl: { type: String },
    fetchedAt: { type: Date, default: Date.now },
    raw: { type: mongoose_1.Schema.Types.Mixed }
});
DistrictSnapshotSchema.index({ districtId: 1, year: -1, month: -1 });
exports.default = mongoose_1.default.model("DistrictSnapshot", DistrictSnapshotSchema);
