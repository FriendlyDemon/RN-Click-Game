export default class Upgrade {
  private level: number = 0;
  private cost: number;
  private costMult: number;
  private resource: React.RefObject<number>;

  getCurrentCost(numberToBuy: number | "MAX"): [number, number] {
    if (numberToBuy == "MAX") {
      const r = this.costMult;

      const a = this.cost * Math.pow(r, this.level);

      const levels = Math.floor(
        Math.log((this.resource.current * (r - 1)) / a + 1) / Math.log(r),
      );

      const totalCost = (a * (Math.pow(r, levels) - 1)) / (r - 1);

      if (levels == 0) {
        return [0, a];
      }

      return [levels, totalCost];
    }
    let newCost = 0;
    for (let x = 0; x < numberToBuy; x++) {
      newCost += this.cost * Math.pow(this.costMult, this.level + x);
    }
    return [numberToBuy, newCost];
  }

  canBuy(ammount: number): boolean {
    return ammount <= this.resource.current;
  }

  buy(numberToBuy: [number, number]): boolean {
    if (this.resource.current >= numberToBuy[1]) {
      this.resource.current -= numberToBuy[1];
      this.level += numberToBuy[0];
      return true;
    }
    return false;
  }

  setLevel(newLevel: number): void {
    this.level = newLevel;
  }

  getLevel(): number {
    return this.level;
  }

  constructor(
    cost: number,
    costMult: number,
    resource: React.RefObject<number>,
  ) {
    this.cost = cost;
    this.costMult = costMult;
    this.resource = resource;
  }
}
