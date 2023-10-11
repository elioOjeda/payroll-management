import { normalizeText } from "../../utils/functions/normalizeText";
import supabase from "../supabase";

type Params = {
  id?: string | null;
  file?: File | null;
  folder: string;
  bucketName: string;
};

export const uploadFile = async ({ id, file, folder, bucketName }: Params) => {
  if (!id || !file) return;

  const { name, type } = file;

  const filePath = `${id}/${folder}/${normalizeText(name)}`;

  const { data, error } = await supabase.storage
    .from(bucketName.toLowerCase())
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: type,
      upsert: true,
    });

  if (error) {
    console.error("Error in uploadFile", error);
    throw error;
  }

  return data.path;
};
