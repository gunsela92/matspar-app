import axios from "axios";

export default async function handler(req, res) {
  try {
    const searchValue = req.query.searchValue;
    const response = await fetch(`https://api.matspar.se/autocomplete?query=${searchValue}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
