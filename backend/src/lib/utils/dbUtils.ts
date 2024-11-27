import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";
export const nId = (length = 11) => nanoid(length);

export const formateInsertLocation = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => sql`ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)`;
