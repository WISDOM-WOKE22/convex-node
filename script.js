import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const convexUrl = process.env["CONVEX_URL"];
if (!convexUrl) {
  throw new Error("CONVEX_URL environment variable is not set.");
}

const client = new ConvexHttpClient(convexUrl);
client.query(api.tasks.get).then(console.log);