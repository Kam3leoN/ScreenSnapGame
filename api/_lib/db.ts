import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  failed: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
  failed: false,
};
global.mongooseCache = cache;

const CONNECT_OPTIONS = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 4000,
  connectTimeoutMS: 4000,
} as const;

/**
 * Connexion MongoDB réutilisable (serverless-friendly).
 * Retourne null si MONGODB_URI absent ou connexion impossible.
 */
export async function connectDb(): Promise<typeof mongoose | null> {
  if (!uri) return null;
  if (cache.failed) return null;
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, CONNECT_OPTIONS)
      .then((conn) => {
        cache.conn = conn;
        return conn;
      })
      .catch((err) => {
        cache.failed = true;
        cache.promise = null;
        console.error("[db] MongoDB unavailable:", err instanceof Error ? err.message : err);
        return null;
      });
  }

  return cache.promise;
}

/**
 * Indique si une base MongoDB est configurée.
 */
export function isDbConfigured(): boolean {
  return Boolean(uri);
}
