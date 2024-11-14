import { sql } from "@vercel/postgres";
import { Item } from "@/lib/definition";

export default async function fetchProducts(query = "", currentPage = 1) {
  try {
    const itemsPerPage = 5; // Number of items per page
    const offset = (currentPage - 1) * itemsPerPage; // Correct pagination offset

    // Parameterized query to avoid SQL injection
    const data = await sql<Item>`
      SELECT * 
      FROM item 
      WHERE item_name ILIKE ${`%${query}%`} 
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;

    return data.rows; // Return the rows from the query
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}
