export interface apiResponse<T> {
  success: boolean;
  count: number;
  data?: T;
}

export type GeoCache = {
  _id: string;
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
  [x: string | number | symbol]: unknown;
};

export interface apiError {
  error: String;
}
