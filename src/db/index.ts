import mongoose from 'mongoose';

import { DB_NAME } from '../constants.js';
import { log } from '../utils';

export async function connectDB() {
    for (let i = 0; i < 3; ++i) {
        try {
            const connectionInstance = await mongoose.connect(
                `${process.env.MONGO_URI}/${DB_NAME}`
            );
            log.info(`MongoDB connected 🤝 DB HOST ${
                connectionInstance.connection.host
            }`);
            break;
        } catch (err) {
            log.error(`MongoDB connection Failed 💔 ${i}`);
            if (i >= 2) {
                process.exit(1)
            }
        }
    }
}