
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("pizzahub");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

        account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          role: user.role,
        }),
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.role !== "vendor" && user.role !== "customer") {
            user.role = "customer";
          }
          return { data: user };
        },
      },
      update: {
        before: async (data) => {
          delete data.role;
          delete data.isBlocked;
          delete data.subscriptionPlan;
          delete data.subscriptionExpiresAt;
          return { data };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      businessName: {
        type: "string",
        required: false,
        input: true,
      },
      subscriptionPlan: {
        type: "string",
        required: false,
        defaultValue: "free",
        input: false,
      },

     

      subscriptionExpiresAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
});