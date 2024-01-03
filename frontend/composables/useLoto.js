// TODO: Imperir que r.numbers tenha numeros meres que 0 ou maiores que 60

import useAxios from "@/composables/useAxios";

export default (options = {}) => {
  options = {
    type: "mega-sena",
    ...options,
  };

  const r = useAxios({
    method: "get",
    url: `https://raw.githubusercontent.com/labscriptdev/static-api/main/data/loteria/${options.type}.json`,
    autoSubmit: true,
    response: { data: [] },
    filters: {
      response(resp) {
        resp.data.data = resp.data.data.reverse().map((item) => {
          item.numbers = item.numbers.map((nn) => {
            return r.padStart(nn, 2, "0");
          });
          return item;
        });
        return resp;
      },
    },
    numbers: [],
    numberToggle(n) {
      const index = this.numbers.indexOf(n);
      index >= 0 ? this.numbers.splice(index, 1) : this.numbers.push(n);
    },
    numbersSet(nns) {
      this.numbers = JSON.parse(JSON.stringify(nns));
    },
    padStart(n) {
      return String(n).padStart(2, "0");
    },
    table: computed(() => {
      let rows = [],
        row = [];
      for (let n = r.response.rangeStart; n <= r.response.rangeFinal; n++) {
        row.push(r.padStart(n));
        if (row.length == r.response.rangePerRow) {
          rows.push(row);
          row = [];
        }
      }
      return rows;
    }),
  });

  return r;
};
