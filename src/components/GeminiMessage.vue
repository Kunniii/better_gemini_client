<script setup lang="ts">
import { message } from "../types";
import { PropType } from "vue";

import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

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
    class="p-2 rounded-xl drop-shadow-lg bg-white my-2 w-full float-left"
  ></div>
</template>
