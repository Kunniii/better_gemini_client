<script setup lang="ts">
import { ref } from "vue";

type Model = "gemini-1.0-pro" | "gemini-1.5-pro" | "gemini-1.5-flash-latest";

let selectedModel = ref(
  localStorage.getItem("selectedModel") || "gemini-1.5-flash-latest"
);

const emit = defineEmits(["update:selectedModel", "close"]);

const description = {
  "gemini-1.0-pro":
    "Old but good, response time is a bit slow. Token Count: 30,720 tokens.",
  "gemini-1.5-pro":
    "Newest but not reliable and some time it will not response. If this causes problems, please use other models. Token Count: 2,079,152 tokens.",
  "gemini-1.5-flash-latest":
    "Fastest and most reliable. Best for coding and daily tasks. Token Count: 1,048,576 tokens.",
};

function close() {
  emit("close");
}
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center dark:bg-zinc-900"
    @click.self="close"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-96 -translate-y-40">
      <h2 class="text-xl font-bold mb-4">Settings</h2>
      <div class="flex my-auto py-2">
        <label for="modelSelect" class="block text-gray-700 font-bold mr-3"
          >Select Model</label
        >
        <select
          id="modelSelect"
          v-model="selectedModel"
          @change="$emit('update:selectedModel', selectedModel)"
        >
          <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          <option value="gemini-1.5-flash-latest">Gemini 1.5 Flash</option>
        </select>
      </div>
      <p class="text-sm">{{ description[selectedModel as Model] }}</p>
      <button
        class="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white w-full"
        @click="close"
      >
        Close
      </button>
    </div>
  </div>
</template>
