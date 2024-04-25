import mongoose from "mongoose";

import {env} from "../env.js";
import {DB_NAME} from "../constants.js";

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${env.MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `MongoDB connected 🤝 DB HOST ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log(`MongoDB connection Failed 💔`);
    process.exit(1);
  }
}
