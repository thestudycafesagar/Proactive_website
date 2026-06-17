"use server";

import { z } from "zod";
import { getServerConfig } from "../config.server";

const schema = z.object({ name: z.string().min(1) });

export async function getGreeting(input: { name: string }) {
  const data = schema.parse(input);
  const config = getServerConfig();
  return {
    greeting: `Hello, ${data.name}!`,
    mode: config.nodeEnv ?? "unknown",
  };
}
