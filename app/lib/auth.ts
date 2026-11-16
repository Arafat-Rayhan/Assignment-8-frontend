 
 
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

 

  database: mongodbAdapter(db, {
    client,
  }),
 
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
})