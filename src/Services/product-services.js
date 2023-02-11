export const getHomeProducts = async () => {
  const data = {
    slug: "/kategori",
    query: {
      q: "pick"
    }
  };
  const response = await fetch("https://api.matspar.se/slug", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}