<script setup>
import { ref } from "vue";

const emit = defineEmits(["entrar"]);

const rol = ref("paciente");

const roles = [
  { valor: "paciente", texto: "Paciente" },
  { valor: "medico", texto: "Médico" },
  { valor: "admin", texto: "Administración" },
];

const correos = {
  paciente: "ana@email.com",
  medico: "laura.salas@zimi.mx",
  admin: "admin@zimi.mx",
};
</script>

<template>
  <main class="grid min-h-screen lg:grid-cols-2">
    <!-- Lado verde (solo en pantallas grandes) -->
    <section class="hidden flex-col justify-between bg-emerald-900 p-12 text-white lg:flex">
      <p class="text-xl font-extrabold">ZimiWeb</p>
      <div>
        <span class="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">ATENCIÓN MÉDICA SIN FILAS</span>
        <h1 class="mt-6 text-5xl font-extrabold">Tu salud comienza con una cita a tiempo.</h1>
        <p class="mt-6 text-emerald-100">
          Reserva, administra y consulta tu atención médica desde cualquier lugar, de forma simple y segura.
        </p>
      </div>
      <p class="text-sm text-emerald-100">Datos protegidos &nbsp;&nbsp; Disponible 24/7</p>
    </section>

    <!-- Formulario -->
    <section class="flex items-center justify-center bg-gray-50 p-6">
      <div class="w-full max-w-md">
        <p class="text-sm font-bold text-emerald-700">BIENVENIDO A ZIMIWEB</p>
        <h2 class="mt-2 text-3xl font-extrabold">Inicia sesión</h2>
        <p class="mt-2 text-sm text-gray-500">Selecciona tu tipo de acceso para ver la interfaz correspondiente.</p>

        <div class="mt-6 grid grid-cols-3 gap-2">
          <button
            v-for="r in roles"
            :key="r.valor"
            @click="rol = r.valor"
            class="rounded-lg border p-3 text-xs font-bold"
            :class="rol === r.valor ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-300 bg-white text-gray-500'"
          >
            {{ r.texto }}
          </button>
        </div>

        <label class="etiqueta">Correo o número de identificación</label>
        <input class="campo" :value="correos[rol]" />

        <label class="etiqueta">Contraseña</label>
        <input class="campo" type="password" value="12345678" />

        <button @click="emit('entrar', rol)" class="boton mt-6 w-full">Ingresar a mi cuenta</button>

        <p class="mt-6 text-center text-xs text-gray-500">
          ¿Eres paciente nuevo?
          <button @click="emit('entrar', 'paciente')" class="font-bold text-emerald-700">Crear cuenta</button>
        </p>
      </div>
    </section>
  </main>
</template>
