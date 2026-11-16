<<<<<<< HEAD
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.BETTER_MONGODB_AUTH;
const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

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

if (Object.keys(socialProviders).length === 0) {
  console.warn(
    "Social login is disabled because no OAuth credentials were found. Set GOOGLE_CLIENT_ID/SECRET and GITHUB_CLIENT_ID/SECRET."
  );
}

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  baseURL,

  socialProviders,
=======
import { betterAuth,} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.BETTER_MONGODB_AUTH!);
const db = client.db();

export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  },

   baseURL: process.env.BETTER_AUTH_URL, 

  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
          github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
    },

>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23

  database: mongodbAdapter(db, {
    client,
  }),

<<<<<<< HEAD
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
=======
   advanced: {
    database: {
      joins: true
    },
  },

  plugins:[jwt()],
  session: {
    cookieCache:{
      enabled:true,
      strategy:'jwt',
      maxAge: 7 * 24 * 60 * 60 
    }
  }
>>>>>>> 1a2e94553155da1aeceff124478722b03a3ede23
});