<script setup lang="ts">
  import { marked } from "marked";
  import { message } from "../types";
  import { PropType } from "vue";

  const props = defineProps({
    data: {
      type: Object as PropType<message>,
      required: true,
    },
    id: String,
  });

  const text = marked.parse(props.data.parts[0].text);
</script>

<template>
  <div
    v-html="text"
    :id="props.id"
    class="py-2 px-4 rounded-xl drop-shadow-lg bg-gray-100 w-fit float-right dark:bg-cyan-800 dark:text-white mt-10"
  ></div>
</template>
