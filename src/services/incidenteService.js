let incidentes = [
  { id: "1", titulo: "Choque", descripcion: "Auto vs moto" },
  { id: "2", titulo: "Incendio", descripcion: "Casa incendiada" },
];

export const getAll = () => incidentes;

export const getById = (id) => incidentes.find((x) => x.id === id);

export const create = (data) => {
  const newItem = { id: Date.now().toString(), ...data };
  incidentes.push(newItem);
  return newItem;
};

export const update = (id, data) => {
  const index = incidentes.findIndex((x) => x.id === id);
  if (index === -1) return null;
  incidentes[index] = { ...incidentes[index], ...data };
  return incidentes[index];
};

export const remove = (id) => {
  const index = incidentes.findIndex((x) => x.id === id);
  if (index === -1) return null;
  return incidentes.splice(index, 1)[0];
};
