import fs from "fs";
import { db } from "../src/db/db";
// import { banners } from "../src/db/schema/bannerSchema";

// Function to insert banners into the database
// export async function insertBannersIntoDB() {
//   console.time("Data Insertion Time");

//   try {
//     // Read the banners data from the JSON file
//     const data = fs.readFileSync("data/banners.json", "utf-8");
//     const bannerData = JSON.parse(data);
//     await db.delete(banners);
//     // Insert each banner into the database
//     for (const banner of bannerData) {
//       await db
//         .insert(banners)
//         .values({
//           id: banner.id,
//           userId: banner.userId,
//           title: banner.title,
//           imageUrl: banner.imageUrl,
//           link: banner.link,
//           bannerType: banner.bannerType,
//           isActive: banner.isActive,
//           priority: banner.priority,
//           startDate: new Date(banner.startDate),
//           endDate: new Date(banner.endDate),
//           createdAt: new Date(banner.createdAt),
//           updatedAt: new Date(banner.updatedAt),
//         })
//         .onConflictDoNothing();
//     }

//     console.log("Banners inserted successfully into the database!");
//     console.timeEnd("Data Insertion Time");
//   } catch (error) {
//     console.error("Error inserting banners:", error);
//   }
// }

// Call the function to insert banners into the database
// insertBannersIntoDB();
