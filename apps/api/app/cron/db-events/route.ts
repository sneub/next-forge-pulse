import { database } from "@repo/database";
export const dynamic = "force-dynamic";

export async function GET() {
  const stream = await database.page.stream({
    name: "page-create-events",
    create: {},
  });

  for await (const event of stream) {
    console.log(event); // Do something with the event
  }

  // Probably we will never reach this point
  return new Response("Finished consuming queued events.");
}
