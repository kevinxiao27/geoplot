import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface GeoCache {
  name: string;
  desc: string;
  avatar?: string;
  location: {
    type: String;
    coordinates: Number[];
    formattedAddress: String;
  };
  createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const cacheSchema = new Schema<GeoCache>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: false,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Create a Model.
export const GeoCache = model<GeoCache>("GeoCache", cacheSchema);
