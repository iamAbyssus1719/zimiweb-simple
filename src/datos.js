export const clinicas = [
  { nombre: "Clínica Centro", zona: "Zona Centro · Calle 12", disponibles: 8, distancia: "1.2 km" },
  { nombre: "Clínica Norte", zona: "Zona Norte · Av. Colón", disponibles: 5, distancia: "3.4 km" },
  { nombre: "Clínica Sur", zona: "Zona Sur · Las Palmas", disponibles: 2, distancia: "5.1 km" },
];

export const especialidades = [
  "Medicina interna", "Cardiología", "Pediatría", "Dermatología",
  "Neurología", "Gastroenterología", "Geriatría", "Endocrinología",
];

export const pacientes = [
  { turno: "01", hora: "08:00", nombre: "Carlos Jiménez", id: "ZIM-3841", motivo: "Dolor abdominal", estado: "Atendido" },
  { turno: "02", hora: "08:35", nombre: "María Torres", id: "ZIM-2019", motivo: "Dolor de cabeza", estado: "Atendido" },
  { turno: "03", hora: "09:10", nombre: "Ana Méndez", id: "ZIM-4920", motivo: "Fiebre y malestar", estado: "En espera" },
  { turno: "04", hora: "09:45", nombre: "José Pech", id: "ZIM-1822", motivo: "Revisión general", estado: "Confirmado" },
  { turno: "05", hora: "10:20", nombre: "Elena Ruiz", id: "ZIM-7401", motivo: "Dolor muscular", estado: "Confirmado" },
];

export const historial = [
  { fecha: "14 AGO 2026", especialidad: "Medicina interna", medico: "Dr. Martín Lara", diagnostico: "Infección respiratoria leve", clinica: "Clínica Centro" },
  { fecha: "03 JUN 2026", especialidad: "Dermatología", medico: "Dra. Sofía Pool", diagnostico: "Dermatitis por contacto", clinica: "Clínica Norte" },
  { fecha: "19 FEB 2026", especialidad: "Gastroenterología", medico: "Dr. Iván Pérez", diagnostico: "Gastritis aguda", clinica: "Clínica Centro" },
];
