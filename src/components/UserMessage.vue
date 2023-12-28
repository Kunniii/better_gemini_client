<script setup lang="ts">
import { marked } from "marked";
import { message } from "../types";
import { PropType } from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<message>,
    required: true,
  },
});

const text = marked.parse(props.data.parts[0].text);
</script>

<template>
  <div
    v-html="text"
    class="py-2 px-4 rounded-xl drop-shadow-lg bg-emerald-200 my-2 w-fit float-right"
  ></div>
</template>
