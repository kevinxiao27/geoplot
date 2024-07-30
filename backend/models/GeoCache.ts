import { CallbackWithoutResultAndOptionalError, Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface GeoCache {
  name: string;
  desc: string;
  place: string;
  avatar?: string;
  location: {
    type: string;
    coordinates: Number[];
    formattedAddress: String;
  };
  createdAt: Date;
}

interface MapTilerResponse {
  features: { place_name: string; [x: string | number | symbol]: unknown }[];
  [x: string | number | symbol]: unknown;
}

// 2. Create a Schema corresponding to the document interface.
const cacheSchema = new Schema<GeoCache>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  place: {
    type: String,
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

cacheSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    try {
      const data = await fetch(
        `https://api.maptiler.com/geocoding/${this.location.coordinates[0]},${this.location.coordinates[1]}.json?key=${process.env.MAPTILER_KEY}`
      );
      const place: MapTilerResponse = await data.json();
      console.log(place);
      if (place) {
        this.place = place.features[0].place_name;
      }
    } catch {
      this.place = "";
    }
  }
);

export const GeoCache = model<GeoCache>("GeoCache", cacheSchema);
