<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { message } from "../types";
import Conversation from "../components/Conversation.vue";

const API_KEY = localStorage.getItem("API_KEY");
const BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
  API_KEY;

const history: Ref<message[]> = ref([]);
const input = ref();
const fetchState = ref("done");

function removeKey() {
  localStorage.removeItem("API_KEY");
  window.location.reload();
}

function refresh() {
  history.value = [];
}

function sendQuestion() {
  if (fetchState.value == "pending") return;
  if (!input.value.trim() || input.value.trim() == "") return;
  let question = input.value;
  input.value = "";
  askGemini(question)
    .then((response) => {
      let geminiRespond: message = response?.candidates[0]?.content;
      history.value.push(geminiRespond);
    })
    .catch((e) => {
      console.log(e);
    });
}

async function askGemini(question: string) {
  fetchState.value = "pending";

  let userQuestion: message = {
    role: "user",
    parts: [
      {
        text: question,
      },
    ],
  };

  history.value.push(userQuestion);
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contents: history.value }),
  })
    .then((response) => {
      fetchState.value = "done";
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      fetchState.value = "error";
    });
}
</script>

<template>
  <div class="text-2xl w-fit p-2 fixed top-2 left-2">
    <div
      @click="removeKey"
      title="Click to exit and remove API KEY"
      class="hover:drop-shadow-md duration-200 text-rose-500"
    >
      <i class="fa-regular fa-circle-xmark hover:animate-wiggle bg-white rounded-full p-2 my-1"></i>
    </div>
    <div
      @click="refresh"
      title="New chat"
      class="hover:drop-shadow-md duration-200 text-blue-600"
    >
      <i class="fa-solid fa-rotate hover:animate-spin bg-white rounded-full p-2 my-1"></i>
    </div>
    <div
      @click="() => console.log('View Chat')"
      title="See/Load Conversations"
      class="hover:drop-shadow-md duration-200 text-yellow-500"
    >
      <i class="fa-regular fa-circle-play bg-white rounded-full p-2 my-1"></i>
    </div>
  </div>
  <div class="w-[80vw]">
    <Conversation
      :conversation="history"
      :fetch-status="fetchState"
    />
    <div class="px-2 flex justify-between bg-inherit">
      <input
        type="text"
        placeholder="Ask Gemini"
        v-model="input"
        @keydown.enter="sendQuestion"
        class="resize-none w-4/5 px-4 py-2 rounded-xl border mb-5 mx-auto fixed bottom-0"
      />
    </div>
  </div>
</template>
