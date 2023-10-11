import supabase from "../supabase";

type Params = {
  bucketName: string;
  filePath?: string;
};

export const getPublicUrl = ({ bucketName, filePath }: Params) => {
  if (!filePath) return;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName.toLowerCase()).getPublicUrl(filePath);

  return publicUrl;
};
