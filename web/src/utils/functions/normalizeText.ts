import diacritics from "diacritics";

export const normalizeText = (text: string) => {
  return diacritics.remove(text).replace(/[^a-zA-Z0-9\s_\-\.]/g, "");
};
