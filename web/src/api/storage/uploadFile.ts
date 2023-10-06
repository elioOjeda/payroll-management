import { normalizeText } from "../../utils/functions/normalizeText";
import supabase from "../supabase";

type Params = {
  id?: string | null;
  file?: File;
  bucketName: string;
};

export const uploadFile = async ({ id, file, bucketName }: Params) => {
  if (!id || !file) {
    throw new Error("Missing params");
  }

  const { name, type } = file;

  const filePath = `${id}/${normalizeText(name)}`;

  const { data, error } = await supabase.storage
    .from(bucketName.toLowerCase())
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: type,
      upsert: false,
    });

  if (error) {
    console.error("Error in uploadFile", error);
    throw error;
  }

  return data.path;
};
