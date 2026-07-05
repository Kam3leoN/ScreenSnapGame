import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/screensnapgame";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cache;

/**
 * Connexion MongoDB réutilisable (serverless-friendly).
 */
export async function connectDb(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
