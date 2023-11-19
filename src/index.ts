import { app } from './app.js';
import { connectDB } from "./db";
import { log } from './utils'

;(
    async () => {
        await connectDB();

        app.listen(process.env.PORT, () => {
            log.info(`Server listening at Port: ${process.env.PORT} 🙌`);
        });
    }
)();