<script setup lang="ts">
const props = defineProps({
  data: {
    type: String,
    required: true,
  },
  id: String,
});

function escapeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function wrapInPTags(text: string) {
  return text
    .split("\n")
    .map((line) => `<p>${escapeHTML(line)}</p>`)
    .join("");
}

const text = wrapInPTags(props.data);
</script>

<template>
  <div
    v-html="text"
    :id="props.id"
    class="py-2 px-4 rounded-xl drop-shadow-lg bg-gray-100 w-fit float-right dark:bg-zinc-700 dark:text-white mt-10"
  ></div>
</template>
