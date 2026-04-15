export default class Upgrade {
  private level: number = 0;
  private cost: number;
  private costMult: number;
  private resource: React.RefObject<number>;

  getCurrentCost(numberToBuy?: number): number {
    if (numberToBuy) {
      let newCost = 0;
      for (let x = 0; x < numberToBuy; x++) {
        newCost += Math.round(
          this.cost * Math.pow(this.costMult, this.level + x),
        );
      }
      return newCost;
    }
    return Math.round(this.cost * Math.pow(this.costMult, this.level));
  }

  buy(numberToBuy?: number): boolean {
    if (this.resource.current >= this.getCurrentCost(numberToBuy)) {
      this.resource.current -= numberToBuy
        ? this.getCurrentCost(numberToBuy)
        : this.getCurrentCost();
      this.level += numberToBuy || 1;
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
