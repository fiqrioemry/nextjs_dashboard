import { Item } from "@/lib/definition";
import { sql } from "@vercel/postgres";
import { db } from "@vercel/postgres";

const client = await db.connect();

export async function GET(request: Request) {
  const products = await sql<Item>`SELECt * FROM items`;

  return products.rows;
}
