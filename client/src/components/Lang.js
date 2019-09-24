import Arabic from "./data/ar.json";
import English from "./data/en.json";

const Language = lang => {
  if (lang === "ar") return Arabic;
  return English;
};

export default Language;
