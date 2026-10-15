<script setup>
import { ref, computed } from "vue";
import Acceso from "./components/Acceso.vue";
import Paciente from "./components/Paciente.vue";
import Medico from "./components/Medico.vue";
import Admin from "./components/Admin.vue";

// rol puede ser: "acceso", "paciente", "medico" o "admin"
const rol = ref("acceso");
const vista = ref("inicio");

const menus = {
  paciente: [
    { vista: "inicio", texto: "Inicio" },
    { vista: "citas", texto: "Mis citas" },
    { vista: "historial", texto: "Historial" },
    { vista: "perfil", texto: "Perfil" },
  ],
  medico: [
    { vista: "agenda", texto: "Agenda" },
    { vista: "historial", texto: "Historial" },
  ],
  admin: [
    { vista: "panel", texto: "Panel" },
    { vista: "clinicas", texto: "Clínicas" },
  ],
};

const menuActual = computed(() => menus[rol.value]);

const nombresRol = { paciente: "Paciente", medico: "Médico", admin: "Administración" };

function entrar(nuevoRol) {
  rol.value = nuevoRol;
  vista.value = menus[nuevoRol][0].vista;
}

function salir() {
  rol.value = "acceso";
}
</script>

<template>
  <Acceso v-if="rol === 'acceso'" @entrar="entrar" />

  <div v-else class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Encabezado -->
    <header class="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <p class="text-xl font-extrabold">Zimi<span class="text-emerald-700">Web</span></p>

        <nav class="flex flex-wrap gap-1">
          <button
            v-for="opcion in menuActual"
            :key="opcion.vista"
            @click="vista = opcion.vista"
            class="rounded-lg px-3 py-2 text-sm font-bold"
            :class="vista === opcion.vista ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'"
          >
            {{ opcion.texto }}
          </button>
        </nav>

        <div class="flex items-center gap-3">
          <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{{ nombresRol[rol] }}</span>
          <button @click="salir" class="boton-claro">Salir</button>
        </div>
      </div>
    </header>

    <!-- Contenido -->
    <main class="mx-auto max-w-5xl px-5 py-8">
      <Paciente v-if="rol === 'paciente'" v-model:vista="vista" />
      <Medico v-else-if="rol === 'medico'" v-model:vista="vista" />
      <Admin v-else v-model:vista="vista" />
    </main>
  </div>
</template>
