import {app} from "./app";
import {connectDB} from "./db";

(async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server listening at Port: ${process.env.PORT} 🙌`);
  });
})();
