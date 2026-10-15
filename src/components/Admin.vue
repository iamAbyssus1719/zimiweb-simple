<script setup>
import TablaPacientes from "./TablaPacientes.vue";
import { clinicas } from "../datos.js";

// Esta variable viene de App.vue y dice en qué pantalla estamos
const vista = defineModel("vista");

const estadisticas = [
  { titulo: "Clínicas activas", valor: "03", nota: "Todas operando" },
  { titulo: "Citas de hoy", valor: "30", nota: "67% de ocupación" },
  { titulo: "Pacientes atendidos", valor: "12", nota: "En las 3 clínicas" },
  { titulo: "En espera", valor: "08", nota: "Tiempo medio: 12 min" },
];

const actividad = [
  { texto: "Nueva reserva en Clínica Centro", hace: "Hace 3 min" },
  { texto: "Turno #05 marcado como atendido", hace: "Hace 8 min" },
  { texto: "Cita reprogramada en Clínica Sur", hace: "Hace 14 min" },
];
</script>

<template>
  <!-- ============ PANEL ============ -->
  <div v-if="vista === 'panel'">
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-xs font-bold text-emerald-700">ADMINISTRACIÓN</p>
        <h1 class="mt-1 text-3xl font-extrabold">Panel general</h1>
        <p class="mt-2 text-sm text-gray-500">Supervisa la operación de las clínicas en tiempo real.</p>
      </div>
      <button @click="vista = 'clinicas'" class="boton">Gestionar clínica</button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <h2 class="text-lg font-extrabold">Ocupación por clínica</h2>
        <p class="mb-5 text-sm text-gray-500">Cupos de hoy</p>
        <div v-for="c in clinicas" :key="c.nombre" class="mb-5">
          <div class="mb-2 flex justify-between text-sm">
            <strong>{{ c.nombre }}</strong>
            <span class="text-gray-500">{{ 15 - c.disponibles }}/15 reservados</span>
          </div>
          <div class="h-2 rounded-full bg-gray-200">
            <div class="h-2 rounded-full bg-emerald-600" :style="{ width: ((15 - c.disponibles) / 15) * 100 + '%' }"></div>
          </div>
        </div>
      </section>

      <aside class="tarjeta">
        <h2 class="mb-5 text-lg font-extrabold">Actividad reciente</h2>
        <div class="space-y-4">
          <div v-for="a in actividad" :key="a.texto" class="flex gap-3">
            <span class="mt-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
            <div>
              <p class="text-sm font-bold">{{ a.texto }}</p>
              <p class="text-xs text-gray-400">{{ a.hace }}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <section class="tarjeta mt-6">
      <h2 class="text-lg font-extrabold">Turnos del día</h2>
      <p class="text-sm text-gray-500">Vista general de todas las clínicas</p>
      <TablaPacientes />
    </section>
  </div>

  <!-- ============ CLÍNICAS ============ -->
  <div v-else>
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-xs font-bold text-emerald-700">CONFIGURACIÓN</p>
        <h1 class="mt-1 text-3xl font-extrabold">Clínicas y cupos</h1>
        <p class="mt-2 text-sm text-gray-500">Administra establecimientos, zonas y disponibilidad diaria.</p>
      </div>
      <button class="boton">Nueva clínica</button>
    </div>

    <div class="grid gap-5 md:grid-cols-3">
      <div v-for="c in clinicas" :key="c.nombre" class="tarjeta">
        <div class="flex items-start justify-between">
          <span class="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">Activa</span>
        </div>
        <h3 class="mt-4 text-lg font-extrabold">{{ c.nombre }}</h3>
        <p class="text-sm text-gray-500">{{ c.zona }}</p>
        <div class="my-5 grid grid-cols-2 gap-3 text-center">
          <div class="rounded-lg bg-gray-100 p-3"><strong class="block text-xl">15</strong><span class="text-xs text-gray-500">Cupos diarios</span></div>
          <div class="rounded-lg bg-gray-100 p-3"><strong class="block text-xl">{{ c.disponibles }}</strong><span class="text-xs text-gray-500">Disponibles</span></div>
        </div>
        <button class="boton-claro w-full">Editar configuración</button>
      </div>
    </div>
  </div>
</template>
