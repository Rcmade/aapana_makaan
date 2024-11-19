import fs from "fs";
import { db } from "../src/db/db";
import { users } from "../src/db/schema/userSchema";

// Function to insert banners into the database
export async function insertUsersIntoDB() {
  console.time("Data Insertion Time");

  try {
    // Read the banners data from the JSON file
    const data = fs.readFileSync("data/users.json", "utf-8");

    const usersData = JSON.parse(data);
    await db.delete(users);
    const d = usersData.map((a) => ({
      ...a,
      createdAt: new Date(a.createdAt),
      updatedAt: new Date(a.updatedAt),
    }));
    await db.insert(users).values(d)
    // console.log("Banners inserted successfully into the database!");
    console.timeEnd("Data Insertion Time");
  } catch (error) {
    console.error("Error inserting banners:", error);
  }
}

