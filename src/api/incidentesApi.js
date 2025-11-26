const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function FetchIncidentes(page = 1, limit = 5, keyword = "") {
  try {
    const res = await fetch(`${BASE_URL}/incidentes`);

    if (!res.ok) throw new Error("Error al conectar con el servidor");

    let datos = await res.json();

    if (keyword && keyword.trim() !== "") {
      const lowerKey = keyword.toLowerCase();

      datos = datos.filter(item => {
        const enTitulo = item.incidente?.toLowerCase().includes(lowerKey);
        const enDesc = item.descripcion?.toLowerCase().includes(lowerKey);
        const enVehiculo = item.vehiculo?.toLowerCase().includes(lowerKey);
        const enPatente = item.patente?.toLowerCase().includes(lowerKey);
        const enDireccion = item.direccion?.toLowerCase().includes(lowerKey);

        return enTitulo || enDesc || enVehiculo || enPatente || enDireccion;
      });
    }

    const totalCount = datos.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = datos.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: totalCount
    };

  } catch (error) {
    console.error("Fetch Error:", error);
    return { data: [], total: 0 };
  }
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


