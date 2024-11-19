import { insertBannersIntoDB } from "./insertBanner";
import { insertUsersIntoDB } from "./insertUsers";
import { insetProducts } from "./insetProducts";
const run = async () => {
  await insertUsersIntoDB();
  await insetProducts();
  await insertBannersIntoDB();
};

run();
