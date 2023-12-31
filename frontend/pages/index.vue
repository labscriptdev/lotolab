<template>
  <div>
    <v-btn to="/result">Resultados</v-btn>
    <pre>firebase: {{ firebase }}</pre>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from "vue";

import useFirebase from "@/composables/useFirebase";
const firebase = useFirebase();

const props = defineProps({
  modelValue: { type: [String], default: "" },
});

const emit = defineEmits(["update:modelValue"]);
</script>
