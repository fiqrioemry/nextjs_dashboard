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
} from "./data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id ID DEFAULT PRIMARY KEY,
        role_id INT,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
          INSERT INTO users (id, role_id, name, email, password)
          VALUES (${user.id},${user.role_id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
    })
  );

  return insertedUsers;
}

async function seedCustomers() {
  // Create the 'customer' table if it doesn't exist
  await client.sql`
        CREATE TABLE IF NOT EXISTS customer (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE
        );
      `;

  // Insert customers into the database
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

async function seedCategories() {
  // Create the 'category' table if it doesn't exist
  await client.sql`
        CREATE TABLE IF NOT EXISTS category (
          id INT AUTO_INCREMENT PRIMARY KEY,
          category_name VARCHAR(255) NOT NULL,
          created_at DATE,
          updated_at DATE
        );
      `;

  // Insert categories into the database
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
  // Create the 'category' table if it doesn't exist
  await client.sql`
  CREATE TABLE IF NOT EXISTS item (
    id INT AUTO_INCREMENT PRIMARY KEY,
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

  // Insert Items into the database
  const insertedItems = await Promise.all(
    items.map(async (item) => {
      return client.sql`
              INSERT INTO item (id, category_id, item_name, item_stock, item_cost, item_price, created_at, updated_at)
              VALUES (${item.id}, ${item.category_id}, ${item.item_name}, ${item.item_stock},${item.item_cost},${item.item_price},${item.created_at}, ${item.updated_at})
              ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertedItems;
}

async function seedRoles() {
  // Create the 'role' table if it doesn't exist
  await client.sql`
        CREATE TABLE IF NOT EXISTS role (
          id INT AUTO_INCREMENT PRIMARY KEY,
          role_name VARCHAR(255) NOT NULL
        );
      `;

  const insertedRoles = await Promise.all(
    roles.map(async (role) => {
      return client.sql`
                  INSERT INTO item (id, role_name)
                  VALUES (${role.id}, ${role.role_name})
                  ON CONFLICT (id) DO NOTHING;
                `;
    })
  );

  return insertedRoles;
}

async function seedSales() {
  // Create the 'sales' table if it doesn't exist
  await client.sql`
      CREATE TABLE IF NOT EXISTS sales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        customer_id INT,
        total_amount INT NOT NULL,
        payment_type ENUM('cash', 'credit') NOT NULL,
        payment_status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
        created_at DATE,
        updated_at DATE,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (customer_id) REFERENCES customer(id)
      );
    `;

  // Insert sample sales data
  const insertedSales = await Promise.all(
    sales.map(async (sale) => {
      return client.sql`
          INSERT INTO sales (id, user_id, customer_id, total_amount, payment_type,  payment_status, created_at, updated_at)
          VALUES (${sale.id}, ${sale.user_id}, ${sale.customer_id}, ${sale.total_amount}, ${sale.payment_type}, ${sale.payment_status}, ${sale.created_at}, ${sale.updated_at})
          ON CONFLICT (id) DO NOTHING;
        `;
    })
  );

  return insertedSales;
}

async function seedSalesItem() {
  // Create the 'sales_item' table if it doesn't exist
  await client.sql`
      CREATE TABLE IF NOT EXISTS sales_item (
        id INT AUTO_INCREMENT PRIMARY KEY,
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

  // Insert sample sales_item data
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
    await seedUsers();
    await seedRoles();
    await seedCustomers();
    await seedItem();
    await seedSales();
    await seedSalesItem();
    await seedCategories();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
