<script setup>
import Historial from "./Historial.vue";
import TablaPacientes from "./TablaPacientes.vue";

// Esta variable viene de App.vue y dice en qué pantalla estamos
const vista = defineModel("vista");

const estadisticas = [
  { titulo: "Pacientes de hoy", valor: "15", nota: "5 atendidos · 10 pendientes" },
  { titulo: "Siguiente consulta", valor: "09:45", nota: "José Pech · Turno 04" },
  { titulo: "Disponibilidad", valor: "Completa", nota: "15 de 15 cupos reservados" },
];
</script>

<template>
  <div v-if="vista === 'agenda'">
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-xs font-bold text-emerald-700">AGENDA MÉDICA</p>
        <h1 class="mt-1 text-3xl font-extrabold">Buenos días, Dra. Salas</h1>
        <p class="mt-2 text-sm text-gray-500">Tienes 15 consultas programadas para hoy.</p>
      </div>
      <button @click="vista = 'historial'" class="boton-claro">Buscar paciente</button>
    </div>

    <!-- Tarjetas de resumen -->
    <div class="grid gap-4 sm:grid-cols-3">
      <div v-for="e in estadisticas" :key="e.titulo" class="tarjeta flex items-center gap-4">
        <div>
          <p class="text-xs font-bold text-gray-500">{{ e.titulo }}</p>
          <p class="text-2xl font-extrabold">{{ e.valor }}</p>
          <p class="text-xs text-gray-400">{{ e.nota }}</p>
        </div>
      </div>
    </div>

    <div class="mt-7 grid gap-6 lg:grid-cols-3">
      <section class="tarjeta lg:col-span-2">
        <h2 class="text-lg font-extrabold">Agenda de hoy</h2>
        <p class="text-sm text-gray-500">Martes, 01 de septiembre</p>
        <TablaPacientes />
      </section>

      <aside class="space-y-5">
        <div class="tarjeta">
          <h2 class="text-lg font-extrabold">Progreso del día</h2>
          <p class="mt-4 text-3xl font-extrabold">33%</p>
          <div class="my-2 h-2 rounded-full bg-gray-200"><div class="h-2 w-1/3 rounded-full bg-emerald-600"></div></div>
          <p class="text-sm text-gray-500">5 de 15 consultas completadas</p>
        </div>

        <div class="rounded-2xl bg-emerald-900 p-6 text-white">
          <p class="text-xs font-bold text-emerald-200">PRÓXIMO PACIENTE</p>
          <h3 class="mt-3 text-xl font-extrabold">José Pech</h3>
          <p class="mt-1 text-sm text-emerald-100">Revisión general · 09:45</p>
          <button class="mt-4 w-full rounded-lg bg-white py-2 text-sm font-bold text-emerald-900">Abrir expediente</button>
        </div>
      </aside>
    </div>
  </div>

  <Historial v-else personal />
</template>
