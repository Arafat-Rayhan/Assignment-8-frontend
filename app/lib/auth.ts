import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.BETTER_MONGODB_AUTH;
const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

if (!mongoUri) {
  throw new Error("Missing BETTER_MONGODB_AUTH environment variable");
}

const client = new MongoClient(mongoUri);
const db = client.db(process.env.MONGODB_DB_NAME || undefined);

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

const socialProviders = {
  ...(googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : {}),
  ...(githubClientId && githubClientSecret
    ? {
        github: {
          clientId: githubClientId,
          clientSecret: githubClientSecret,
        },
      }
    : {}),
};

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  baseURL,

  socialProviders,

  database: mongodbAdapter(db, {
    client,
  }),

  advanced: {
    database: {
      joins: true,
    },
  },

  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});