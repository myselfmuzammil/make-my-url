import { app } from './app.js';
import { connectDB } from "./db";

;(
    async () => {
        await connectDB();
        
        app.listen(process.env.PORT, () => {
            console.log(`Server listening at Port ${process.env.PORT} 🙌`);
        });
    }
)();
