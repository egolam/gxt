import "server-only";

import { DB, Transaction } from "@/db";
import { locations } from "@/db/schema";

export async function selectRandomLocation(tx: Transaction) {
  const totalLocations = await tx.query.stats.findFirst({
    columns: { locationCount: true },
  });

  if (!totalLocations?.locationCount || totalLocations?.locationCount <= 0) {
    return false;
  }

  const randomIndex = Math.floor(Math.random() * totalLocations.locationCount);

  const [randomLocation] = await tx
    .select()
    .from(locations)
    .limit(1)
    .offset(randomIndex);

  if (!randomLocation) {
    return false;
  }
  return { locationId: randomLocation.id };
}
