<script setup lang="ts">
import { marked } from "marked";

const props = defineProps({
  data: {
    type: String,
    required: true,
  },
  id: String,
});

const text = marked.parse(props.data);
</script>

<template>
  <div
    v-html="text"
    :id="props.id"
    class="py-2 px-4 rounded-xl drop-shadow-lg bg-gray-100 w-fit float-right dark:bg-zinc-700 dark:text-white mt-10"
  ></div>
</template>
