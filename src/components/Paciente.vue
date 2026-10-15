<script setup>
import { ref } from "vue";
import Historial from "./Historial.vue";
import { clinicas, especialidades, historial } from "../datos.js";

// Esta variable viene de App.vue y dice en qué pantalla estamos
const vista = defineModel("vista");

// Ventanas emergentes
const reservando = ref(false);
const verComprobante = ref(false);

// Datos de la reserva
const paso = ref(1);
const clinicaElegida = ref(clinicas[0]);
const especialidadElegida = ref(especialidades[0]);
const reservaLista = ref(false);

const titulosPaso = ["Elige una clínica", "Elige la especialidad", "Confirma tu cita"];

function abrirReserva() {
  paso.value = 1;
  reservaLista.value = false;
  reservando.value = true;
}

function siguiente() {
  if (paso.value < 3) {
    paso.value++;
  } else {
    reservaLista.value = true;
  }
}
</script>

<template>
  <!-- ============ INICIO ============ -->
  <div v-if="vista === 'inicio'">
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-xs font-bold text-emerald-700">Martes, 01 de septiembre</p>
        <h1 class="mt-1 text-3xl font-extrabold">Hola, Ana. ¿Cómo te sientes?</h1>
        <p class="mt-2 text-sm text-gray-500">Administra tu atención médica desde un solo lugar.</p>
      </div>
      <button @click="abrirReserva" class="boton">Reservar nueva cita</button>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <!-- Próxima cita -->
        <section class="rounded-2xl bg-emerald-900 p-7 text-white">
          <p class="text-xs font-bold text-emerald-200">PRÓXIMA CITA</p>
          <p class="mt-6 text-xs text-emerald-200">Miércoles, 02 de septiembre</p>
          <p class="text-3xl font-extrabold">09:40 a. m.</p>
          <p class="mt-4 font-bold">Dra. Laura Salas</p>
          <p class="text-sm text-emerald-200">Medicina interna · Clínica Centro</p>
          <div class="mt-5 flex gap-2">
            <button @click="vista = 'citas'" class="rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-900">Ver comprobante</button>
            <button class="px-4 py-2 text-sm font-bold text-emerald-100">Reprogramar</button>
          </div>
        </section>

        <!-- Clínicas cercanas -->
        <section>
          <h2 class="text-lg font-extrabold">Clínicas cercanas</h2>
          <p class="mb-4 text-sm text-gray-500">Cupos disponibles para hoy</p>
          <div class="grid gap-4 sm:grid-cols-3">
            <div v-for="c in clinicas" :key="c.nombre" class="tarjeta p-4">
              <h3 class="font-bold">{{ c.nombre }}</h3>
              <p class="text-xs text-gray-500">{{ c.zona }}</p>
              <div class="my-3 h-2 rounded-full bg-gray-200">
                <div class="h-2 rounded-full bg-emerald-600" :style="{ width: (c.disponibles / 15) * 100 + '%' }"></div>
              </div>
              <div class="flex justify-between text-xs">
                <strong class="text-emerald-700">{{ c.disponibles }} cupos</strong>
                <span>{{ c.distancia }}</span>
              </div>
              <button @click="abrirReserva" class="boton-claro mt-4 w-full">Elegir clínica</button>
            </div>
          </div>
        </section>
      </div>

      <!-- Columna derecha -->
      <aside class="space-y-5">
        <div class="tarjeta">
          <h2 class="text-lg font-extrabold">Tu salud, al día</h2>
          <p class="mb-5 text-sm text-gray-500">Resumen de tu actividad</p>
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <p class="text-sm font-bold">1 cita próxima</p>
              <p class="text-xs text-gray-500">Programada para mañana</p>
            </div>
            <strong class="text-xl">01</strong>
          </div>
          <div class="my-4 border-t border-gray-200"></div>
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <p class="text-sm font-bold">Historial médico</p>
              <p class="text-xs text-gray-500">Última consulta: 14 ago.</p>
            </div>
            <strong class="text-xl">06</strong>
          </div>
          <button @click="vista = 'historial'" class="boton-claro mt-5 w-full">Consultar historial</button>
        </div>

        <div class="rounded-2xl bg-emerald-50 p-6">
          <h3 class="font-extrabold">Tus datos están protegidos</h3>
          <p class="mt-2 text-sm text-gray-600">Tu información médica es privada y solo puede consultarla personal autorizado.</p>
        </div>
      </aside>
    </div>
  </div>

  <!-- ============ MIS CITAS ============ -->
  <div v-else-if="vista === 'citas'">
    <p class="text-xs font-bold text-emerald-700">MIS CITAS</p>
    <h1 class="mt-1 text-3xl font-extrabold">Citas y turnos</h1>
    <p class="mb-8 mt-2 text-sm text-gray-500">Consulta, reprograma o cancela tus reservas.</p>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-2">
        <h2 class="text-lg font-extrabold">Próximas citas</h2>

        <div class="tarjeta flex flex-col justify-between gap-4 border-l-4 border-l-emerald-600 sm:flex-row sm:items-center">
          <div class="flex gap-4">
            <div class="flex h-16 w-14 flex-col items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
              <strong class="text-2xl">02</strong>
              <span class="text-xs font-bold">SEP</span>
            </div>
            <div>
              <span class="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">Confirmada</span>
              <h3 class="mt-2 font-extrabold">Medicina interna</h3>
              <p class="text-sm text-gray-500">Dra. Laura Salas · Clínica Centro</p>
              <p class="mt-1 text-xs font-bold">09:40 a. m. · Turno #08</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="boton-claro">Reprogramar</button>
            <button @click="verComprobante = true" class="boton">Comprobante</button>
          </div>
        </div>

        <h2 class="pt-2 text-lg font-extrabold">Citas anteriores</h2>
        <div class="tarjeta divide-y divide-gray-200 py-2">
          <div v-for="h in historial.slice(0, 2)" :key="h.fecha" class="flex items-center gap-4 py-3">
            <p class="w-24 text-xs font-bold text-gray-500">{{ h.fecha }}</p>
            <div>
              <p class="font-bold">{{ h.especialidad }}</p>
              <p class="text-sm text-gray-500">{{ h.diagnostico }} · {{ h.medico }}</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="tarjeta h-fit">
        <h2 class="text-lg font-extrabold">Información útil</h2>
        <div class="mt-4 space-y-3 text-sm text-gray-600">
          <p>Llega 10 minutos antes de tu turno.</p>
          <p>Lleva identificación y comprobante.</p>
          <p>Cancela con al menos 2 horas.</p>
        </div>
      </aside>
    </div>
  </div>

  <!-- ============ HISTORIAL ============ -->
  <Historial v-else-if="vista === 'historial'" />

  <!-- ============ PERFIL ============ -->
  <div v-else-if="vista === 'perfil'">
    <p class="text-xs font-bold text-emerald-700">MI CUENTA</p>
    <h1 class="mt-1 text-3xl font-extrabold">Datos personales</h1>
    <p class="mb-8 mt-2 text-sm text-gray-500">Mantén actualizada tu información de contacto.</p>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="tarjeta text-center">
        <span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-extrabold text-emerald-800">AM</span>
        <h3 class="mt-4 text-lg font-extrabold">Ana Méndez</h3>
        <p class="text-sm text-gray-500">ID: ZIM-4920</p>
        <span class="mt-3 inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">Cuenta verificada</span>
      </div>

      <div class="tarjeta lg:col-span-2">
        <h2 class="text-lg font-extrabold">Información básica</h2>
        <div class="grid gap-x-4 sm:grid-cols-2">
          <div><label class="etiqueta">Nombre completo</label><input class="campo" value="Ana Sofía Méndez" /></div>
          <div><label class="etiqueta">Fecha de nacimiento</label><input class="campo" value="12 / 06 / 1994" /></div>
          <div><label class="etiqueta">Correo electrónico</label><input class="campo" value="ana@email.com" /></div>
          <div><label class="etiqueta">Teléfono</label><input class="campo" value="999 123 4567" /></div>
          <div><label class="etiqueta">Zona</label><input class="campo" value="Centro" /></div>
          <div><label class="etiqueta">Contacto de emergencia</label><input class="campo" value="Luis Méndez · 999 555 0123" /></div>
        </div>
        <button class="boton mt-6">Guardar cambios</button>
      </div>
    </div>
  </div>

  <!-- ============ VENTANA: RESERVAR CITA ============ -->
  <div v-if="reservando" class="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
    <div class="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white">
      <!-- Reserva confirmada -->
      <div v-if="reservaLista" class="p-8 text-center">
        <p class="mt-4 text-xs font-bold text-emerald-700">RESERVA CONFIRMADA</p>
        <h2 class="mt-2 text-3xl font-extrabold">Tu turno es el #08</h2>
        <p class="mt-3 text-sm text-gray-500">
          Te esperamos hoy a las 12:20 p. m. en {{ clinicaElegida.nombre }}. Enviamos el comprobante a tu correo.
        </p>
        <div class="mt-6 space-y-2 rounded-xl bg-gray-100 p-4 text-sm">
          <p class="flex justify-between"><span class="text-gray-500">Especialidad</span><strong>{{ especialidadElegida }}</strong></p>
          <p class="flex justify-between"><span class="text-gray-500">Fecha</span><strong>Hoy, 01 sep.</strong></p>
        </div>
        <button @click="reservando = false" class="boton mt-6 w-full">Listo, volver al inicio</button>
      </div>

      <!-- Pasos -->
      <div v-else>
        <div class="flex items-start justify-between border-b border-gray-200 p-5">
          <div>
            <p class="text-xs font-bold text-emerald-700">PASO {{ paso }} DE 3</p>
            <h2 class="text-2xl font-extrabold">{{ titulosPaso[paso - 1] }}</h2>
          </div>
          <button @click="reservando = false" class="text-xl">X</button>
        </div>

        <div class="h-1 bg-gray-200"><div class="h-1 bg-emerald-600" :style="{ width: (paso / 3) * 100 + '%' }"></div></div>

        <div class="p-5">
          <!-- Paso 1: clínica -->
          <div v-if="paso === 1" class="space-y-3">
            <button
              v-for="c in clinicas"
              :key="c.nombre"
              @click="clinicaElegida = c"
              class="flex w-full items-center gap-3 rounded-xl border p-3 text-left"
              :class="clinicaElegida.nombre === c.nombre ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'"
            >
              <span class="flex-1">
                <strong class="block">{{ c.nombre }}</strong>
                <small class="text-gray-500">{{ c.zona }}</small>
              </span>
              <b class="text-xs text-emerald-700">{{ c.disponibles }} cupos</b>
            </button>
          </div>

          <!-- Paso 2: especialidad -->
          <div v-if="paso === 2" class="grid gap-3 sm:grid-cols-2">
            <button
              v-for="e in especialidades"
              :key="e"
              @click="especialidadElegida = e"
              class="rounded-xl border p-3 text-left text-sm font-bold"
              :class="especialidadElegida === e ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'"
            >
              {{ e }}
            </button>
          </div>

          <!-- Paso 3: resumen -->
          <div v-if="paso === 3" class="space-y-2 rounded-xl bg-gray-100 p-4 text-sm">
            <p class="flex justify-between"><span class="text-gray-500">Clínica</span><strong>{{ clinicaElegida.nombre }}</strong></p>
            <p class="flex justify-between"><span class="text-gray-500">Especialidad</span><strong>{{ especialidadElegida }}</strong></p>
            <p class="flex justify-between"><span class="text-gray-500">Fecha</span><strong>Hoy, 01 sep.</strong></p>
            <p class="flex justify-between"><span class="text-gray-500">Hora estimada</span><strong>12:20 p. m.</strong></p>
          </div>
        </div>

        <div class="flex gap-3 border-t border-gray-200 p-5">
          <button v-if="paso > 1" @click="paso--" class="boton-claro flex-1">Atrás</button>
          <button @click="siguiente" class="boton flex-1">{{ paso === 3 ? "Confirmar reserva" : "Continuar" }}</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ============ VENTANA: COMPROBANTE ============ -->
  <div v-if="verComprobante" class="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-7">
      <div class="flex items-center justify-between">
        <p class="text-xl font-extrabold">Zimi<span class="text-emerald-700">Web</span></p>
        <button @click="verComprobante = false" class="text-xl">X</button>
      </div>

      <div class="my-6 border-y border-dashed border-gray-300 py-6 text-center">
        <p class="text-xs font-bold text-emerald-700">COMPROBANTE DIGITAL</p>
        <p class="mt-2 text-5xl font-extrabold">#08</p>
        <p class="mt-1 text-sm text-gray-500">Turno asignado</p>
      </div>

      <div class="space-y-2 rounded-xl bg-gray-100 p-4 text-sm">
        <p class="flex justify-between"><span class="text-gray-500">Paciente</span><strong>Ana Méndez</strong></p>
        <p class="flex justify-between"><span class="text-gray-500">Clínica</span><strong>Clínica Centro</strong></p>
        <p class="flex justify-between"><span class="text-gray-500">Especialidad</span><strong>Medicina interna</strong></p>
        <p class="flex justify-between"><span class="text-gray-500">Fecha y hora</span><strong>02 sep. · 09:40</strong></p>
        <p class="flex justify-between"><span class="text-gray-500">Médico</span><strong>Dra. Laura Salas</strong></p>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-3">
        <button class="boton-claro">Descargar</button>
        <button @click="verComprobante = false" class="boton">Cerrar</button>
      </div>
    </div>
  </div>
</template>
