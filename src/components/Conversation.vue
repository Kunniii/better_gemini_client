<script setup lang="ts">
import type { message } from "../types";
import GeminiMessage from "./GeminiMessage.vue";
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
</script>

<template>
  <div class="flex flex-col my-10 py-10">
    <div
      v-for="(data, index) in props.conversation"
      :key="index"
    >
      <GeminiMessage
        v-if="data.role == 'model'"
        :data="data"
      />
      <UserMessage
        v-else-if="data.role == 'user'"
        :data="data"
      />
      <Thinking v-show="fetchStatus == 'pending'" />
    </div>
  </div>
</template>
