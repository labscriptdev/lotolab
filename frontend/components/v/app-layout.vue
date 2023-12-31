<template>
  <v-app class="v-app-layout">
    <v-defaults-provider :defaults="defaultsProvider">
      <!-- loading -->
      <v-layout v-if="!props.ready">
        <slot name="loading" v-bind="slotBind()">
          <div :class="props.loadingClass">
            <v-icon icon="svg-spinners:3-dots-fade" size="30" />
          </div>
        </slot>
      </v-layout>

      <v-layout class="rounded rounded-md" v-if="props.ready">
        <v-navigation-drawer
          :model-value="nav.drawer"
          width="300"
          elevation="0"
          :class="`v-app-layout__navigation ${props.navigationClass}`"
          border="0"
        >
          <div style="height: 100vh; overflow: auto">
            <slot name="navigation" v-bind="slotBind()"></slot>
          </div>
        </v-navigation-drawer>

        <!-- Main -->
        <v-main style="height: 100vh; overflow: auto; background: #7f7f7f33">
          <v-app-bar :class="props.headerClass" density="compact" elevation="0">
            <v-btn icon="ci:hamburger" size="30" flat @click="nav.drawer = !nav.drawer" class="d-lg-none" stacked />
            <slot name="header" v-bind="slotBind()"></slot>
          </v-app-bar>

          <div class="pa-md-3">
            <slot name="main" v-bind="slotBind()"></slot>
          </div>
        </v-main>
      </v-layout>
    </v-defaults-provider>
  </v-app>
</template>

<script setup>
import { reactive, defineProps, defineEmits, useSlots } from "vue";

const props = defineProps({
  ready: { type: Boolean, default: true },
  defaultsProvider: { type: Object, default: () => ({}) },
  loadingClass: {
    type: String,
    default: "w-100 d-flex align-center justify-center",
  },
  navigationClass: { type: String, default: "" },
  headerClass: { type: String, default: "" },
  mainClass: { type: String, default: "" },
  footerClass: { type: String, default: "" },
});

const slots = useSlots();

const emit = defineEmits([]);

import { useTitle } from "@vueuse/core";
const title = useTitle();

import { useDisplay } from "vuetify";
const display = useDisplay();

import { useSwipe } from "@vueuse/core";

const nav = reactive({
  drawer: null,
  items: [
    { title: "Home", to: "/admin" },
    { title: "Pages", to: "/admin/page" },
    { title: "User", to: "/admin/user" },
    { title: "Test", to: "/admin/test" },
  ],
});

const layout = reactive({
  headerShow: true,
  footerShow: true,
  vTouch: {
    up: () => {
      layout.headerShow = false;
      layout.footerShow = true;
    },
    down: () => {
      layout.headerShow = true;
      layout.footerShow = false;
    },
  },
});

const defaultsProvider = {
  // VNavigationDrawer: { border: 0 },
  ...props.defaultsProvider,
};

const slotBind = (merge = {}) => {
  return {
    defaultsProvider,
    ...merge,
  };
};
</script>

<style lang="scss">
.v-app-layout {
  &__navigation .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
