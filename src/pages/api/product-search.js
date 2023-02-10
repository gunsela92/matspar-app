export default async function handler(req, res) {
  try {
    const data = {
      slug: "/kategori",
      query: {
        q: req.body.search
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
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
