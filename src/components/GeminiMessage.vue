<script setup lang="ts">
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
    type: String,
    required: true,
  },
  id: String,
  tokenUsed: {
    type: Number,
    required: true,
  },
});

const text = marked.parse(props.data);
</script>

<template>
  <div :id="props.id" class="" :title="String(props.tokenUsed)">
    <img
      src="../assets/gemini.png"
      alt="gemini icon"
      width="35"
      class="rounded-full bg-white p-1 relative top-11 right-12"
    />
    <div
      v-html="text"
      class="overflow-x-auto p-2 rounded-xl drop-shadow-lg bg-white my-2 w-full float-left dark:bg-transparent dark:text-white"
    ></div>
  </div>
</template>
