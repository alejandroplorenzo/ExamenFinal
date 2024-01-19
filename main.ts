import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Mutation } from "./resolvers/mutation.ts";

import { typeDefs } from "./gql/schema.ts";
import mongoose from "mongoose";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); 
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}

await mongoose.connect(MONGO_URL);

console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Mutation
    },
});

const { url } = await startStandaloneServer(server);
console.info(`🚀 Server ready at ${url}`);

/*
http://localhost:4000

git init
git add *ts / git add .
git commit -m "Agregando archivos TypeScript"
git remote add origin https://github.com/alejandroplorenzo/Ejemplo.git
git push -u origin main / master
*/