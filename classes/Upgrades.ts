export default class SaveClass {
  bones: number;
  gold: number;
  shovel: number;
  miners: number;
  pickaxes: number;
  smartMiners: number;

  constructor(
    bones: number,
    counter: number,
    shovel: number,
    miners: number,
    pickaxes: number,
    smartMiners: number,
  ) {
    this.bones = bones;
    this.gold = counter;
    this.shovel = shovel;
    this.miners = miners;
    this.pickaxes = pickaxes;
    this.smartMiners = smartMiners;
  }
}

export class Upgrade {
  private level: number = 0;
  private cost: number;
  private costMult: number;

  getCurrentCost() {
    return Math.round(this.cost * Math.pow(this.costMult, this.level));
  }

  setLevel(newLevel: number) {
    this.level = newLevel;
  }

  getLevel() {
    return this.level;
  }

  constructor(cost: number, costMult: number) {
    this.cost = cost;
    this.costMult = costMult;
  }
}
