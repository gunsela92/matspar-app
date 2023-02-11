export const postApi = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export const getApi = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}