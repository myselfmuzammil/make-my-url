import mongoose from 'mongoose';

import { DB_NAME } from '../constants.js';

export async function connectDB() {
    for (let i = 0; i < 3; ++i) {
        try {
            const connectionInstance = await mongoose.connect(
                `${process.env.MONGO_URI}/${DB_NAME}`
            );
            console.log(`MongoDB connected 🤝 DB HOST ${
                connectionInstance.connection.host
            }`);
            break;
        } catch (err) {
            console.log(`MongoDB connection Failed 💔 ${i}`);
            if (i >= 2) {
                throw err;
            }
        }
    }
}