import Analisys from "./Analisys";

export default class NoBorderNumbers extends Analisys {
  name = "Sem números de borda";

  constructor(drawType = {}, numbers = []) {
    super();
    if (numbers.length == 0) return;

    const borderNumbers = this.getBorderNumbers(drawType);
    const borderNumbersSelected = this.intersection(borderNumbers, numbers);

    if (borderNumbersSelected.length < 2) {
      this.message = `Geralmente, um sorteio contém pelo menos 2 números de borda. Você selecionou ${borderNumbersSelected.length}`;
    }
  }

  getBorderNumbers(drawType) {
    let borderNumbers = [];

    for (let n = drawType.rangeStart; n <= drawType.rangeFinal; n++) {
      if (n < drawType.rangePerRow) borderNumbers.push(n);
      else if (n % 10 == 1) borderNumbers.push(n);
      else if (n % 10 == 0) borderNumbers.push(n);
      else if (n >= drawType.rangeFinal - drawType.rangePerRow + 1) borderNumbers.push(n);
    }

    return borderNumbers.map((n) => String(n).padStart(2, "0"));
  }
}
