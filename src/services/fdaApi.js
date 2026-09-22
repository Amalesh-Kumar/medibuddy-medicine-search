const BASE_URL = "https://api.fda.gov/drug/label.json";

export async function searchMedicines(query, signal) {
  const encodedQuery = encodeURIComponent(query.trim());

  const url = `${BASE_URL}?search=openfda.brand_name:"${encodedQuery}"&limit=20`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }

    throw new Error("Failed to fetch medicines");
  }

  const data = await response.json();

  return data.results || [];
}

export async function getMedicineById(id, signal) {
  const encodedId = encodeURIComponent(id);

  const url = `${BASE_URL}?search=id:"${encodedId}"&limit=1`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Medicine not found");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Medicine not found");
  }

  return data.results[0];
}