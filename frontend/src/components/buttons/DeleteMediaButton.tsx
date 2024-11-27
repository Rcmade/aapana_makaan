import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { getCloudinaryId } from "@/lib/utils/cloudinaryUtils";
import { type DeleteMediaRequestT } from "@/types/apiResponse";
import { deleteMedia } from "@/action/media";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface DeleteMediaButtonProps extends DeleteMediaRequestT, ButtonProps {
  onDelete: (file: string) => void;
  authorization: string;
}

const DeleteMediaButton = ({
  mediaUrlOrId,
  propertyId,
  authorization,
  onDelete,
  ...rest
}: DeleteMediaButtonProps) => {
  const handleDelete = async () => {
    const cldId = getCloudinaryId(mediaUrlOrId);
    try {
      if (cldId) {
        const data = await deleteMedia({
          authorization,
          mediaUrlOrId,
          propertyId,
        });
        if ("error" in data) {
          toast.error(data.error);
        } else {
          onDelete(mediaUrlOrId);
        }
      } else {
        onDelete(mediaUrlOrId);
      }
    } catch (error) {
      toast.error("Failed to delete media.");
    }
  };

  return (
    <Button variant="destructive" size="icon" onClick={handleDelete} {...rest}>
      <Trash />
    </Button>
  );
};

export default DeleteMediaButton;
