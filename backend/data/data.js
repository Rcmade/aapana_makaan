import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { nanoid as nId } from "nanoid";
import { userData } from "./userData";

// Fetch all images and their categories from your local directory
const getAllImagesWithCategories = (dirPath) => {
  let results = [];
  const list = fs.readdirSync(dirPath);

  list.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImagesWithCategories(filePath)); // Recurse into directories
    } else if (/\.(png|jpe?g|webp)$/i.test(file)) {
      const category = path.basename(path.dirname(filePath)); // Get the parent directory name as the category
      results.push({ imagePath: filePath, category });
    }
  });

  return results;
};

const imageDirPath = path.join(
  __dirname,
  "../../three-legant-frontend/public/images/products"
);
const allImagesWithCategories = getAllImagesWithCategories(imageDirPath);

const generateRandomData = async (num) => {
  const categories = [];
  const products = [];
  const productImages = [];
  const categoryMap = new Map();
  const variantTypes = ["Size", "Color"];

  for (let i = 0; i < num; i++) {
    const productId = nId(12);
    const { imagePath: primaryImage, category } = faker.helpers.arrayElement(
      allImagesWithCategories
    );
    const sortDescription = faker.commerce.productAdjective();

    // Select random userId from userData
    const randomUser = faker.helpers.arrayElement(userData);
    const userId = randomUser.id;

    // Check if the category exists, else create a new category
    let categoryId = categoryMap.get(category);
    if (!categoryId) {
      categoryId = nId(12);
      let parentCategoryId = null;

      if (categories.length > 0 && faker.datatype.boolean()) {
        const parentCategory = faker.helpers.arrayElement(categories);
        parentCategoryId = parentCategory.id;
      }

      categoryMap.set(category, categoryId);
      const categoryData = {
        id: categoryId,
        name: category,
        description: faker.commerce.department(),
        parentCategoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      categories.push(categoryData);
    }

    const variantType = faker.helpers.arrayElement(variantTypes);
    const variantValue =
      variantType === "Size"
        ? faker.helpers.arrayElement(["Small", "Medium", "Large"])
        : faker.color.human();

    const product = {
      id: productId,
      name: faker.commerce.productName(),
      sortDescription,
      description: faker.commerce.productDescription(),
      sku: faker.string.alphanumeric(10).toUpperCase(),
      categoryId,
      categoryName: category,
      price: parseFloat(faker.commerce.price()),
      discountedPrice: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 0, max: 100 }),
      currentVariantType: variantType,
      variantValue,
      isAvailable: faker.datatype.boolean(),
      primaryImage: primaryImage?.replaceAll(
        "/home/developer/Music/preparing/three-legant/three-legant-frontend/public",
        ""
      ),
      brand: faker.company.name(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      meta: { additionalInfo: faker.lorem.sentence() },
    };
    products.push(product);

    // Add images to product
    for (let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
      const { imagePath: imageUrl } = faker.helpers.arrayElement(
        allImagesWithCategories.filter((img) => img.category === category)
      );
      productImages.push({
        id: nId(12),
        productId,
        imageUrl: imageUrl?.replaceAll(
          "/home/developer/Music/preparing/three-legant/three-legant-frontend/public",
          ""
        ),
        createdAt: new Date(),
        role: "SUB_IMAGES", // Default to SUB_IMAGES role
      });
    }

    // Create product variants with distinct images from the parent product
    for (let k = 0; k < faker.number.int({ min: 1, max: 3 }); k++) {
      const variantId = nId(12);
      const variantType = faker.helpers.arrayElement(variantTypes);
      const variantValue =
        variantType === "Size"
          ? faker.helpers.arrayElement(["Small", "Medium", "Large"])
          : faker.color.human();

      // Filter out the parent product's primary image for the variants
      const filteredImages = allImagesWithCategories.filter(
        (img) => img.category === category && img.imagePath !== primaryImage
      );

      // Ensure there are still available images after filtering
      const { imagePath: variantImage } = filteredImages.length
        ? faker.helpers.arrayElement(filteredImages)
        : faker.helpers.arrayElement(
            allImagesWithCategories.filter((img) => img.category === category)
          );

      const variantProduct = {
        id: variantId,
        name: `${product.name} - ${variantValue}`,
        sortDescription,
        description: product.description,
        sku: faker.string.alphanumeric(10).toUpperCase(),
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        price: parseFloat(faker.commerce.price()),
        discountedPrice: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 0, max: 50 }),
        currentVariantType: variantType,
        variantValue,
        isAvailable: faker.datatype.boolean(),
        primaryImage: variantImage?.replaceAll(
          "/home/developer/Music/preparing/three-legant/three-legant-frontend/public",
          ""
        ),
        brand: product.brand,
        userId: product.userId,
        parentId: product.id, // Set the parent product's id
        createdAt: new Date(),
        updatedAt: new Date(),
        meta: { additionalInfo: faker.lorem.sentence() },
      };

      products.push(variantProduct);

      // Add variant images
      for (let m = 0; m < faker.number.int({ min: 1, max: 3 }); m++) {
        const filteredVariantImages = filteredImages.filter(
          (img) => img.imagePath !== variantImage
        );

        const { imagePath: variantSubImage } = filteredVariantImages.length
          ? faker.helpers.arrayElement(filteredVariantImages)
          : faker.helpers.arrayElement(
              allImagesWithCategories.filter((img) => img.category === category)
            );

        productImages.push({
          id: nId(12),
          productId: variantId, // Use variant product's id
          imageUrl: variantSubImage?.replaceAll(
            "/home/developer/Music/preparing/three-legant/three-legant-frontend/public",
            ""
          ),
          createdAt: new Date(),
          role: "SUB_IMAGES", // Default to SUB_IMAGES role
        });
      }
    }
  }

  return {
    categories,
    products,
    productImages,
  };
};

// Function to save generated data to a JSON file
export const genProductData = async (num = 500) => {
  const { categories, products, productImages } = await generateRandomData(num);

  fs.writeFileSync(
    "data/productData.json",
    JSON.stringify(
      {
        categories,
        products,
        productImages,
      },
      null,
      2
    )
  );

  console.log("Data has been written to productData.json");
};

// Call the function to generate and save the data
// getD();
