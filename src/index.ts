import app from "./app.js";
import {connectDB} from "./db/index.js";
import {env} from "./env.js";

(async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server listening at Port: ${env.PORT} 🙌`);
  });
})();
