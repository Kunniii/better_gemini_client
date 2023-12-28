<script setup lang="ts">
import { ref } from "vue";
import Login from "./views/Login.vue";
import Chat from "./views/Chat.vue";

const API_KEY = ref();
API_KEY.value = localStorage.getItem("API_KEY");
</script>

<template>
  <Login v-if="!API_KEY" />
  <Chat v-else />
</template>
