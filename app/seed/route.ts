import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import {
  users,
  customers,
  sales,
  sales_item,
  categories,
  items,
  roles,
} from "../../lib/data";

const client = await db.connect();

async function seedRoles() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS role (
      id SERIAL PRIMARY KEY,
      role_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedRoles = await Promise.all(
    roles.map(async (role) => {
      return client.sql`
        INSERT INTO role (id, role_name)
        VALUES (${role.id}, ${role.role_name})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedRoles;
}

async function seedUsers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      role_id INT,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      FOREIGN KEY (role_id) REFERENCES role(id)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, role_id, name, email, password)
        VALUES (${user.id}, ${user.role_id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedCategories() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS category (
      id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL,
      created_at DATE,
      updated_at DATE
    );
  `;

  const insertedCategories = await Promise.all(
    categories.map(async (category) => {
      return client.sql`
        INSERT INTO category (id, category_name, created_at, updated_at)
        VALUES (${category.id}, ${category.category_name}, ${category.created_at}, ${category.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedCategories;
}

async function seedItems() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS item (
      id SERIAL PRIMARY KEY,
      category_id INT,
      item_name VARCHAR(255) NOT NULL,
      item_stock INT DEFAULT 0,
      item_cost INT,
      item_price INT,
      created_at DATE,
      updated_at DATE,
      FOREIGN KEY (category_id) REFERENCES category(id)
    );
  `;

  const insertedItems = await Promise.all(
    items.map(async (item) => {
      return client.sql`
        INSERT INTO item (id, category_id, item_name, item_stock, item_cost, item_price, created_at, updated_at)
        VALUES (${item.id}, ${item.category_id}, ${item.item_name}, ${item.item_stock}, ${item.item_cost}, ${item.item_price}, ${item.created_at}, ${item.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedItems;
}

async function seedCustomers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS customer (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(async (customer) => {
      return client.sql`
        INSERT INTO customer (id, name, email)
        VALUES (${customer.id}, ${customer.name}, ${customer.email})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedCustomers;
}

async function seedSales() {
  await client.sql`
    CREATE TYPE payment_type_enum AS ENUM ('cash', 'credit');
    CREATE TYPE payment_status_enum AS ENUM ('unpaid', 'paid');
  `;

  await client.sql`
    CREATE TABLE IF NOT EXISTS sales (
      id SERIAL PRIMARY KEY,
      user_id INT,
      customer_id INT,
      total_amount INT NOT NULL,
      payment_type payment_type_enum,
      payment_status payment_status_enum,
      created_at DATE,
      updated_at DATE,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (customer_id) REFERENCES customer(id)
    );
  `;

  const insertedSales = await Promise.all(
    sales.map(async (sale) => {
      return client.sql`
        INSERT INTO sales (id, user_id, customer_id, total_amount, payment_type, payment_status, created_at, updated_at)
        VALUES (${sale.id}, ${sale.user_id}, ${sale.customer_id}, ${sale.total_amount}, ${sale.payment_type}, ${sale.payment_status}, ${sale.created_at}, ${sale.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedSales;
}
async function seedSalesItem() {
  client.sql`
    CREATE TABLE IF NOT EXISTS sales_item (
      id SERIAL PRIMARY KEY,
      sales_id INT,
      item_id INT,
      item_price INT NOT NULL,
      item_amount INT NOT NULL,
      created_at DATE,
      updated_at DATE,
      FOREIGN KEY (sales_id) REFERENCES sales(id),
      FOREIGN KEY (item_id) REFERENCES item(id)
    );
  `;

  const insertedSalesItem = await Promise.all(
    sales_item.map(async (salesItem) => {
      return client.sql`
        INSERT INTO sales_item (id, sales_id, item_id, item_price, item_amount, created_at, updated_at)
        VALUES (${salesItem.id}, ${salesItem.sales_id}, ${salesItem.item_id}, ${salesItem.item_price}, ${salesItem.item_amount}, ${salesItem.created_at}, ${salesItem.updated_at})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedSalesItem;
}
export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedRoles();
    await seedUsers();
    await seedCustomers();
    await seedCategories();
    await seedItems();
    await seedSales();
    await seedSalesItem();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error: error }, { status: 500 });
  }
}
