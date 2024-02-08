import { createClient } from "redis";
import { env } from "~/shared/helpers";

const redis = createClient({
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_URL,
    port: env.REDIS_PORT,
  },
});

redis.connect();

redis.on("error", (err) => {
  console.log(err);
  console.log("Redis Client Error");
});

export { redis };
