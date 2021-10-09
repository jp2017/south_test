import axios from "axios";

const baseUrl = "http://www.omdbapi.com";

export const searchMovies = async ({ title, year, page }) => {
  console.log(title, year, page);
  const res = await axios.get(baseUrl, {
    params: {
      apiKey: "3f66eca5",
      s: title,
      y: year,
      page,
    },
  });
  return res.data;
};
