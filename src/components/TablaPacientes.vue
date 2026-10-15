<script setup>
import { pacientes } from "../datos.js";

// Devuelve el color según el estado del paciente
function colorEstado(estado) {
  if (estado === "Atendido") return "bg-emerald-100 text-emerald-800";
  if (estado === "En espera") return "bg-orange-100 text-orange-800";
  return "bg-blue-100 text-blue-800";
}
</script>

<template>
  <div class="mt-4 overflow-x-auto">
    <table class="w-full min-w-[600px] text-left text-sm">
      <thead class="border-b border-gray-200 text-xs uppercase text-gray-500">
        <tr>
          <th class="p-3">Turno</th>
          <th class="p-3">Hora</th>
          <th class="p-3">Paciente</th>
          <th class="p-3">Motivo</th>
          <th class="p-3">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in pacientes" :key="p.turno" class="border-b border-gray-100">
          <td class="p-3 font-bold">#{{ p.turno }}</td>
          <td class="p-3">{{ p.hora }}</td>
          <td class="p-3">
            <p class="font-bold">{{ p.nombre }}</p>
            <p class="text-xs text-gray-400">{{ p.id }}</p>
          </td>
          <td class="p-3">{{ p.motivo }}</td>
          <td class="p-3">
            <span class="rounded-full px-2 py-1 text-xs font-bold" :class="colorEstado(p.estado)">{{ p.estado }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
