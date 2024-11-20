import "server-only";

import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";
import { env } from "@repo/env";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

export const database = new PrismaClient({ adapter }).$extends(
  withPulse({ apiKey: process.env.PULSE_API_KEY! }),
);

export * from "@prisma/client";
