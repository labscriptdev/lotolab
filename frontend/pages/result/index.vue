<template>
  <v-app-layout>
    <template #main>
      <nuxt-page />
    </template>

    <template #navigation>
      <v-list>
        <template v-for="o in types.response">
          <v-list-item :to="`/result/${o.id}`">{{ o.name }}</v-list-item>
        </template>
      </v-list>
    </template>
  </v-app-layout>
</template>

<script setup>
import useAxios from "@/composables/useAxios";

const types = useAxios({
  method: "get",
  url: "https://raw.githubusercontent.com/labscriptdev/static-api/main/data/loteria.json",
  autoSubmit: true,
  response: [],
});
</script>
