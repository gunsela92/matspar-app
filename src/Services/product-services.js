import {postApi} from "@/helpers/apiHelper";

export const getHomeProducts = async () => {
  const data = {
    slug: "/kategori",
    query: {
      q: "pick"
    }
  };
  const response = await postApi("https://api.matspar.se/slug", data)
  return response;
}