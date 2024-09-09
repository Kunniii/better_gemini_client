<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { Content, Message } from "../types";
import Conversation from "../components/Conversation.vue";
import Settings from "../components/Settings.vue";

const API_KEY = localStorage.getItem("API_KEY");

let selectedModel = ref(
  localStorage.getItem("selectedModel") || "gemini-1.5-flash-latest"
);

let BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel.value}:generateContent?key=${API_KEY}`;

const history: Ref<Content[]> = ref([]);
const conversation: Ref<Message[]> = ref([]);
const input = ref();
const fetchState = ref("done");
const showSettingsPopup = ref(false);

function updateBaseUrl() {
  BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel.value}:generateContent?key=${API_KEY}`;
}

function refresh() {
  history.value = [];
}

function sendQuestion() {
  if (fetchState.value == "pending") return;
  if (!input.value.trim() || input.value.trim() == "") return;
  let question = input.value.trim();
  input.value = "";
  askGemini(question)
    .then((res: Message) => {
      if (res.candidates) {
        history.value.push(res.candidates[0].content);
        conversation.value.push(res);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

async function askGemini(question: string) {
  fetchState.value = "pending";

  let userQuestion: Message = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  history.value.push(userQuestion.contents[0]);
  conversation.value.push(userQuestion);
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: history.value,
      safetySettings: [
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    }),
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

function showSettings() {
  showSettingsPopup.value = true;
}

function addNewline() {
  if (!input.value) return;
  input.value += "\n";
}

watch(selectedModel, (newModel) => {
  updateBaseUrl();
  localStorage.setItem("selectedModel", newModel);
});
</script>

<template>
  <div :class="showSettingsPopup ? 'blur' : ''">
    <span>
      <div class="text-2xl w-fit p-2 fixed top-2 right-2">
        <div
          @click="refresh"
          title="New chat"
          class="hover:scale-125 text-3xl duration-200 text-zinc-900 dark:text-white"
        >
          <i class="fa-solid fa-circle-plus rounded-full my-1"></i>
        </div>
        <div
          @click="showSettings"
          title="Settings"
          class="hover:scale-125 text-3xl duration-200 text-zinc-900 dark:text-white"
        >
          <i class="fa-solid fa-gear rounded-full my-1"></i>
        </div>
      </div>
    </span>
    <div class="w-[80vw] mx-auto">
      <Conversation :conversation="conversation" :fetch-status="fetchState" />
      <textarea
        placeholder="Ask Gemini (use Ctrl + Enter to send)"
        v-model="input"
        @keydown.enter.prevent="addNewline"
        @keydown.ctrl.enter="sendQuestion"
        class="w-[80.4%] px-4 py-2 rounded-xl border mb-5 mx-auto fixed bottom-0"
        :style="{ maxHeight: `calc(50vh - 10px)`, height: 'auto' }"
      />
    </div>
  </div>

  <Settings
    v-if="showSettingsPopup"
    @close="showSettingsPopup = false"
    @update:selectedModel="selectedModel = $event"
  />
</template>
