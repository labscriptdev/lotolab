import Analisys from "./Analisys";

export default class BadsLast3 extends Analisys {
  name = "Saíram nos últimos 3 sorteios";

  constructor(drawType = {}, numbers = []) {
    super();
    let bads = {};

    drawType.data
      .filter((item, itemIndex) => {
        return itemIndex <= 2;
      })
      .map((draw) => {
        draw.numbers.map((number) => {
          bads[number] = bads[number] || 0;
          bads[number]++;
        });
      });

    for (let i in bads) {
      if (bads[i] <= 1) {
        delete bads[i];
      }
    }

    bads = Object.keys(bads).map((n) => String(n).padStart(2, "0"));
    this.bads = this.intersection(bads, numbers);
  }
}
