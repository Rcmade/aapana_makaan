import { Hono } from "hono";
// import insertProductS from "@/zodSchema/productSchema2";
// import UploadService from "@/services/uploadService";
import { getNewARrival } from "@/controllers/products/home-api/new-arrival";
import { getProductDetails } from "@/controllers/products/product-details";
import { HTTPException } from "hono/http-exception";
import { handleProductFetch } from "@/lib/utils/handleProductFetch";

const product = new Hono()
  .get("/home-api/new-arrival", async (c) => {
    const newArrival = await getNewARrival();
    return c.json(newArrival);
  })
  .get("/", async (c) => {
    try {
      const params = c.req.query();

      const product = await handleProductFetch(params);
      return c.json(product);
      // // Extract pagination and filter parameters dynamically
      // const {
      //   limit = 10, // Default limit to 10 if not provided
      //   page = 1, // Default page to 0 if not provided
      //   search = "", // Default search query is an empty string
      //   priceFilter, // Optional price filter
      //   sortBy = "createdAt", // Default sortBy field is 'createdAt'
      //   category, // Optional category filter
      // } = params;

      // // Ensure `priceFilter` is a valid number or remain undefined
      // const parsedPriceFilter = priceFilter ? +priceFilter : undefined;

      // // Call getProducts with dynamic parameters
      // const product = await getProducts({
      //   limit: +limit, // Convert limit to a number
      //   page: +page, // Convert page to a number
      //   search,
      //   priceFilter: parsedPriceFilter,
      //   sortBy: sortBy as any,
      //   category,
      // });
      // return c.json(product);
    } catch (error) {
      console.error("Product fetch error: ", error);
      throw new HTTPException(401, { message: "Something went wrong!" });
    }
  })
  .get("/product-details/:id", async (c) => {
    const params = c.req.param("id") || "";
    const product = await getProductDetails(params);
    if (!product) {
      throw new HTTPException(401, { message: "Product not found" });
    }

    return c.json(product);
  })
  // .post("/", async (c) => {
  //   const formData = await c.req.parseBody({ all: true });
  //   const validationResult = insertProductS.safeParse(formData);
  //   if (!validationResult.success) {
  //     return c.json({ errors: validationResult.error.errors }, 400);
  //   }
  //   const files = formData.files as File[];
  //   if (!files || files.length === 0) {
  //     return c.json({ error: "At least one file is required" }, 400);
  //   }

  //   const savedFiles = await UploadService.uploadFiles(files);

  //   if ("error" in savedFiles) {
  //     return c.json({ error: savedFiles.error }, 400);
  //   }

  //   return c.json({
  //     message: "Product created successfully",
  //     data: validationResult.data,
  //     uploadedFiles: savedFiles,
  //   });
  // })
  .post("/delete", async (c) => {
    return c.json({ message: "File deleted successfully" });
  });

export default product;
