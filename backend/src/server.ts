import app from "./app";
import { ENV } from "./config/constants";

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port http://localhost:${ENV.PORT}`);
});
