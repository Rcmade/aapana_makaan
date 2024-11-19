import { faker } from "@faker-js/faker";
import fs from "fs";
import { userData } from "./userData";
import { nId } from "../src/lib/utils/dbUtils";
// Existing banner images
const bannerList = [
  "/images/banner/img1.webp",
  "/images/banner/img2_mobile.webp",
  "/images/banner/img2.webp",
  "/images/banner/img3_mobile.jpg",
  "/images/banner/img3.jpg",
  "/images/banner/img4_mobile.jpg",
  "/images/banner/img5_mobile.png",
  "/images/banner/img5.webp",
  "/images/banner/Newsletter.png",
  "/images/banner/ShopBanner.png",
  "/images/banner/ShopSm.png",
  "/images/banner/Slider.png",
];

const rawData = fs.readFileSync("data/productData.json", "utf-8");
const { categories, products } = JSON.parse(rawData);

// Function to generate links based on banner type
function generateBannerLink(bannerType, categories, products) {
  if (bannerType === "category") {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return `/shop/${category.name}`;
  } else if (bannerType === "promo" || bannerType === "hero") {
    const product = products[Math.floor(Math.random() * products.length)];
    const category = categories.find((cat) => cat.id === product.categoryId);
    return `/shop/${category.name}/${product.id}`;
  }
  return faker.internet.url(); // Fallback for other banner types
}

// Function to generate random banner data
function generateBanners(count) {
  const banners = [];
  const bannerTypes = ["category", "hero", "promo"];

  for (let i = 0; i < count; i++) {
    const user = userData[Math.floor(Math.random() * userData.length)];
    const bannerImage =
      bannerList[Math.floor(Math.random() * bannerList.length)];
    const bannerType =
      bannerTypes[Math.floor(Math.random() * bannerTypes.length)]; // Choose from predefined banner types
    const startDate = faker.date.past(1);
    const endDate = faker.date.future(1, startDate);

    // Generate the appropriate link based on banner type
    const link = generateBannerLink(bannerType, categories, products);

    banners.push({
      id: nId(), // Generate a unique ID
      userId: user.id,
      title: faker.lorem.sentence(), // Random title
      imageUrl: bannerImage,
      link: link, // Use generated link
      bannerType: bannerType, // Select from predefined banner types
      isActive: faker.datatype.boolean(), // Random active status
      priority: faker.number.int({ min: 0, max: 10 }), // Random priority
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return banners;
}

export const genBanners = (num = 50) => {
  // Generate 50 random banners
  const randomBanners = generateBanners(num);

  // Write the banners to a JSON file
  fs.writeFileSync(
    "data/banners.json",
    JSON.stringify(randomBanners, null, 2),
    "utf-8"
  );
};

console.log("Random banners data generated and saved to banners.json");
