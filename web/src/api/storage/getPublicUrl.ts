import supabase from "../supabase";

type Params = {
  bucketName: string;
  filePath: string;
};

export const getPublicUrl = ({ bucketName, filePath }: Params) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName.toLowerCase()).getPublicUrl(filePath);

  return publicUrl;
};
