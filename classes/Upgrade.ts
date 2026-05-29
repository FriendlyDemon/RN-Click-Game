export default class Upgrade {
  private level: number = 0;
  private cost: number;
  private costMult: number;
  private resource: React.RefObject<number>;

  getCurrentCost(numberToBuy?: number): number {
    if (numberToBuy) {
      let newCost = 0;
      for (let x = 0; x < numberToBuy; x++) {
        newCost += Math.floor(
          this.cost * Math.pow(this.costMult, this.level + x),
        );
      }
      return newCost;
    }
    return Math.floor(this.cost * Math.pow(this.costMult, this.level));
  }

  buy(numberToBuy?: number): boolean {
    if (this.resource.current >= this.getCurrentCost(numberToBuy)) {
      this.resource.current -= this.getCurrentCost(numberToBuy);
      this.level += numberToBuy || 1;
      return true;
    }
    return false;
  }

  getMaxCost(resource: number): [number, number] {
    let levels = 0;
    let totalCost = 0;

    for (let nextLevel = 1; ; nextLevel++) {
      const levelCost = Math.floor(
        this.cost * Math.pow(this.costMult, this.level + nextLevel - 1),
      );

      if (totalCost + levelCost > resource) {
        break;
      }

      totalCost += levelCost;
      levels = nextLevel;
    }

    return [levels, totalCost];
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
