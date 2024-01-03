<template>
  <div class="bg-surface">
    <v-table :density="props.density" style="margin-right: 14px">
      <colgroup>
        <slot name="colgroup"></slot>
      </colgroup>

      <thead>
        <tr>
          <slot name="header"></slot>
        </tr>
      </thead>
    </v-table>

    <v-virtual-scroll :height="props.height" :items="props.items">
      <template #default="bind">
        <v-table :density="props.density">
          <colgroup>
            <slot name="colgroup"></slot>
          </colgroup>

          <tbody>
            <tr :style="zebraStyle(bind.index)">
              <!-- <td>
                <pre>{{ bind.index % props.zebra.length }}</pre>
              </td> -->
              <slot name="row" v-bind="bind"></slot>
            </tr>
          </tbody>
        </v-table>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from "vue";

const props = defineProps({
  // modelValue: { type: [String], default: "" },
  items: { type: Array, default: () => [] },
  height: { type: String, default: "400px" },
  density: { type: String, default: "default" },
  zebra: { type: [Boolean, Array], default: false },
});

const emit = defineEmits(["update:modelValue"]);

const zebraStyle = (index) => {
  if (!props.zebra) return null;

  let colors = ["transparent", "#0000000f"];

  if (Array.isArray(props.zebra)) {
    colors = props.zebra;
  }

  const style = colors[index % colors.length];
  return `background-color: ${style};`;
};
</script>
