export default class Upgrade {
  private level: number = 0;
  private cost: number;
  private costMult: number;

  getCurrentCost(): number {
    return Math.round(this.cost * Math.pow(this.costMult, this.level));
  }

  getCurrentCostX(numberToBuy:number): number {
    let newCost = 0;
    for (let x = 0; x < numberToBuy; x++) {
      newCost += Math.round(
        this.cost * Math.pow(this.costMult, this.level + x),
      );
    }
    return newCost;
  }

  setLevel(newLevel: number): void {
    this.level = newLevel;
  }

  getLevel(): number {
    return this.level;
  }

  constructor(cost: number, costMult: number) {
    this.cost = cost;
    this.costMult = costMult;
  }
}
