const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Lista de incidentes, de a 20 valores
export async function FetchIncidentes(page = 1, limit = 20, keyword = "") {
  const queryParams = new URLSearchParams({
    _page: page,
    _limit: limit,
    q: keyword
  }).toString();
  const res = await fetch(`${BASE_URL}/incidentes?${queryParams}`);
  if (!res.ok) throw new Error("Failed to fetch incidents");
  return res.json();
}

// todos los incidentes, hasta el valor de 2000
export async function FetchMapaJitterData() {
  const res = await fetch(`${BASE_URL}/incidentes`);

  if (!res.ok) throw new Error("Failed to fetch jitter map data");
  return res.json();
}

// todos los incidentes, hasta el valor de 2000
export async function FetchMapaCluster() {
  const res = await fetch(`${BASE_URL}/incidentes`);

  if (!res.ok) throw new Error("Failed to fetch cluster map");
  return res.json();
}

export async function FetchIncidenteById(id) {
  const res = await fetch(`${BASE_URL}/incidentes/${id}`);
  if (!res.ok) throw new Error("Failed to fetch incident by id");
  return res.json();
}


