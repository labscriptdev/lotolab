import Analisys from "./Analisys";

export default class AlreadyMade extends Analisys {
  name = "Sorteio já feito";

  constructor(drawType = {}, numbers = []) {
    super();
    if (numbers.length < 3) return;

    let draws = drawType.data.filter((draw) => {
      return (
        draw.numbers.filter((n) => {
          return numbers.includes(n);
        }).length == numbers.length
      );
    });

    if (draws.length == 0) return;
    this.type = "error";

    if (draws.length == 1) {
      this.message = `Os números selecionados saíram uma vez no sorteio ${draws[0].number} sorteios`;
      return;
    }

    this.message = `Os números selecionados saíram em ${draws.length} sorteios`;
  }
}
