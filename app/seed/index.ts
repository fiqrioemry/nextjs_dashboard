import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { users } from "../../lib/data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id ID DEFAULT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
            INSERT INTO users (id, role_id, name, email, password)
            VALUES (${user.id}, ${user.role_id} ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
          `;
    })
  );
  return insertedUsers;
}
