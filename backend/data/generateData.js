import { genBanners } from "./banner";
import { genProductData } from "./data";
const run = async () => {
  await genProductData();
  await genBanners();
};

run();
