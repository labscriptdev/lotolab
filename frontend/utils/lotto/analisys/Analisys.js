export default class Analisys {
  name = "";
  type = "warning";
  message = "";
  goods = [];
  bads = [];

  constructor(drawType = {}, numbers = []) {
    //
  }

  intersection(a, b) {
    a = new Set(a);
    b = new Set(b);
    return [...new Set([...a].filter((x) => b.has(x)))];
  }

  difference(a, b) {
    a = new Set(a);
    b = new Set(b);
    return [...new Set([...[...a].filter((x) => !b.has(x)), ...[...b].filter((x) => !a.has(x))])];
  }
}
