import express, { Express } from "express";
import bodyParser from 'body-parser';

import { urlRoute } from "./routes";
import { errorMiddleware } from "./middlewares";

const app: Express = express();
const PORT = Number(process.env.PORT) || 8080;

export function main() { 
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    );
    
    app.use(urlRoute);
    app.use(errorMiddleware);
    
    return app.listen(PORT, () => {
        console.log(`Server listening on Port no ${PORT} 🙌`);
    });
}    
