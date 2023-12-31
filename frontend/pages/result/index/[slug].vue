<template>
  <div>
    <v-row>
      <v-col cols="12" md="7">
        <v-table-virtual density="compact" :items="loto.response.data" height="80vh" v-if="loto.response.data[0]">
          <template #colgroup="bind">
            <col width="80px" />
            <col width="150px" />
            <col width="*" />
          </template>

          <template #header="bind">
            <th>Sorteio</th>
            <th>Data</th>
            <th>Números</th>
          </template>

          <template #row="bind">
            <td>{{ bind.item.number }}</td>
            <td>{{ bind.item.date }}</td>
            <td>
              <div class="d-flex flex-wrap" style="gap: 6px; padding: 4px">
                <v-btn color="grey-lighten-3" elevation="0" @click="loto.numbersSet(bind.item.numbers)">
                  <v-icon icon="ic:round-keyboard-double-arrow-right" />
                </v-btn>

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
          </template>
        </v-table-virtual>
      </v-col>

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
              <!-- <v-btn color="primary">Colar</v-btn> -->
              <v-btn color="primary" @click="loto.numbers = []">Limpar</v-btn>
            </div>

            <!-- <pre>loto: {{ loto }}</pre> -->
          </v-card-text>
        </v-card>
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

const loto = useAxios({
  method: "get",
  url: `https://raw.githubusercontent.com/labscriptdev/static-api/main/data/loteria/${route.params.slug}.json`,
  autoSubmit: true,
  response: { data: [] },
  filters: {
    response(resp) {
      resp.data.data = resp.data.data.reverse().map((item) => {
        item.numbers = item.numbers.map((nn) => {
          return format.padStart(nn, 2, "0");
        });
        return item;
      });
      return resp;
    },
  },
  numbersStr: "",
  numbers: [],
  numbersToArray() {
    loto.numbers = loto.numbersStr
      .split(/[^0-9]/)
      .filter((v) => !!v)
      .map((n) => filter.padStart(n));
  },
  numberToggle(n) {
    const index = loto.numbers.indexOf(n);
    index >= 0 ? loto.numbers.splice(index, 1) : loto.numbers.push(n);
    loto.numbersStr = loto.numbers.join(" ");
  },
  numbersSet(nns) {
    loto.numbers = JSON.parse(JSON.stringify(nns));
    loto.numbersStr = loto.numbers.join(" ");
  },
  table: computed(() => {
    let rows = [],
      row = [];
    for (let n = loto.response.rangeStart; n <= loto.response.rangeFinal; n++) {
      row.push(filter.padStart(n));
      if (row.length == loto.response.rangePerRow) {
        rows.push(row);
        row = [];
      }
    }
    return rows;
  }),
});

const filter = {
  padStart(n) {
    return String(n).padStart(2, "0");
  },
};
</script>
