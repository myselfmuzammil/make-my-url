import app from "./app.js";
import {connectDatabase} from "./db/index.js";
import {env} from "./env.js";

await connectDatabase();

app.listen(env.PORT, () => {
  console.log(`Server listening at Port: ${env.PORT} 🙌`);
});
