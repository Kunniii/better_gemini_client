<script setup lang="ts">
import type { message } from "../types";
import GeminiMessage from "./GeminiMessage.vue";
import MessageError from "./MessageError.vue";
import Thinking from "./Thinking.vue";
import UserMessage from "./UserMessage.vue";

const props = defineProps({
  conversation: {
    type: Array<message>,
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
  <div
    class="flex flex-col my-10 pb-10"
    id="conversation"
  >
    <div
      v-for="(data, index) in props.conversation"
      :key="index"
    >
      <GeminiMessage
        v-if="data.role == 'model'"
        :id="index.toString()"
        :data="data"
      />
      <UserMessage
        v-else-if="data.role == 'user'"
        :id="index.toString()"
        :data="data"
      />
    </div>
    <Thinking v-show="fetchStatus == 'pending'" />
    <MessageError v-show="fetchStatus == 'error'" />
    {{ scrollToEnd() }}
  </div>
</template>
