<script setup lang="ts">
import { ref } from "vue";

const input = ref();

function saveKey() {
  if (!input.value) return;
  localStorage.setItem("API_KEY", input.value);
  window.location.reload();
}
</script>

<template>
  <div class="flex flex-col px-2 w-80 h-96 bg-white rounded-xl drop-shadow-xl mt-[20vh]">
    <h1 class="text-center pt-5">Welcome to my Gemini AI Client!</h1>
    <h2 class="text-3xl text-center font-bold pb-4">Use your API key</h2>
    <input
      type="password"
      v-model="input"
      placeholder="API KEY"
      class="border-2 border-dashed hover:border-solid focus:outline-emerald-500 border-emerald-300 rounded-full px-4 py-2 mb-2 mx-4"
    />
    <span class="text-center">
      <p class="text-gray-500">or</p>
      <a
        href="https://makersuite.google.com/app/apikey"
        target="_blank"
        class="underline text-green-600"
        >create one</a
      >
    </span>
    <button
      @click="saveKey"
      class="bg-green-500 px-10 py-2 my-5 rounded-full text-white font-bold hover:bg-green-600 text-xl mx-auto"
    >
      Start using Gemini
    </button>
    <p class="text-justify px-3 pt-2">
      Your API key is saved locally, your data stays private: Everything is done client-side and
      never leaves your browser.
    </p>
  </div>
</template>
