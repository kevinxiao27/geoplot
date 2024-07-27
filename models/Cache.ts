import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Cache {
  cacheId: string;
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
const cacheSchema = new Schema<Cache>({
  cacheId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [10, "Cache ID must be less than 10 chars"],
  },
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
      required: true,
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Create a Model.
export const Cache = model<Cache>("Cache", cacheSchema);
