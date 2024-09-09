<script setup lang="ts">
import type { Message } from "../types";
import GeminiMessage from "./GeminiMessage.vue";
import MessageError from "./MessageError.vue";
import Thinking from "./Thinking.vue";
import UserMessage from "./UserMessage.vue";

const props = defineProps({
  conversation: {
    type: Array<Message>,
    required: true,
  },
  fetchStatus: {
    type: String,
    required: true,
  },
});

function scrollToEnd() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight + 9999999,
      left: 0,
      behavior: "smooth",
    });
  }, 100);
}
</script>

<template>
  <div class="flex flex-col my-10 pb-10" id="conversation">
    <div v-for="(data, index) in props.conversation" :key="index">
      <GeminiMessage
        v-if="data.candidates && data.candidates[0].content.role == 'model'"
        :id="index.toString()"
        :data="data.candidates[0].content.parts[0].text"
        :tokenUsed="data.usageMetadata?.candidatesTokenCount || NaN"
      />
      <UserMessage
        v-else-if="data.contents[0].role == 'user'"
        :id="index.toString()"
        :data="data.contents[0].parts[0].text"
      />
    </div>
    <Thinking v-show="fetchStatus == 'pending'" />
    <MessageError v-show="fetchStatus == 'error'" />
    {{ scrollToEnd() }}
  </div>
</template>
