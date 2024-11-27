import { db } from "@/db/db";
import { media, properties } from "@/db/schema";
import cloudinaryService from "@/services/uploadService";
import {type DeleteMediaRequestT } from "@/types";
import { and, eq, or } from "drizzle-orm";

export const deleteMedia = async ({
  mediaUrlOrId,
  userId,
  propertyId,
}: DeleteMediaRequestT) => {
  // 1. Check if the media file exists
  const [mediaFile] = await db
    .select({
      mediaId: media.id,
      mediaUrl: media.mediaUrl,
      mediaUserId: properties.userId,
    })
    .from(media)
    .leftJoin(properties, eq(media.propertyId, properties.id))
    .where(or(eq(media.mediaUrl, mediaUrlOrId), eq(media.id, mediaUrlOrId)))
    .limit(1);

  // 2. If media file is found, check user ownership and delete it
  if (mediaFile) {
    if (mediaFile.mediaUserId !== userId) {
      throw new Error("User does not have permission to delete this media.");
    }

    // Attempt to delete from Cloudinary and database
    try {
      await cloudinaryService.deleteCloudinaryFile([mediaFile.mediaUrl]);
      await db.delete(media).where(eq(media.id, mediaFile.mediaId));
      return { message: "Media deleted successfully" };
    } catch (error) {
      throw new Error("Failed to delete media from Cloudinary or database.");
    }
  }

  if (!propertyId)
    return {
      message: "Media deleted successfully",
    };
  // 3. If media file is not found, check if it's the primary image
  const [property] = await db
    .select({
      propertyPrimaryImage: properties.primaryImage,
    })
    .from(properties)
    .where(and(eq(properties.id, propertyId), eq(properties.userId, userId)))
    .limit(1);

  if (property && property.propertyPrimaryImage === mediaUrlOrId) {
    // Check for an alternative media file
    const [alternativeMedia] = await db
      .select({
        mediaId: media.id,
        mediaUrl: media.mediaUrl,
      })
      .from(media)
      .where(eq(media.propertyId, propertyId))
      .limit(1);

    if (alternativeMedia) {
      // Update the property to use this alternative as the primary image
      await db
        .update(properties)
        .set({ primaryImage: alternativeMedia.mediaUrl })
        .where(eq(properties.id, propertyId));

      // Delete the original primary image from Cloudinary
      try {
        await cloudinaryService.deleteCloudinaryFile([mediaUrlOrId]);
      } catch (error: any) {
        console.warn(
          "Failed to delete original primary image from Cloudinary:",
          error.message
        );
      }

      return {
        message:
          "Primary image deleted and updated with an alternative media file.",
      };
    } else {
      return {
        message:
          "Cannot delete primary image because no alternative media file exists.",
      };
    }
  }

  // If neither media file nor primary image found
  throw new Error("Media not found.");
};
