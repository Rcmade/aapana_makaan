import axios from "axios";
import fs from "fs";

const rawData = fs.readFileSync("data/productData.json", "utf-8");
const {
  categories: categoriesData,
  products,
  productImages,
} = JSON.parse(rawData);

const productData = {};

// Helper function to count images for a specific product
function countImages(productId) {
  return productImages.filter((image) => image.productId === productId);
}

const c = (id) => {
  return products.filter((i) => i.parentId === id);
};

// Iterate over each product to compute the required data
products.forEach((product) => {
  productData[product.id] = {
    numberOfChild: 0,
    numberOfImages: 0,
    isParent: false,
    childId: [],
    imgUrl: [],
  };

  if (product.parentId) {
    productData[product.id].isParent = false;
  } else {
    productData[product.id].isParent = true;
  }
  const img = countImages(product.id);
  productData[product.id].numberOfImages = img.length;
  productData[product.id].imgUrl = img.map((i) => i.imageUrl);
  const child = c(product.id);
  productData[product.id].numberOfChild = child.length;
  productData[product.id].childId = child.map((i) => i.id);
});

// const test = async () => {
//   // Object.keys(productData).forEach(async (key) => {
//   //   const { data } = await axios.get(
//   //     `http://localhost:4000/api/products/product-details/${key}`
//   //   );

//   // });
//   const { data } = await axios.get(
//     `http://localhost:4000/api/products/product-details/DA9Rlt_Qk9km`
//   );

//   const a = productData[data.productId];
//   console.log(JSON.stringify({ a }, null, 2));
// };

// test();

fs.writeFileSync("data/count.json", JSON.stringify(productData, null, 2));

// Optional: Log the output for debugging
// console.log(productData);
