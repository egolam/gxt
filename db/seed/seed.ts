import * as fs from "fs/promises";
import path from "path";
import { locations } from "../schemas/location-schema";
import { db } from "..";
import { stats } from "../schema";
import { sql } from "drizzle-orm";

async function seed() {
  try {
    // 1. Read JSON file
    const filePath = path.join(process.cwd(), "\\db\\seed\\locations.json");
    const file = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(file);

    // 2. Transform dates (important!)
    const formatted = data.map((item: any) => ({
      ...item,
    }));

    // 3. Insert data
    await db.insert(locations).values(formatted).onConflictDoNothing();

    console.log("✅ Seeding completed");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await db
      .update(stats)
      .set({ locationCount: sql`(select count(*) from locations)` });
    await db.$client.end();
  }
}

seed();
