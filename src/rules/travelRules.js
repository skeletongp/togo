export default {
  title: [
    (v) => !!v || "Debe ingresar el título",
    (v) =>
      (v && v.length <= 50) || "El título debe tener menos de 50 caracteres",
  ],
  description: [
    (v) => !!v || "Debe ingresar la descripción",
    (v) =>
      (v && v.length <= 200) ||
      "La descripción debe tener menos de 200 caracteres",
    (v) =>
      (v && v.length >= 10) || "La descripción debe tener más de 10 caracteres",
  ],
  dueDate: [(v) => !!v || "Debe ingresar la fecha y hora del viaje"],
  dueTime: [(v) => !!v || "Debe ingresar la fecha y hora del viaje"],
  priority: [
    (v) => !!v || "Debe ingresar la prioridad del viaje",
    (v) =>
      ["Alta", "Media", "Baja"].includes(v) ||
      "La prioridad debe ser Alta, Media o Baja",
  ],
  status: [
    (v) => !!v || "Debe ingresar el estado del viaje",
    (v) =>
      ["Pendiente", "En progreso", "Finalizada"].includes(v) ||
      "El estado debe ser Pendiente, En progreso o Finalizada",
  ],
  location: [(v) => !!v || "Debe ingresar la ubicación del viaje"],
};
