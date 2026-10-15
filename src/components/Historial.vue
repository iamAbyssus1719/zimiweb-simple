<script setup>
import { historial } from "../datos.js";

// personal = true cuando lo ve un médico
defineProps({ personal: Boolean });
</script>

<template>
  <h1 class="text-3xl font-extrabold">{{ personal ? "Historial de pacientes" : "Mi historial médico" }}</h1>
  <p class="mb-6 mt-2 text-sm text-gray-500">
    {{ personal ? "Busca por nombre o ID para consultar atenciones previas." : "Consulta tus atenciones y diagnósticos anteriores." }}
  </p>

  <div class="tarjeta">
    <div class="flex flex-col justify-between gap-3 sm:flex-row">
      <input
        class="campo sm:max-w-sm"
        :placeholder="personal ? 'Buscar nombre o ID del paciente...' : 'Buscar por médico o especialidad...'"
      />
      <button class="boton-claro">Descargar historial</button>
    </div>

    <div class="mt-6 divide-y divide-gray-200">
      <div v-for="h in historial" :key="h.fecha" class="flex items-center gap-4 py-4">
        <p class="w-24 text-xs font-bold text-gray-500">{{ h.fecha }}</p>
        <div class="flex-1">
          <p class="font-bold">{{ h.especialidad }}</p>
          <p class="text-sm text-gray-500">{{ h.diagnostico }} · {{ h.medico }}</p>
        </div>
        <p class="hidden text-sm text-gray-400 md:block">{{ h.clinica }}</p>
      </div>
    </div>
  </div>
</template>
