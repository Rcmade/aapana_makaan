import fs from "fs";
import { db } from "../src/db/db";
import {
  categories,
  products,
  productImages,
} from "../src/db/schema/productSchema";

// Load and parse product data from JSON file
const rawData = fs.readFileSync("data/productData.json", "utf-8");
const {
  categories: categoriesData,
  products: productsData,
  productImages: productImagesData,
} = JSON.parse(rawData);

export const insetProducts = async () => {
  console.time("Data Insertion Time");

  // Clear existing data
  await db.delete(productImages).execute();
  await db.delete(products).execute();
  await db.delete(categories).execute();

  // Insert categories
  for (const category of categoriesData) {
    const categoryInsertData = {
      id: category.id,
      name: category.name,
      description: category.description,
      parentCategoryId: category.parentCategoryId,
      createdAt: new Date(category.createdAt),
      updatedAt: new Date(category.updatedAt),
    };
    await db.insert(categories).values(categoryInsertData).onConflictDoUpdate({
      target: categories.id,
      set: categoryInsertData,
    });
  }

  // Insert products and their variants (handled as products with parentId)
  for (const product of productsData) {
    const productInsertData = {
      ...product,
      userId: product.userId,
      id: product.id,
      name: product.name,
      sortDescription: product.sortDescription,
      description: product.description,
      sku: product.sku,
      categoryId: product.categoryId,
      price: product.price,
      discountedPrice: product.discountedPrice,
      stock: product.stock,
      isAvailable: product.isAvailable,
      currentVariantType: product.currentVariantType,
      variantValue: product.variantValue,
      primaryImage: product.primaryImage,
      brand: product.brand,
      parentId: product.parentId || null, // Handle variants with parentId
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt),
      meta: product.meta, // Store directly as JSON
    };
    await db.insert(products).values(productInsertData).onConflictDoUpdate({
      target: products.id,
      set: productInsertData,
    });
  }

  // Insert product images
  for (const image of productImagesData) {
    const productImageInsertData = {
      id: image.id,
      productId: image.productId,
      imageUrl: image.imageUrl,
      createdAt: new Date(image.createdAt),
      role: image.role || "SUB_IMAGES", // Set default role if not provided
    };
    await db
      .insert(productImages)
      .values(productImageInsertData)
      .onConflictDoUpdate({
        target: productImages.id,
        set: productImageInsertData,
      });
  }

  console.log("Data has been inserted into the database");
  console.timeEnd("Data Insertion Time");
};
