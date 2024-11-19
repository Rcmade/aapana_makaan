import { db } from "@/db/db";
import { properties } from "@/db/schema";
import { media } from "@/db/schema/properties";
import { and, eq, sql } from "drizzle-orm";

export const getUserProperties = async (userId: string) => {
  const userProperties = await db
    .select({
      id: properties.id,
      propertyFor: properties.propertyFor,
      price: properties.price,
      completeAddress: properties.completeAddress,
      length: properties.length,
      width: properties.width,
      primaryImage: properties.primaryImage,
    })
    .from(properties)
    .where(eq(properties.userId, userId));

  return userProperties;
};

export const getUserPropertyDetails = async (
  propertyId: string,
  userId: string
) => {
  const [propertyDetails] = await db
    .select({
      // Property fields
      id: properties.id,
      location: properties.location,
      phone: properties.phone,
      name: properties.name,
      streetNumber: properties.streetNumber,
      street: properties.street,
      city: properties.city,
      postalCode: properties.postalCode,
      country: properties.country,
      completeAddress: properties.completeAddress,
      primaryImage: properties.primaryImage,
      detailedPropertyType: properties.detailedPropertyType,
      bhk: properties.bhk,
      propertyFor: properties.propertyFor,
      length: properties.length,
      width: properties.width,
      images: sql`array_agg(${media.mediaUrl})`.as("images"),
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
      price: properties.price,
    })
    .from(properties)
    .leftJoin(media, eq(properties.id, media.propertyId))
    .where(and(eq(properties.id, propertyId), eq(properties.userId, userId)))
    .groupBy(properties.id);

  return {
    ...propertyDetails,
    location: {
      lat: propertyDetails.location.y,
      lng: propertyDetails.location.x,
    },
    images: (propertyDetails.images || []) as string[],
  };
};

/* 
{
    "createdAt": "2024-11-07T11:41:11.711Z",
    "id": "xWa6kbdt01w",
    "updatedAt": "2024-11-07T11:41:11.711Z",
    "location": {
      "x": 75.8635506,
      "y": 22.7566151
    },
    "userId": "mj8ofwOTSJY",
    "phone": "+917471115587",
    "name": "RAHUL Chourasiya",
    "streetNumber": "",
    "street": "Shiv Mandir Wali Gali",
    "city": "Indore",
    "postalCode": "452003",
    "country": "India",
    "completeAddress": "Shiv Mandir Wali Gali, New Gouri Nagar, Sukhliya, Indore, Madhya Pradesh 452003, India",
    "primaryImage": "https://res.cloudinary.com/dg3fkrz9h/image/upload/v1730959871/AapnaMakaan/cf6150b34e9a6c25ab289e1a6cacab8501d6d445136627dddec816e7d083fcaf_inouji.jpg",
    "detailedPropertyType": "House",
    "bhk": "3 BHK",
    "length": 40,
    "width": 40,
    "price": "100000.00"
  },
*/
