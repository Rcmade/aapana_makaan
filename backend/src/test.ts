import { eq, or, sql } from "drizzle-orm";
import { db } from "./db/db";
import { properties, users } from "./db/schema";
import { getUserPropertyDetails } from "./controllers/user/properties";
import { deleteMedia } from "./controllers/media";
// import { productImages, products } from "./db/schema";

// const data = {
//   createdAt: new Date("2024-11-07T14:19:17.768Z"),
//   id: "X44wkNPA9N2",
//   updatedAt: new Date("2024-11-07T14:19:17.768Z"),
//   location: {
//     x: 75.948545,
//     y: 22.64485479999999,
//   },
//   userId: "mj8ofwOTSJY",
//   phone: "+917471115587",
//   name: "RAHUL Chourasiya",
//   streetNumber: "",
//   street: "Cambridge the International School Road",
//   city: "",
//   postalCode: "452020",
//   country: "India",
//   completeAddress:
//     "JWVX+WCV, Cambridge the Int'l School Rd, Madhya Pradesh 452020, India",
//   primaryImage:
//     "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1730969356/AapnaMakaan/cf6150b34e9a6c25ab289e1a6cacab8501d6d445136627dddec816e7d083fcaf_lqnztj.jpg",
//   detailedPropertyType: "House" as "House" | "Plot" | "Flat",
//   bhk: "3 BHK" as "3 BHK" | "1 BHK" | "2 BHK" | "3+ BHK" | null,
//   length: 10,
//   width: 20,
//   price: "100000.00",
// };

const data = [
  {
    createdAt: new Date("2024-11-13T06:38:07.248Z"),
    id: "DSQxm9H_NKU",
    updatedAt: new Date("2024-11-13T06:38:07.248Z"),
    location: {
      x: 75.948545,
      y: 22.64485479999999,
    },
    userId: "mj8ofwOTSJY",
    phone: "+916268760860",
    name: "RAHUL Chourasiya",
    streetNumber: "",
    street: "",
    city: "Indore",
    postalCode: "452015",
    country: "India",
    completeAddress:
      "140A, Ward 7, New Gouri Nagar, Sukhliya, Indore, Madhya Pradesh 452015, India",
    primaryImage:
      "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1731479886/AapnaMakaan/blob_y00tls.png",
    detailedPropertyType: "Plot",
    bhk: null,
    propertyFor: "Sell",
    length: 15,
    width: 15,
    price: "150000.00",
  },
  {
    createdAt: new Date("2024-11-08T14:36:42.845Z"),
    id: "JkUPI3zlqSt",
    updatedAt: new Date("2024-11-08T14:36:42.845Z"),
    location: {
      x: 75.948545,
      y: 22.64485479999999,
    },
    userId: "mj8ofwOTSJY",
    phone: "+917471115587",
    name: "RAHUL Chourasiya",
    streetNumber: "",
    street: "",
    city: "Indore",
    postalCode: "452007",
    country: "India",
    completeAddress:
      "PVH4+5HG, Baxi Colony, Indore, Madhya Pradesh 452007, India",
    primaryImage:
      "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1731076600/AapnaMakaan/blob_ja4yed.png",
    detailedPropertyType: "House",
    bhk: "3 BHK",
    propertyFor: "Sell",
    length: 50,
    width: 50,
    price: "100000.00",
  },
  {
    createdAt: new Date("2024-11-07T08:49:17.768Z"),
    id: "X44wkNPA9N2",
    updatedAt: new Date("2024-11-07T08:49:17.768Z"),
    location: {
      x: 75.948545,
      y: 22.64485479999999,
    },
    userId: "mj8ofwOTSJY",
    phone: "+917471115587",
    name: "RAHUL Chourasiya",
    streetNumber: "",
    street: "Cambridge the International School Road",
    city: "",
    postalCode: "452020",
    country: "India",
    completeAddress:
      "JWVX+WCV, Cambridge the Int'l School Rd, Madhya Pradesh 452020, India",
    primaryImage:
      "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1730969356/AapnaMakaan/cf6150b34e9a6c25ab289e1a6cacab8501d6d445136627dddec816e7d083fcaf_lqnztj.jpg",
    detailedPropertyType: "House",
    bhk: "3 BHK",
    propertyFor: "Sell",
    length: 10,
    width: 20,
    price: "100000.00",
  },

  {
    createdAt: new Date("2024-11-07T08:49:17.768Z"),
    id: "X44wk9N2",
    updatedAt: new Date("2024-11-07T08:49:17.768Z"),
    location: {
      x: 75.948545,
      y: 22.644879999999,
    },
    userId: "mj8ofwOTSJY",
    phone: "+2345678",
    name: "RAHUL",
    streetNumber: "",
    street: "Cambridge the International School",
    city: "",
    postalCode: "452020",
    country: "India",
    completeAddress:
      "JWVX+WCV, Cambridge the Int'l School Rd, Madhya Pradesh 452020, India",
    primaryImage:
      "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1730969356/AapnaMakaan/cf6150b34e9a6c25ab289e1a6cacab8501d6d445136627dddec816e7d083fcaf_lqnztj.jpg",
    detailedPropertyType: "House",
    bhk: "3 BHK",
    propertyFor: "Rent",
    length: 10,
    width: 20,
    price: "100000.00",
  },
  {
    createdAt: new Date("2024-11-07T08:49:17.768Z"),
    id: "wk9N2",
    updatedAt: new Date("2024-11-07T08:49:17.768Z"),
    location: {
      x: 75.948545,
      y: 22.644879999999,
    },
    userId: "mj8ofwOTSJY",
    phone: "+234567988",
    name: "ray",
    streetNumber: "",
    street: "Cambridge the International School",
    city: "",
    postalCode: "452020",
    country: "India",
    completeAddress:
      "JWVX+WCV, Cambridge the Int'l School Rd, Madhya Pradesh 452020, India",
    primaryImage:
      "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1730969356/AapnaMakaan/cf6150b34e9a6c25ab289e1a6cacab8501d6d445136627dddec816e7d083fcaf_lqnztj.jpg",
    detailedPropertyType: "House",
    bhk: "3 BHK",
    propertyFor: "Rent",
    length: 10,
    width: 20,
    price: "100000.00",
  },
] as const;

// const data = {
//   createdAt: new Date("2024-11-07T14:19:17.768Z"),
//   id: "X44wkNPA9N2",
//   updatedAt: new Date("2024-11-07T14:19:17.768Z"),
//   location: [75.948545, 22.64485479999999] as [number, number],
//   userId: "mj8ofwOTSJY",
//   phone: "+917471115587",
//   name: "RAHUL Chourasiya",
//   streetNumber: "",
//   street: "Cambridge the International School Road",
//   city: "",
//   postalCode: "452020",
//   country: "India",
//   completeAddress:
//     "JWVX+WCV, Cambridge the Int'l School Rd, Madhya Pradesh 452020, India",
//   primaryImage:
//     "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1730969356/AapnaMakaan/cf6150b34e9a6c25ab289e1a6cacab8501d6d445136627dddec816e7d083fcaf_lqnztj.jpg",
//   detailedPropertyType: "House" as "House" | "Plot" | "Flat",
//   bhk: "3 BHK" as "3 BHK" | "1 BHK" | "2 BHK" | "3+ BHK" | null,
//   length: 10,
//   width: 20,
//   price: "100000.00",
// } as const;

const user = [
  {
    createdAt: new Date("2024-11-07T15:48:30.167Z"),
    id: "mj8ofwOTSJY",
    updatedAt: new Date("2024-11-07T15:48:30.167Z"),
    role: "USER",
    name: "RAHUL CHOURASIYA",
    email: "rahulchourasiya4567@gmail.com",
    phone: null,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocJtlp2JY-I_N6GnoVjSD4vuwB3o56k81_tze3ZXzE591ttMVLHj=s96-c",
  },
] as const;

const d = async () => {
  // const p = await db.select().from(properties);
  // console.dir(p, {
  //   depth: Infinity,
  // });
  // await db.insert(users).values(user);
  // await db.insert(properties).values(data);
  // const d = await getUserPropertyDetails("X44wkNPA9N2", "mj8ofwOTSJY");
  // console.dir(d, {
  //   colors: true,
  //   depth: Infinity,
  // });
  // const m = await deleteMedia({
  //   mediaUrlOrId:
  //     "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1731071917/AapnaMakaan/bueknuz79gse1j9pfhxx.png",
  // });
  // console.dir(m, {
  //   colors: true,
  //   depth: Infinity,
  // });
  // user.forEach(async (u) => {
  //   await db.insert(users).values(u);
  // });
  data.forEach(async (d) => {
    await db.insert(properties).values(d).onConflictDoNothing();
  });
  // const a = await db.select().from(users).execute();
  // console.dir(a, {
  //   depth: true,
  //   colors: true,
  // });
  // // await db.insert(properties).values(data[2]);
  // const searchTerm = "new gauri nagar indore, india";
  // // Remove commas, periods, and other non-alphanumeric characters (except spaces, hyphens, and apostrophes)
  // const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s'-]/g, "");
  // console.log({ sanitizedSearchTerm }); // This will output "new gauri nagar indore india"
  // // Convert the sanitized search term into a valid tsquery format by replacing spaces with "|"
  // const formattedSearchTerm = sanitizedSearchTerm.replaceAll(" ", " | ");
  // // Now you can use it in the query
  // const results = await db
  //   .select()
  //   .from(properties)
  //   .where(
  //     sql`to_tsvector('english', ${properties.completeAddress} || ' ' || ${properties.name}) @@ to_tsquery('english', ${formattedSearchTerm})`
  //   )
  //   .execute();
  // console.log(results);
};

d();
