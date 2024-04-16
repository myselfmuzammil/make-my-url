import mongoose from "mongoose";

import {DB_NAME} from "../constants";

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `MongoDB connected 🤝 DB HOST ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log(`MongoDB connection Failed 💔`);
    process.exit(1);
  }
}
