<template>
  <div>
    <v-row>
      <v-col cols="12" md="5">
        <v-card elevation="0">
          <v-card-text>
            <!-- <v-text-field
              label="Números"
              v-model="loto.numbersStr"
              @keyup="loto.numbersToArray()"
              append-inner-icon="mdi-close"
              @click:appendInner="
                () => {
                  loto.numbersStr = '';
                  loto.numbersToArray();
                }
              "
            /> -->

            <v-table>
              <tbody>
                <template v-for="nns in loto.table">
                  <tr>
                    <template v-for="nn in nns">
                      <td class="pa-1">
                        <div
                          style="cursor: pointer"
                          class="pa-2 text-center rounded bg-grey-lighten-3"
                          :class="{
                            'bg-primary': loto.numbers.includes(nn),
                          }"
                          @click="loto.numberToggle(nn)"
                        >
                          {{ nn }}
                        </div>
                      </td>
                    </template>
                  </tr>
                </template>
              </tbody>
            </v-table>

            <br />
            <div class="d-flex justify-end" style="gap: 15px">
              <v-btn color="primary" @click="clipboardGet()">Colar</v-btn>
              <v-btn color="primary" @click="loto.numbers = []" :disabled="loto.numbers.length == 0">Limpar</v-btn>
            </div>

            <!-- <pre>loto2: {{ loto2 }}</pre> -->
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <v-table-virtual
          density="compact"
          :items="loto.response.data"
          height="80vh"
          :zebra="true"
          v-if="loto.response.data[0]"
        >
          <template #colgroup="bind">
            <col width="80px" />
            <col width="150px" />
            <col width="*" />
            <col width="50px" />
          </template>

          <template #header="bind">
            <th>Sorteio</th>
            <th>Data</th>
            <th>Números</th>
            <th>Ações</th>
          </template>

          <template #row="bind">
            <td>{{ bind.item.number }}</td>
            <td>{{ bind.item.date }}</td>
            <td>
              <div class="d-flex flex-wrap" style="gap: 6px; padding: 4px">
                <template v-for="nn in bind.item.numbers">
                  <v-btn
                    color="grey-lighten-3"
                    elevation="0"
                    @click="loto.numberToggle(nn)"
                    :class="{
                      'bg-primary': loto.numbers.includes(nn),
                    }"
                  >
                    {{ nn }}
                  </v-btn>
                </template>
              </div>
            </td>
            <td>
              <div class="d-flex">
                <v-defaults-provider :defaults="actionsDefaultsProvider">
                  <template v-for="act in actions(bind)">
                    <v-tooltip :text="act.title || null">
                      <template #activator="bind">
                        <v-btn v-bind="{ ...act, ...bind.props }" />
                      </template>
                    </v-tooltip>
                  </template>
                </v-defaults-provider>
              </div>
            </td>
          </template>
        </v-table-virtual>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { reactive, useRoute, computed } from "#imports";
import axios from "axios";
import useAxios from "@/composables/useAxios";

import useFormat from "@/composables/useFormat";
const format = useFormat();

const route = useRoute();

import useLoto from "@/composables/useLoto";
const loto = useLoto({
  type: route.params.slug,
});

const clipboardGet = async () => {
  const text = await navigator.clipboard.readText();
  loto.numbers = text
    .split(/[^0-9]/)
    .filter((v) => !!v)
    .map(loto.padStart);
};

const actionsDefaultsProvider = {
  VBtn: { flat: true, size: 35 },
};

const actions = (bind) => {
  return {
    selectAll: {
      icon: "material-symbols:text-select-jump-to-beginning-rounded",
      title: "Selecionar tudo",
      onClick() {
        loto.numbersSet(bind.item.numbers);
      },
    },
  };
};
</script>
